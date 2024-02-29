import { Flex, VStack } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React, { useEffect, useState } from 'react'
import AppCard from 'components/common/card/AppCard'
import ProductOrderSkues from './parts/steps/skues/ProductOrderSkues'
import productOrderContext, { productOrderStates } from './context'
import ProductOrderAddress from './parts/steps/address/ProductOrderAddress'

function ProductOrder() {
    const [States, setStates] = useState(productOrderStates)

    const updateState = (key, value) => setStates(prev => ({ ...prev, [key]: value }))

    console.log("States", States);

    return (
        <productOrderContext.Provider value={{ methods: { updateState }, params: { ...States } }}>
            <Flex justifyContent="center">
                <AppCard mini boxProps={{ padding: 0, background: "none" }}>
                    <VStack align="stretch" color="#FFF" spacing="30px">
                        <VStack align="stretch">
                            <AppTypography fontSize="18px" fontWeight="bold">Order Sample Product</AppTypography>
                            <AppTypography fontSize="14px" color="#C2C2C2">Select your products to receive a sample.</AppTypography>
                        </VStack>
                        <ProductOrderSkues />
                        <ProductOrderAddress />
                    </VStack>
                </AppCard>
            </Flex>
        </productOrderContext.Provider>
    )
}

export default ProductOrder