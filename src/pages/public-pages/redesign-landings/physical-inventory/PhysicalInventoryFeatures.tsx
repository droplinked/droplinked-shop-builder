import { CodeLg } from 'assets/icons/Coding/Code/CodeLg'
import { DesignLg } from 'assets/icons/StyleDesigner/Design/DesignLg'
import { Layout2Lg } from 'assets/icons/StyleDesigner/Layout2/Layout2Lg'
import React from 'react'
import SectionContainer from '../_shared/components/SectionContainer/SectionContainer'
import Cards, { CardData } from '../_shared/components/card/Cards'
import Features from '../_shared/svgs/Features'

function PhysicalInventoryFeatures() {
    const cardsData: CardData[] = [
        {
            icon: <Layout2Lg color="#fff" />,
            title: "Template Engine Tools",
            description: "Utilize our template engine tools for easy customization",
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
        {
            icon: <CodeLg color="#fff" />,
            title: "Customization with CSS & HTML ",
            description: "Ready to go further? Dive into customization with implementing CSS and HTML coding",
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
        {
            icon: <DesignLg color="#fff" />,
            title: "Create Custom Templates",
            description: "Seeking a unique template? Our designers are here to turn your vision into reality",
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        }
    ]

    return (
        <SectionContainer
            icon='story'
            sectionTitle='SET OF FEATURES'
            headingTitle='Front-End Modularity'
            headingSubtitle='Headless and fully customizable storefront setup'
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

export default PhysicalInventoryFeatures