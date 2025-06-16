import React from 'react'
import MaxWidthWrapper from '../common/MaxWidthWrapper'
import SectionContainer from '../common/SectionContainer/SectionContainer'
import { Grid } from '@chakra-ui/react'
import ProductOfferingCard from './ProductOfferingCard'

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

            <Grid>
                <ProductOfferingCard
                    icon={<div>Services</div>}
                    title="Services"
                    description="Offer skills like consulting, design work, and more with onchain automation"
                    animation={<div>Animation 1</div>}
                />
                <ProductOfferingCard
                    icon={<div>Icon 2</div>}
                    title="Physical Products"
                    description="Manage inventory and sales with secure blockchain-backed transactions"
                    animation={<div>Animation 2</div>}
                />
                <ProductOfferingCard
                    icon={<div>Icon 2</div>}
                    title="Digital Products"
                    description="Offer eBooks, online courses, software, and more with easy distribution"
                    animation={<div>Animation 2</div>}
                />
                <ProductOfferingCard
                    icon={<div>POD and NFT’s - Mint to MerchTM</div>}
                    title="POD and NFT’s - Mint to MerchTM"
                    description="Create and sell unique items using digital art, collectibles, and other blockchain-based items"
                    animation={<div>Animation 2</div>}
                />
            </Grid>
        </MaxWidthWrapper>
    )
}
