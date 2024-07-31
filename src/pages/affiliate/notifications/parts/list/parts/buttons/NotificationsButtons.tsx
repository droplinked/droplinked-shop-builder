import { useDisclosure } from '@chakra-ui/react'
import useStack from 'functions/hooks/stack/useStack'
import useAppToast from 'functions/hooks/toast/useToast'
import acceptModel from 'functions/hooks/web3/models/module/accept/acceptModel'
import useAppWeb3 from 'functions/hooks/web3/useWeb3'
import useAppStore from 'lib/stores/app/appStore'
import { capitalizeFirstLetter } from 'lib/utils/heper/helpers'
import React, { useCallback, useState } from 'react'
import { requestsButtonsContext } from './context'
import requestInterfaces from './interfaces'
import RequestButtons from './parts/buttons/RequestButtons'
import ModalHashkey from './parts/hashkey/ModalHashkey'
import NotificationsModal from './parts/modal/NotificationsModal'

function NotificationsButtons({ shop, refetch, sku, recordData }: requestInterfaces.Iprops) {
	const modal = useDisclosure()
	const modalHashKey = useDisclosure()
	const { showToast } = useAppToast()
	const { web3 } = useAppWeb3()
	const { user: { wallets } } = useAppStore()

	const [States, setStates] = useState<requestInterfaces.IStates>({
		status: null,
		loading: false,
		deployHash: null,
		blockchain: null,
	})
	const stack = useStack()

	const setLoading = useCallback(
		(value: boolean) => setStates((prev) => ({ ...prev, loading: value })),
		[]
	)

	const closeModalHashkey = useCallback(() => {
		modalHashKey.onClose()
		refetch()
	}, [])

	const submit = useCallback(async () => {
		try {
			let blockchain = shop.sku[0]?.recordData?.recordNetwork
			setLoading(true)
			if (States.status === 'accept') {
				const deploy_hash = await web3({
					chain: blockchain,
					method: 'accept',
					params: {
						shop,
						accept: States.status === 'accept',
						deployedContracts: null,
						sku,
						recordData,
					},
					wallets,
					stack,
				})
				modalHashKey.onOpen()
				setStates((prev) => ({ ...prev, deployHash: deploy_hash, blockchain }))
			} else {
				await acceptModel.deploy({ deployHash: null, accept: false, chain: blockchain, shop })
				refetch()
			}

			setLoading(false)
			modal.onClose()
			showToast({
				message: `Request status change ${capitalizeFirstLetter(States.status)}`,
				type: 'success',
			})
		} catch (error) {
			setLoading(false)
			if (error?.message && !error?.message.includes('The first argument'))
				showToast({ message: error.message, type: 'error' })
		}
	}, [States.status, shop, refetch, modal, wallets, stack.stxAddress])

	return (
		<requestsButtonsContext.Provider
			value={{ shop, modal: { open: modal.onOpen }, methods: { setStates } }}
		>
			<RequestButtons />
			<NotificationsModal
				status={States.status}
				loading={States.loading}
				close={modal.onClose}
				approveClick={submit}
				open={modal.isOpen}
			/>
			<ModalHashkey
				close={closeModalHashkey}
				blockchain={States.blockchain}
				hashkey={States.deployHash}
				open={modalHashKey.isOpen}
			/>
		</requestsButtonsContext.Provider>
	)
}

export default NotificationsButtons
