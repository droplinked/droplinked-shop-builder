import { AppAccordion } from 'components/redesign/accordion/AppAccordion'
import useProductForm from 'pages/products/hooks/useProductForm'
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

    const renderPODAccordions = () => (
        <>
            <PODDesignAccordion />
            <PODMint2MerchAccordion />
        </>
    )

    return (
        <AppAccordion
            display="flex"
            flexDirection="column"
            gap={4}
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