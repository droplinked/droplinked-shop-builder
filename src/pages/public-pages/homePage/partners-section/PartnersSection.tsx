import React from 'react'
import MaxWidthWrapper from '../components/common/MaxWidthWrapper'
import SectionContainer from '../components/common/SectionContainer/SectionContainer'
import { Text } from '@chakra-ui/react'

export default function PartnersSection() {
    return (
        <MaxWidthWrapper boxProps={{ paddingBlock: 6 }}>
            <SectionContainer
                sectionTitle='ECOSYSTEM PARTNERS'
                flexProps={{ paddingBlock: 6 }}
            >
                <Text>Hi</Text>
            </SectionContainer>
        </MaxWidthWrapper>
    )
}
