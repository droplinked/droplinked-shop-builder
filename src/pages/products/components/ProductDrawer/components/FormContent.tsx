import { Flex } from '@chakra-ui/react'
import { AppAccordion } from 'components/redesign/accordion/AppAccordion'
import { useFormikContext } from 'formik'
import { ProductFormValues } from 'pages/products/utils/types'
import React from 'react'
import AdditionalDetailsAccordion from './accordions/AdditionalDetailsAccordion'
import GeneralInformationAccordion from './accordions/GeneralInformationAccordion'
import PhysicalProductVariants from './accordions/PhysicalProductVariants'
import PODDesignAccordion from './accordions/PODDesignAccordion'
import ShippingAccordion from './accordions/ShippingAccordion'
import Web3SettingsAccordion from './accordions/Web3SettingsAccordion'

function FormContent() {
    const { values: { product_type } } = useFormikContext<ProductFormValues>()

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
                <PODDesignAccordion />
                <GeneralInformationAccordion />
                <PhysicalProductVariants />
                <ShippingAccordion />
                <Web3SettingsAccordion />
                <AdditionalDetailsAccordion />
            </AppAccordion>
        </Flex>
    )
}

export default FormContent