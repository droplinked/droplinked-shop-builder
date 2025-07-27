import { Flex } from '@chakra-ui/react'
import AppCard from 'components/common/card/AppCard'
import AppTypography from 'components/common/typography/AppTypography'
import React, { useState } from 'react'
import productOrderContext, { productOrderStates } from './context'
import ProductOrderAddress from './parts/steps/address/ProductOrderAddress'
import ProductOrderShipments from './parts/steps/shipments/ProductOrderShipments'
import ProductOrderSkues from './parts/steps/skues/ProductOrderSkues'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import arLocale from 'locales/order-sample-pod/ar.json'
import enLocale from 'locales/order-sample-pod/en.json'

function ProductOrder() {
    const [States, setStates] = useState(productOrderStates)
    const [resetKey, setResetKey] = useState(0)
    const { t } = useLocaleResources("orderSamplePOD", {
        ar: arLocale,
        en: enLocale
    })

    const updateState = (key, value) => setStates(prev => ({ ...prev, [key]: value }))
    const resetState = () => {
        setStates(prev => ({ ...prev, skus: {}, shipmentRates: [], rateId: null, orderId: null, taxAmount: null }))
        setResetKey(prev => prev + 1)
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    return (
        <productOrderContext.Provider value={{ methods: { updateState, resetState }, params: { ...States } }} key={resetKey}>
            <Flex justifyContent="center">
                <AppCard mini boxProps={{ padding: 0, background: "none" }}>
                    <Flex direction={"column"} color="#fff" gap={4}>
                        <Flex direction={"column"} gap={2}>
                            <AppTypography fontSize="18px" fontWeight="bold">{t("ProductOrder.title")}</AppTypography>
                            <AppTypography fontSize="14px" color="#C2C2C2">{t("ProductOrder.desc")}</AppTypography>
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