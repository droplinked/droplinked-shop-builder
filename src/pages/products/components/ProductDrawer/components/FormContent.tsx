import { Flex } from '@chakra-ui/react'
import { AppAccordion } from 'components/redesign/accordion/AppAccordion'
import React from 'react'
import GeneralInformationAccordion from './GeneralInformationAccordion'

function FormContent() {
    return (
        <Flex
            direction="column"
            gap={12}
            paddingBlock={12}
            paddingInline={9}
            sx={{ label: { fontSize: 16, fontWeight: 500 } }}
        >
            <AppAccordion
                width="full"
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
                gap={12}
            >
                <GeneralInformationAccordion />
            </AppAccordion>
        </Flex>
    )
}

export default FormContent