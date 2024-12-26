import { Flex } from '@chakra-ui/react'
import { AppAccordion } from 'components/redesign/accordion/AppAccordion'
import useProductForm from 'pages/products/hooks/useProductForm'
import { SKU } from 'pages/products/utils/types'
import React, { memo, useEffect } from 'react'
import AdditionalDetailsAccordion from './accordions/AdditionalDetailsAccordion'
import GeneralInformationAccordion from './accordions/GeneralInformationAccordion'
import PhysicalProductVariants from './accordions/PhysicalProductVariants'
import PODDesignAccordion from './accordions/PODDesignAccordion'
import ShippingAccordion from './accordions/ShippingAccordion'
import Web3SettingsAccordion from './accordions/Web3SettingsAccordion'

function FormContent() {
    const { values: { product_type, sku }, setFieldValue } = useProductForm()

    useEffect(() => {
        if (product_type === "DIGITAL" && !sku.length) {
            let DigitalProductSKU: SKU = {
                externalID: "",
                price: 0,
                dimensions: { height: 0, length: 0, width: 0 },
                quantity: 0,
                recorded_quantity: 0,
                recordData: { status: "NOT_RECORDED" },
                deploy_hash: '',
                royalty: null
            }

            setFieldValue('sku', [DigitalProductSKU])
        }
    }, [product_type, sku, setFieldValue])

    return (
        <Flex
            direction="column"
            gap={12}
            paddingBlock={12}
            paddingInline={9}
        >
            <AppAccordion
                width="full"
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
                gap={12}
                multiCollapse
            >
                {product_type === "PRINT_ON_DEMAND" && <PODDesignAccordion />}
                <GeneralInformationAccordion />
                <PhysicalProductVariants />
                <ShippingAccordion />
                <Web3SettingsAccordion />
                <AdditionalDetailsAccordion />
            </AppAccordion>
        </Flex>
    )
}

export default memo(FormContent)