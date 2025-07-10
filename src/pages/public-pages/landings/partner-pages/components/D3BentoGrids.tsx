import React from 'react'
import SectionContainer from '../../_shared/components/SectionContainer/SectionContainer'
import Features from '../assets/Features'

export default function D3BentoGrids() {

    return (
        <SectionContainer
            icon='sparkle'
            sectionTitle='SET OF FEATURES'
            headingTitle={`Join Your Community`}
            headingSubtitle={`Unlock exclusive perks and benefits today by proving ownership`}
            typographySvg={<Features />}
        >
           <p color='white'>BentoGrids</p>
        </SectionContainer>

        
    )
}
