import { BoxLg } from 'assets/icons/Finance/Box/BoxLg'
import { PriceplanLg } from 'assets/icons/Finance/PricePlan/PriceplanLg'
import { DesignLg } from 'assets/icons/StyleDesigner/Design/DesignLg'
import React from 'react'
import CardImage from '../_shared/components/card/CardImage'
import { CardData } from '../_shared/components/card/Cards'
import PlatformFunctionalities from '../_shared/components/PlatformFunctionalities'
import ProPlanCard from './ProPlanCard'

export default function SocialQuestsModularStack() {
    const cardsData: CardData[] = [
        {
            icon: <BoxLg color="#fff" />,
            title: "Selling on droplinked",
            description: "Selling on droplinked is easy, transparent and efficient. Follow our step-by-step guide to launch a product and start reaching customers quickly.",
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" },
            children: <CardImage alt='access-10k-products-instantly' src='https://upload-file-droplinked.s3.amazonaws.com/7ef9761f12298af32587cb4d9e9b9eefb93a55ef7269894373f913e1b75f9b67.png' />
        },
        {
            icon: <DesignLg color="#fff" />,
            title: "Customizable Storefront",
            description: "Make Storefront your own by customizing the design and enhance the experience by reflecting your brand identity in the best way possible.",
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" },
            children: <CardImage alt='web3-technology-support' src='https://upload-file-droplinked.s3.amazonaws.com/cb910f0c6efffc0720b782fcb17d6b77866f3bebf75516a6595f5a8148e72b32.png' />
        },
        {
            icon: <PriceplanLg color="#fff" />,
            title: "Pro Plan",
            description: "Enjoy premium features.",
            gridColumn: { base: "1fr", md: "span 2", lg: "span 2" },
            hasBackgroundOverlay: true,
            children: <ProPlanCard />
        }
    ]

    return <PlatformFunctionalities cardsData={cardsData} />
}
