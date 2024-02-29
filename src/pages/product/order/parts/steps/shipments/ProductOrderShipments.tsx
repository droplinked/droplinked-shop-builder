import { Flex, Radio, RadioGroup, VStack } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import productOrderContext from 'pages/product/order/context'
import React, { useContext } from 'react'
import ProductOrderCard from '../../card/ProductOrderCard'

function ProductOrderShipments() {
    const { params: { shipmentRates } } = useContext(productOrderContext)
    console.log("shipmentRates", shipmentRates);

    return shipmentRates ? (
        <ProductOrderCard title="Shipping Methods">
            <RadioGroup>
                <VStack align="stretch">
                    {shipmentRates.map((el, key) => (
                        <Radio key={key} value={el.id}>
                            <VStack align="stretch">
                                <AppTypography>{el.title}</AppTypography>
                                <Flex justifyContent="space-between">
                                    <Flex>
                                        <AppTypography></AppTypography>
                                    </Flex>
                                </Flex>
                            </VStack>
                        </Radio>
                    ))}
                </VStack>
            </RadioGroup>
        </ProductOrderCard>
    ) : null
}

export default ProductOrderShipments