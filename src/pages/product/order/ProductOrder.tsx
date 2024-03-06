import { Flex } from '@chakra-ui/react'
import AppCard from 'components/common/card/AppCard'
import AppTypography from 'components/common/typography/AppTypography'
import React, { useState } from 'react'
import productOrderContext, { productOrderStates } from './context'
import ProductOrderAddress from './parts/steps/address/ProductOrderAddress'
import ProductOrderShipments from './parts/steps/shipments/ProductOrderShipments'
import ProductOrderSkues from './parts/steps/skues/ProductOrderSkues'

function ProductOrder() {
    const [States, setStates] = useState(productOrderStates)
    const updateState = (key, value) => setStates(prev => ({ ...prev, [key]: value }))

    return (
        <productOrderContext.Provider value={{ methods: { updateState }, params: { ...States } }}>
            <Flex justifyContent="center">
                <AppCard mini boxProps={{ padding: 0, background: "none" }}>
                    <Flex direction={"column"} color="#fff" gap={4}>
                        <Flex direction={"column"} gap={2}>
                            <AppTypography fontSize="18px" fontWeight="bold">Order Sample Product</AppTypography>
                            <AppTypography fontSize="14px" color="#C2C2C2">Select your products to receive a sample.</AppTypography>
                        </Flex>
                        <ProductOrderSkues />
                        <ProductOrderAddress />
                        <ProductOrderShipments />
                    </Flex>
                </AppCard>
            </Flex>
        </productOrderContext.Provider>
    )
}

export default ProductOrder