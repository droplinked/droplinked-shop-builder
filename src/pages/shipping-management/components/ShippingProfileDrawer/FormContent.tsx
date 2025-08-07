import { AppAccordion } from 'components/redesign/accordion/AppAccordion'
import React from 'react'
import GeneralInformationAccordion from './components/accordions/GeneralInformationAccordion'
import ZonesRatesAccordion from './components/accordions/ZonesRatesAccordion'

const FormContent = () => {
    return (
        <AppAccordion
            display="flex"
            flexDirection="column"
            gap={4}
            paddingBlock={12}
            paddingInline={9}
            multiCollapse
        >
            <GeneralInformationAccordion />
            <ZonesRatesAccordion />
        </AppAccordion>
    )
}

export default FormContent
