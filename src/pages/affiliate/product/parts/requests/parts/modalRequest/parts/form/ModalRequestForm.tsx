import { Box, VStack } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import useAppToast from 'hooks/toast/useToast'
import { IcasperRequestService } from 'lib/apis/affiliate/interfaces'
import { casperRequestService } from 'lib/apis/affiliate/shopServices'
import { Isku } from 'lib/apis/product/interfaces'
import RecordModalModule from 'pages/product/single/parts/modules/variants/parts/table/parts/recordModal/parts/form/recordFormModel'
import React, { useCallback, useState } from 'react'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
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
    const { mutateAsync } = useMutation((params: IcasperRequestService) => casperRequestService(params))
    const { formSchema, publish_request } = ModalRequestModel
    const { openCasperWallet } = RecordModalModule
    const { showToast } = useAppToast()
    const [Loading, setLoading] = useState(false)

    const onSubmit = useCallback(async (values: IRequestModelValues) => {
        try {
            const casperWallet = await openCasperWallet()
            setLoading(true)
            const quantity = parseInt(values.quantity)
            const publish = await publish_request({ casperWallet, quantity, sku })
            await mutateAsync({
                productID: product._id,
                deploy_hash: publish.deployHash,
                quantity,
                skuID: sku._id,
                shopID: shop._id
            })
            setLoading(false)
            setHahskey(publish.deployHash)
        } catch (error) {
            if (error?.message && !error?.message.includes("The first argument")) showToast(error.message, "error")
            setLoading(false)
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
                            <Box><RequestModalButtons close={Loading ? () => { } : close} /></Box>
                        </VStack>
                    </Form>
                </ModalRequestContext.Provider>
            )}
        </Formik >
    )
}

export default ModalRequestForm