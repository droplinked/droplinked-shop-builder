import React from 'react'
import SectionContainer from '../_shared/components/SectionContainer/SectionContainer'
import { CardImage } from '../_shared/components/card'
import Cards, { CardData } from '../_shared/components/card/Cards'
import ModularStackTypography from '../_shared/svgs/ModularStackTypography'
import { ShopLg } from 'assets/icons/System/Shop/ShopLg'
import { RocketLg } from 'assets/icons/Action/Rocket/RocketLg'
import { Star2Lg } from 'assets/icons/System/Star2/Star2Lg'
import { DesignLg } from 'assets/icons/StyleDesigner/Design/DesignLg'
import { MetaverseLg } from 'assets/icons/System/Metaverse/MetaverseLg'
import { BrushLg } from 'assets/icons/StyleDesigner/Brush/BrushLg'


function MetaverseShowroomModularStack() {
    const cardsData: CardData[] = [
        {
            icon: <ShopLg color="#fff" />,
            title: "Virtual Showrooms",
            description: "Create fully immersive shopping environments where customers can explore, browse and engage",
            gridColumn: { base: '1', md: '1', lg: '1 / 3' },
            children: <CardImage alt='Virtual Showrooms' src='https://upload-file-droplinked.s3.amazonaws.com/c49374c13e78aa989cc54ff200a80b1daf36c9cf020b20b112a5e3050c378785.png' />
        },
        {
            icon: <RocketLg color="#fff" />,
            title: "Boost Engagement",
            description: "Enhance the customer experience with interactive 3D showrooms that offer a more dynamic way to interact with items",
            gridColumn: { base: '1', md: '2', lg: '3' },
            children: <CardImage alt='Boost Engagement' src='https://upload-file-droplinked.s3.amazonaws.com/a9c270953cbc427ebedee57b7cfc9675defea332f8d8e0e33a69168444647e8c.png' />
        },
        {
            icon: <Star2Lg color="#fff" />,
            title: "Next-Gen Retail",
            description: "Embrace the future of commerce by offering an interactive experience that stands out",
            gridColumn: { base: '1', md: '1', lg: '1' },
            children: <CardImage alt='Next-Gen Retail' src='https://upload-file-droplinked.s3.amazonaws.com/b4159100a4fcaf8718eecf33ebcb829d6159a12b7ef81b3101aec00d442c2545.png' />
        },
        {
            icon: <DesignLg color="#fff" />,
            title: "Virtual Showroom Creation",
            description: "Design and launch an immersive shop complete with virtual shelves, products and interactive elements",
            gridColumn: { base: '1', md: '2', lg: '2 / 4' },
            children: <CardImage alt='Virtual Showroom Creation' src='https://upload-file-droplinked.s3.amazonaws.com/1f25b79d3eaa42dd7dd6f4c97b6f0765443058cdedda7dbfecf3c0c6b3034146.png' />
        },
        {
            icon: <MetaverseLg color="#fff" />,
            title: "Immersive Experiences",
            description: "Let customers interact with products in an entirely new way by browsing a showroom filled with dynamic inventory",
            gridColumn: { base: '1', md: '1', lg: '1 / 3' },
            children: <CardImage alt='Immersive Experiences' src='https://upload-file-droplinked.s3.amazonaws.com/4d65e70075ed8204c6536c26e4fd58266cb7c9ccb0950ead7ffceec7312fcc42.png' />
        },
        {
            icon: <BrushLg color="#fff" />,
            title: "Brand Personalization",
            description: "Customize the virtual showroom to reflect your brand's identity while creating an unforgettable experience that embodies your brand",
            gridColumn: { base: '1', md: '2', lg: '3' },
            children: <CardImage alt='Brand Personalization' src='https://upload-file-droplinked.s3.amazonaws.com/517709352c2dfca3a4bb1715b75efd7cdbe02a966fb88272b5081931c42cbfa9.png' />
        }
    ]

    return (
        <SectionContainer
            icon='layer-web'
            sectionTitle='MODULAR STACK'
            headingTitle='Platform Functionalities'
            headingSubtitle='droplinked provides customizable tools and integrations to support any business'
            typographySvg={<ModularStackTypography />}
        >
            <Cards
                cardsData={cardsData}
            />
        </SectionContainer>
    )
}

export default MetaverseShowroomModularStack