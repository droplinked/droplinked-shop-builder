import { Box, Flex, Radio, RadioGroup, useDisclosure } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import AppTypography from 'components/common/typography/AppTypography'
import useAppToast from 'hooks/toast/useToast'
import { IupdateSampleService } from 'services/order/interfaces'
import { updateSampleService } from 'services/order/services'
import productOrderContext from 'pages/order-sample-pod/context'
import React, { useContext } from 'react'
import { useMutation } from 'react-query'
import ProductOrderCard from '../../card/ProductOrderCard'
import PaymentModal from './parts/payment-modal/PaymentModal'
import classes from "./style.module.scss"
import { useCurrencyConverter } from 'hooks/useCurrencyConverter/useCurrencyConverter'

function ProductOrderShipments() {
    const { getFormattedPrice } = useCurrencyConverter()
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
                                <Box key={key} border="1px solid" borderColor={`${el.id === rateId ? "#FFF" : "neutral.gray.600"}`} padding={4} borderRadius="8px">
                                    <Radio layerStyle={{}} w="100%" alignItems="start" value={el.id}>
                                        <Flex direction={"column"} gap={1}>
                                            <AppTypography fontSize="14px" fontWeight="600">{el.title}</AppTypography>
                                            <Flex justifyContent="space-between">
                                                <Flex alignItems="center" gap="8px">
                                                    <AppTypography color="neutral.gray.400">Fulfillment Date</AppTypography>
                                                    <Box width="4px" height="4px" borderRadius="100%" backgroundColor="#FFF"></Box>
                                                    <AppTypography>{el.delivery_estimation}</AppTypography>
                                                </Flex>
                                                <Flex alignItems="center" gap="8px">
                                                    <AppTypography color="neutral.gray.400">Price</AppTypography>
                                                    <Box width="4px" height="4px" borderRadius="100%" backgroundColor="#FFF"></Box>
                                                    <AppTypography>{`${getFormattedPrice({ amount: el.price, toFixed: true })}`}</AppTypography>
                                                </Flex>
                                            </Flex>
                                        </Flex>
                                    </Radio>
                                </Box>
                            ))}
                            <Flex justifyContent="space-between" alignItems="center">
                                <AppTypography fontSize="16px" color="#C2C2C2">Tax</AppTypography>
                                <AppTypography fontSize="16px" color="#C2C2C2">{`${getFormattedPrice({ amount: taxAmount, toFixed: true })}`}</AppTypography>
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