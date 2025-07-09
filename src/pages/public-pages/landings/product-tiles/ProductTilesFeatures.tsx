import { CodeLg } from 'assets/icons/Coding/Code/CodeLg'
import { DesignLg } from 'assets/icons/StyleDesigner/Design/DesignLg'
import { CartLg } from 'assets/icons/System/Cart/CartLg'
import React from 'react'
import SectionContainer from '../_shared/components/SectionContainer/SectionContainer'
import Cards, { CardData } from '../_shared/components/card/Cards'
import Features from '../_shared/svgs/Features'

function ProductTilesFeatures() {
    const cardsData: CardData[] = [
        {
            icon: <CodeLg color="#fff" />,
            title: "Easy Deployment",
            description: "Copy and paste the component into your website's source code to create a seamless experience for your customers",
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
        {
            icon: <CartLg color="#fff" />,
            title: "Seamless Checkout",
            description: "Customers stay on the same page during the checkout experience to keep things cohesive and consistent",
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        },
        {
            icon: <DesignLg color="#fff" />,
            title: "Customizable Designs",
            description: "Tailor the product tile design to match your brand's aesthetic, look and feel",
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" }
        }
    ]

    return (
        <SectionContainer
            icon='story'
            sectionTitle='SET OF FEATURES'
            headingTitle='Dynamic Product Tiles'
            headingSubtitle={`Generate and embed customizable product tiles across any site, \n enabling seamless purchases anywhere online`}
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

export default ProductTilesFeatures