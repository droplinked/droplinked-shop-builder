import { Flex } from '@chakra-ui/react'
import { AppAccordion } from 'components/redesign/accordion/AppAccordion'
import useProductForm from 'pages/products/hooks/useProductForm'
import useSetFormDefaultValues from 'pages/products/hooks/useSetFormDefaultValues'
import React, { memo } from 'react'
import AdditionalDetailsAccordion from './accordions/AdditionalDetailsAccordion'
import GeneralInformationAccordion from './accordions/GeneralInformationAccordion'
import PhysicalProductVariants from './accordions/PhysicalProductVariants'
import PODDesignAccordion from './accordions/PODDesignAccordion'
import ShippingAccordion from './accordions/ShippingAccordion'
import Web3SettingsAccordion from './accordions/Web3SettingsAccordion'

function FormContent() {
    const { values: { product_type } } = useProductForm()
    useSetFormDefaultValues()

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
                {product_type === "NORMAL" && <ShippingAccordion />}
                <Web3SettingsAccordion />
                <AdditionalDetailsAccordion />
            </AppAccordion>
        </Flex>
    )
}

export default memo(FormContent)