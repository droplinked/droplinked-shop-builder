import { AppAccordion } from 'components/redesign/accordion/AppAccordion'
import useProductForm from 'pages/products/hooks/useProductForm'
import useSetFormDefaultValues from 'pages/products/hooks/useSetFormDefaultValues'
import React, { memo } from 'react'
import AdditionalDetailsAccordion from './components/accordions/AdditionalDetailsAccordion'
import GeneralInformationAccordion from './components/accordions/GeneralInformationAccordion'
import PODDesignAccordion from './components/accordions/PODDesignAccordion'
import PODMint2MerchAccordion from './components/accordions/PODMint2MerchAccordion'
import ProductVariantsAccordion from './components/accordions/ProductVariantsAccordion'
import ShippingAccordion from './components/accordions/ShippingAccordion'
import Web3SettingsAccordion from './components/accordions/Web3SettingsAccordion'

function FormContent() {
    const { values: { product_type } } = useProductForm()
    useSetFormDefaultValues()

    const renderPODAccordions = () => (
        <>
            <PODDesignAccordion />
            <PODMint2MerchAccordion />
        </>
    )

    return (
        <AppAccordion
            width="full"
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            gap={12}
            paddingBlock={12}
            paddingInline={9}
            multiCollapse
        >
            {product_type === 'PRINT_ON_DEMAND' && renderPODAccordions()}
            <GeneralInformationAccordion />
            <ProductVariantsAccordion />
            {product_type === 'NORMAL' && <ShippingAccordion />}
            <Web3SettingsAccordion />
            <AdditionalDetailsAccordion />
        </AppAccordion>
    )
}

export default memo(FormContent)