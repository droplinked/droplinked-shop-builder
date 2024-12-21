import { Flex } from '@chakra-ui/react'
import { AppAccordion } from 'components/redesign/accordion/AppAccordion'
import React from 'react'
import AdditionalDetailsAccordion from './accordions/AdditionalDetailsAccordion'
import GeneralInformationAccordion from './accordions/GeneralInformationAccordion'
import PhysicalProductVariants from './accordions/PhysicalProductVariants'
import ShippingAccordion from './accordions/ShippingAccordion'
import Web3SettingsAccordion from './accordions/Web3SettingsAccordion'

function FormContent() {
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