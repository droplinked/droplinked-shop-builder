import { Box, Flex, Radio, RadioGroup, VStack } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import AppTypography from 'components/common/typography/AppTypography'
import useAppToast from 'functions/hooks/toast/useToast'
import { IupdateSampleService } from 'lib/apis/order/interfaces'
import { updateSampleService } from 'lib/apis/order/services'
import productOrderContext from 'pages/product/order/context'
import React, { useContext } from 'react'
import { useMutation } from 'react-query'
import ProductOrderCard from '../../card/ProductOrderCard'
import classes from './style.module.scss'

function ProductOrderShipments() {
    const { params: { shipmentRates, rateId }, methods: { updateState } } = useContext(productOrderContext)
    const { mutateAsync, isLoading } = useMutation((params: IupdateSampleService) => updateSampleService(params))
    const { showToast } = useAppToast()

    const submit = async () => {
        try {
            if (!rateId) throw Error('Please enter rate method')
            await mutateAsync({ rateId })
        } catch (error) {
            showToast({ type: 'error', message: error?.message })
        }
    }

    return shipmentRates && Object.keys(shipmentRates).length ? (
        <ProductOrderCard title="Shipping Methods">
            <VStack align="stretch" spacing="15px">
                <RadioGroup className={classes.fullwidth} onChange={e => updateState('rateId', e)}>
                    <VStack align="stretch" spacing="15px">
                        {shipmentRates.map((el, key) => (
                            <Box key={key} border={`1px solid ${el.id === rateId ? "#FFF" : "#616161"}`} padding="15px" borderRadius="8px">
                                <Radio layerStyle={{}} w="100%" alignItems="start" value={el.id}>
                                    <VStack align="stretch">
                                        <AppTypography fontSize="14px" fontWeight="600">{el.title}</AppTypography>
                                        <Flex justifyContent="space-between">
                                            <Flex alignItems="center" gap="7px">
                                                <AppTypography color="#878787">Fulfillment Date</AppTypography>
                                                <Box width="4px" height="4px" borderRadius="100%" backgroundColor="#FFF"></Box>
                                                <AppTypography>{el.delivery_estimation}</AppTypography>
                                            </Flex>
                                            <Flex alignItems="center" gap="7px">
                                                <AppTypography color="#878787">Price</AppTypography>
                                                <Box width="4px" height="4px" borderRadius="100%" backgroundColor="#FFF"></Box>
                                                <AppTypography>{el.price}</AppTypography>
                                            </Flex>
                                        </Flex>
                                    </VStack>
                                </Radio>
                            </Box>
                        ))}
                    </VStack>
                </RadioGroup>
                <Flex flexDirection="row-reverse" gap="20px">
                    <BasicButton onClick={submit} isLoading={isLoading}>Pay with Stripe</BasicButton>
                    <BasicButton onClick={() => updateState('shipmentRates', [])} variant="outline">Back</BasicButton>
                </Flex>
            </VStack>
        </ProductOrderCard >
    ) : null
}

export default ProductOrderShipments