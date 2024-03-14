import { Box, Flex, Radio, RadioGroup, useDisclosure } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import AppTypography from 'components/common/typography/AppTypography'
import useAppToast from 'functions/hooks/toast/useToast'
import { IupdateSampleService } from 'lib/apis/order/interfaces'
import { updateSampleService } from 'lib/apis/order/services'
import productOrderContext from 'pages/product/order/context'
import React, { useContext } from 'react'
import { useMutation } from 'react-query'
import ProductOrderCard from '../../card/ProductOrderCard'
import PaymentModal from './parts/payment-modal/PaymentModal'
import classes from "./style.module.scss"

function ProductOrderShipments() {
    const { params: { shipmentRates, rateId }, methods: { updateState } } = useContext(productOrderContext)
    const { params: { taxAmount } } = useContext(productOrderContext)
    const { mutateAsync, isLoading, data } = useMutation((params: IupdateSampleService) => updateSampleService(params))
    const { showToast } = useAppToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const response = data?.data.data

    const submit = async () => {
        try {
            if (!rateId) throw Error('Please select a rate method')
            await mutateAsync({ rateId })
            onOpen()
        } catch (error) {
            showToast({ type: 'error', message: error?.message })
        }
    }

    return shipmentRates && Object.keys(shipmentRates).length ? (
        <>
            <ProductOrderCard title="Shipping Methods">
                <Flex direction={"column"} gap={4}>
                    <RadioGroup className={classes.fullwidth} onChange={e => updateState('rateId', e)}>
                        <Flex direction={"column"} gap={4}>
                            {shipmentRates.map((el, key) => (
                                <Box key={key} border={`1px solid ${el.id === rateId ? "#FFF" : "#616161"}`} padding={4} borderRadius="8px">
                                    <Radio layerStyle={{}} w="100%" alignItems="start" value={el.id}>
                                        <Flex direction={"column"} gap={1}>
                                            <AppTypography fontSize="14px" fontWeight="600">{el.title}</AppTypography>
                                            <Flex justifyContent="space-between">
                                                <Flex alignItems="center" gap="8px">
                                                    <AppTypography color="#878787">Fulfillment Date</AppTypography>
                                                    <Box width="4px" height="4px" borderRadius="100%" backgroundColor="#FFF"></Box>
                                                    <AppTypography>{el.delivery_estimation}</AppTypography>
                                                </Flex>
                                                <Flex alignItems="center" gap="8px">
                                                    <AppTypography color="#878787">Price</AppTypography>
                                                    <Box width="4px" height="4px" borderRadius="100%" backgroundColor="#FFF"></Box>
                                                    <AppTypography>{`$${el.price.toFixed(2)} USD`}</AppTypography>
                                                </Flex>
                                            </Flex>
                                        </Flex>
                                    </Radio>
                                </Box>
                            ))}
                            <Flex justifyContent="space-between" alignItems="center">
                                <AppTypography fontSize="16px" color="#C2C2C2">Tax</AppTypography>
                                <AppTypography fontSize="16px" color="#C2C2C2">{`$${taxAmount} USD`}</AppTypography>
                            </Flex>
                        </Flex>
                    </RadioGroup>
                    <Flex flexDirection="row-reverse" gap={4}>
                        <BasicButton onClick={submit} isLoading={isLoading}>Pay with Stripe</BasicButton>
                        <BasicButton onClick={() => {
                            updateState('shipmentRates', [])
                            updateState('orderId', null)
                        }} variant="outline">Back</BasicButton>
                    </Flex>
                </Flex>
            </ProductOrderCard >
            <PaymentModal isOpen={isOpen} close={onClose} clientSecret={response?.clientSecret!} amount={response?.amount} />
        </>
    ) : null
}

export default ProductOrderShipments