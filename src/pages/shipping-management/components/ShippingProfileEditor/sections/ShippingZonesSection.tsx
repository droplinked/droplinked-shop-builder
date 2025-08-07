import { Box } from '@chakra-ui/react'
import React from 'react'
import SectionAccordion from '../components/SectionAccordion'

const ShippingZonesSection = () => (
    <SectionAccordion id="zones-rates" title="Zones & Rates">
        <Box color="neutral.white">Zones and rates form fields will go here.</Box>
    </SectionAccordion>
)

export default React.memo(ShippingZonesSection)
