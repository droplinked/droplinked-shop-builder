import { Box } from '@chakra-ui/react'
import React from 'react'
import SectionAccordion from '../components/SectionAccordion'

const ProfileGeneralSection = () => (
    <SectionAccordion id="profile-general" title="General Information" defaultOpen>
        <Box color="neutral.white">General information form fields will go here.</Box>
    </SectionAccordion>
)

export default React.memo(ProfileGeneralSection)
