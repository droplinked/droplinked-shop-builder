import { Box, VStack } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import useStack from 'functions/hooks/stack/useStack'
import useHookStore from 'functions/hooks/store/useHookStore'
import useAppToast from 'functions/hooks/toast/useToast'
import useAppWeb3 from 'functions/hooks/web3/useWeb3'
import { ISolanaRequestService, IcasperRequestService } from 'lib/apis/affiliate/interfaces'
import { requestService } from 'lib/apis/affiliate/shopServices'
import { Isku } from 'lib/apis/product/interfaces'
import React, { useCallback, useState } from 'react'
import { useMutation } from 'react-query'
import { ModalRequestContext } from './context'
import RequestModalButtons from './parts/buttons/RequestModalButtons'
import ModalRequestDetails from './parts/details/ModalRequestDetails'
import RequestSpecs from './parts/specs/RequestSpecs'

interface IProps {
	product: any
	sku: Isku
	shop: any
	close: Function
	setHahskey(hashkey: string): void
}

function ModalRequestForm({ product, shop, sku, setHahskey, close }: IProps) {
	const { mutateAsync } = useMutation((params: IcasperRequestService | ISolanaRequestService) =>
		requestService(params)
	)
	const { showToast } = useAppToast()
	const stack = useStack()
	const [Loading, setLoading] = useState(false)
	const { web3 } = useAppWeb3()
	const {
		app: {
			user: { wallets },
		},
	} = useHookStore()

	const request = useCallback(
		async (deployHash: string, quantity: number, chain: string, affiliateData?: object) => {
			return mutateAsync({
				chain,
				params: {
					productID: product._id,
					deploy_hash: deployHash,
					quantity,
					skuID: sku._id,
					shopID: shop._id,
					affiliateData,
				},
			})
		},
		[product, sku]
	)

	const onSubmit = useCallback(async () => {
		const blockchain = sku?.recordData?.recordNetwork
		const quantity = sku.recorded_quantity

		try {
			setLoading(true)

			let deployHash = await web3({
				chain: blockchain,
				method: 'request',
				params: { sku, shop, deployedContracts: sku.deployedShopAddress },
				wallets,
				stack,
			})

			if (blockchain === 'SOLANA') {
				await request('off-chain', quantity, blockchain, {
					status: 'SUCCESS',
					events: [
						{
							name: 'RequestProduct',
							details: {
								...sku.recordData.data.details,
								publisher: deployHash,
							},
						},
					],
				})
				deployHash = 'Solana requests are handled off-chain to avoid account storage fees'
			} else {
				await request(deployHash, quantity, blockchain)
			}
			setHahskey(deployHash)
			setLoading(false)
		} catch (error) {
			setLoading(false)
			if (error?.message && !error?.message.includes('The first argument'))
				showToast({ message: error.message, type: 'error' })
		}
	}, [sku, product, shop, wallets, stack.stxAddress])

	return (
		<Formik
			initialValues={{
				quantity: '',
			}}
			validateOnChange={false}
			onSubmit={onSubmit}
		>
			{(formik) => (
				<ModalRequestContext.Provider value={{ product, sku, formik, loading: Loading }}>
					<Form>
						<VStack align={'stretch'} color="#FFF" spacing={8}>
							<Box>
								<ModalRequestDetails />
							</Box>
							<Box>
								<RequestSpecs />
							</Box>
							<Box>
								<RequestModalButtons close={close} />
							</Box>
						</VStack>
					</Form>
				</ModalRequestContext.Provider>
			)}
		</Formik>
	)
}

export default ModalRequestForm
