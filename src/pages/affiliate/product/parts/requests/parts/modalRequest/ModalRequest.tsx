import { Box, VStack } from '@chakra-ui/react'
import AppModal, { IAppModal } from 'components/shared/modal/AppModal'
import { Form, Formik } from 'formik'
import { IcasperRequestService } from 'lib/apis/affiliate/interfaces'
import { casperRequestService } from 'lib/apis/affiliate/shopServices'
import { Isku } from 'lib/apis/product/interfaces'
import { publish_request } from 'lib/utils/blockchain/casper/casper_wallet_publish_request'
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

interface IProps extends IAppModal {
    product: any
    shop: any
    sku: Isku
}

function ModalRequest({ close, open, product, sku, shop }: IProps) {
    const { mutateAsync } = useMutation((params: IcasperRequestService) => casperRequestService(params))
    const { formSchema } = ModalRequestModel
    const { openCasperWallet } = RecordModalModule
    const [Loading, setLoading] = useState(false)

    const onSubmit = useCallback(async (values: IRequestModelValues) => {

        try {
            const casperWallet = await openCasperWallet()
            setLoading(true)
            const quantity = parseInt(values.quantity)
            const data = {
                holder_id: parseInt(sku?.recordData?.casperData?.details?.holder_id),
                amount: quantity,
                producer_public_key: sku?.recordData?.casperData?.details?.recipient,
                account_info: {
                    publicKey: casperWallet.publicKey,
                    account_hash: casperWallet.account_hash,
                    signature: casperWallet.signature
                },
            }

            const publish = await publish_request(data.holder_id, data.amount, data.producer_public_key, data.account_info)
            await mutateAsync({
                productID: product._id,
                deploy_hash: publish.deployHash,
                quantity,
                skuID: sku._id,
                shopID: shop._id
            })
            setLoading(false)
            toast.success("Request successful")
            close()
        } catch (error) {
            if (error?.message && !error?.message.includes("The first argument")) toast.error(error.message)
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
                <Form>
                    <ModalRequestContext.Provider value={{ product, sku, formik, loading: Loading }}>
                        <AppModal close={Loading ? () => { } : close} open={open} contentProps={{ padding: "60px" }} size="3xl">
                            <VStack align={"stretch"} color="#FFF" spacing={8}>
                                <Box><ModalRequestDetails /></Box>
                                <Box><RequestSpecs /></Box>
                                <Box><RequestQuantity /></Box>
                                <Box><RequestModalButtons close={Loading ? () => { } : close} /></Box>
                            </VStack>
                        </AppModal>
                    </ModalRequestContext.Provider>
                </Form>
            )}
        </Formik>
    )
}

export default ModalRequest