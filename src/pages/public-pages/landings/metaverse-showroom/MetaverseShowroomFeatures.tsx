import { DesignLg } from 'assets/icons/StyleDesigner/Design/DesignLg'
import { MetaverseLg } from 'assets/icons/System/Metaverse/MetaverseLg'
import { CartLg } from 'assets/icons/System/Cart/CartLg'
import React from 'react'
import SectionContainer from '../_shared/components/SectionContainer/SectionContainer'
import Cards, { CardData } from '../_shared/components/card/Cards'
import Features from '../_shared/svgs/Features'

function MetaverseShowroomFeatures() {
    const cardsData: CardData[] = [
        {
            icon: <MetaverseLg color="#fff" />,
            title: "Immersive Experiences",
            description: "Bring inventory into metaverses and beyond with fully interactive, 3D virtual spaces that customers can explore",
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
        {
            icon: <DesignLg color="#fff" />,
            title: "Customizable Marketplace",
            description: "Separately offer customers a unique 3D store tailored to deliver an interactive and engaging shopping experience",
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
        {
            icon: <CartLg color="#fff" />,
            title: "Seamlessly Interactive",
            description: "Allow customers to browse, select, and purchase products directly within your virtual store",
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        }
    ]

    return (
        <SectionContainer
            icon='story'
            sectionTitle='SET OF FEATURES'
            headingTitle='Interactive Commerce Anywhere'
            headingSubtitle='Transform existing shops and inventory into a 3D experience where customers can explore and interact like never before'
            typographySvg={<Features />}
        >
            <Cards
                cardsData={cardsData}
                hasHoverEffect={true}
                templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
            />
        </SectionContainer>
    )
}

export default MetaverseShowroomFeatures