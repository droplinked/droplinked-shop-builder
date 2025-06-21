import React from 'react'
import MaxWidthWrapper from '../../../components/MaxWidthWrapper'
import SectionContainer from '../../../components/SectionContainer/SectionContainer'
import CardsGrid from './CardsGrid'

export default function ProductOfferingSection() {
    const headingSubtitle = `droplinked supports a wide variety of inventory, from digital goods, physical items,
    merchandise and digital IP. Whether an artist, creator, or enterprise retailer, the
    technology helps easily manage physical and digital inventory and increase margins`

    return (
        <MaxWidthWrapper>
            <SectionContainer
                icon='story'
                sectionTitle='PRODUCT OFFERINGS'
                headingTitle='Sell Across Any Vertical'
                headingSubtitle={headingSubtitle}
                typographyText='Products'
            />
            <CardsGrid />
        </MaxWidthWrapper>
    )
}
