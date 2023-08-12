import { Box, VStack } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import useStack from 'functions/hooks/stack/useStack'
import useAppToast from 'functions/hooks/toast/useToast'
import { IcasperRequestService } from 'lib/apis/affiliate/interfaces'
import { requestService } from 'lib/apis/affiliate/shopServices'
import { Isku } from 'lib/apis/product/interfaces'
import { PolygonLogin } from 'lib/utils/blockchain/polygon/metamaskLogin'
import { publish_request_polygon } from 'lib/utils/blockchain/polygon/request'
import stacksRequest from 'lib/utils/blockchain/stacks/request'
import RecordCasperModule from 'pages/product/single/parts/modules/variants/parts/table/parts/recordModal/parts/form/model/modules/casperModel'
import RecordModalModule from 'pages/product/single/parts/modules/variants/parts/table/parts/recordModal/parts/form/model/recordFormModel'
import React, { useCallback, useState } from 'react'
import { useMutation } from 'react-query'
import { ModalRequestContext } from './context'
import ModalRequestModel, { IRequestModelValues } from './model'
import RequestModalButtons from './parts/buttons/RequestModalButtons'
import ModalRequestDetails from './parts/details/ModalRequestDetails'
import RequestQuantity from './parts/quantity/RequestQuantity'
import RequestSpecs from './parts/specs/RequestSpecs'

interface IProps {
    product: any
    sku: Isku
    shop: any
    close: Function
    setHahskey(hashkey: string): void
}

function ModalRequestForm({ product, shop, sku, setHahskey, close }: IProps) {
    const { mutateAsync } = useMutation((params: IcasperRequestService) => requestService(params))
    const { formSchema, publish_request, rippleRequest } = ModalRequestModel
    const { openCasperWallet } = RecordCasperModule
    const { showToast } = useAppToast()
    const { login, isRequestPending, openContractCall, stxAddress } = useStack()
    const [Loading, setLoading] = useState(false)

    const request = useCallback(async (deployHash: string, quantity: number, chain: string) => {
        return mutateAsync({
            chain,
            params: {
                productID: product._id,
                deploy_hash: deployHash,
                quantity,
                skuID: sku._id,
                shopID: shop._id
            }
        })
    }, [product, sku])

    const onSubmit = useCallback(async (values: IRequestModelValues) => {
        const blockchain = sku?.recordData?.recordNetwork
        const quantity = parseInt(values.quantity)
        let deployHash = ""

        try {
            setLoading(true)
            const tokenID = sku?.recordData?.data?.details?.token_id
            if (blockchain === "CASPER") {
                const casperWallet = await openCasperWallet()
                const publish = await publish_request({ casperWallet, quantity, sku })
                deployHash = publish.deployHash
            } else if (blockchain === "STACKS") {
                await login()
                const request = await stacksRequest({
                    isRequestPending,
                    openContractCall,
                    params: {
                        amount: quantity,
                        commission: sku?.recordData?.data?.details?.commision,
                        id: parseInt(tokenID),
                        publisher: stxAddress
                    }
                })
                if (request) deployHash = request.txId
            } else if (blockchain === "POLYGON") {
                const login = await PolygonLogin()
                const request = await publish_request_polygon(login.address, sku?.recordData?.data?.details?.recipient, tokenID)
                if (request) deployHash = request
            } else if (blockchain === "RIPPLE") {
                const request = await rippleRequest()
            }

            if (deployHash) {
                await request(deployHash, quantity, blockchain)
                setHahskey(deployHash)
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
            if (error?.message && !error?.message.includes("The first argument")) showToast(error.message, "error")
        }
    }, [sku, product, shop])

    return (
        <Formik
            initialValues={{
                quantity: '',
            }}
            validateOnChange={false}
            validationSchema={formSchema}
            onSubmit={onSubmit}
        >
            {(formik) => (
                <ModalRequestContext.Provider value={{ product, sku, formik, loading: Loading }}>
                    <Form>
                        <VStack align={"stretch"} color="#FFF" spacing={8}>
                            <Box><ModalRequestDetails /></Box>
                            <Box><RequestSpecs /></Box>
                            <Box><RequestQuantity /></Box>
                            <Box><RequestModalButtons close={close} /></Box>
                        </VStack>
                    </Form>
                </ModalRequestContext.Provider>
            )}
        </Formik >
    )
}

export default ModalRequestForm