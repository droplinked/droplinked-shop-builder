import React from 'react'
import SectionContainer from '../../components/SectionContainer/SectionContainer'
import MaxWidthWrapper from '../../components/MaxWidthWrapper'

export default function SetOfPerks() {
    return (
        <MaxWidthWrapper my="80px">
            <SectionContainer
                icon='story'
                sectionTitle='SET OF PERKS'
                headingTitle='Perks for Crossmint Members'
                headingSubtitle='droplinked is offering 3 months of a pro plan for free'
                typographyText='Perks'
            />
        </MaxWidthWrapper>
    )
}
