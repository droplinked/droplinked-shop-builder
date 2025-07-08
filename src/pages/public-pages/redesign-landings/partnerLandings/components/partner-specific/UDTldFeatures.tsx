// Unstoppable Domains TLD features section
import React from 'react'
import SectionContainer from '../../../_shared/components/SectionContainer/SectionContainer'
import Features from '../../assets/Features'

export default function UDTldFeatures() {

    return (
        <SectionContainer
            icon='sparkle'
            sectionTitle='SET OF FEATURES'
            headingTitle={`Featured TLD's`}
            headingSubtitle={`Unlock exclusive perks and benefits today by proving ownership`}
            typographySvg={<Features />}
        >
           <p color='white'>Features</p>
        </SectionContainer>
    )
} 