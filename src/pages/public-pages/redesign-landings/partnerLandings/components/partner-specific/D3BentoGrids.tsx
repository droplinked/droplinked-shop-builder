// D3-specific features section with bento grid layout
import React from 'react'
import SectionContainer from '../../../_shared/components/SectionContainer/SectionContainer'
import BentoGrids from '../../svgs/BentoGrids'

export default function D3BentoGrids() {

    return (
        <SectionContainer
            icon='sparkle'
            sectionTitle='SET OF FEATURES'
            headingTitle={`Join Your Community`}
            headingSubtitle={`Unlock exclusive perks and benefits today by proving ownership`}
            typographySvg={<BentoGrids />}
        >
           <p color='white'>BentoGrids</p>
        </SectionContainer>

        
    )
} 