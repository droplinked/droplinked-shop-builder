import { BoxLg } from 'assets/icons/Finance/Box/BoxLg'
import { PriceplanLg } from 'assets/icons/Finance/PricePlan/PriceplanLg'
import { DesignLg } from 'assets/icons/StyleDesigner/Design/DesignLg'
import React from 'react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import CardImage from '../_shared/components/card/CardImage'
import { CardData } from '../_shared/components/card/Cards'
import PlatformFunctionalities from '../_shared/components/PlatformFunctionalities'
import ProPlanCard from './ProPlanCard'
import localEn from 'locales/public-pages/landings/social-quests/en.json'
import localAr from 'locales/public-pages/landings/social-quests/ar.json'

export default function SocialQuestsModularStack() {
    const { t } = useLocaleResources('public-pages/landings/social-quests', {
        en: localEn,
        ar: localAr
    })
    const cardsData: CardData[] = [
        {
            icon: <BoxLg color="#fff" />,
            title: t('modularStack.cards.sellingOnDroplinked.title'),
            description: t('modularStack.cards.sellingOnDroplinked.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" },
            children: <CardImage alt='access-10k-products-instantly' src='https://upload-file-droplinked.s3.amazonaws.com/7ef9761f12298af32587cb4d9e9b9eefb93a55ef7269894373f913e1b75f9b67.png' />
        },
        {
            icon: <DesignLg color="#fff" />,
            title: t('modularStack.cards.customizableStorefront.title'),
            description: t('modularStack.cards.customizableStorefront.description'),
            gridColumn: { base: "1fr", md: "span 1", lg: "span 1" },
            children: <CardImage alt='web3-technology-support' src='https://upload-file-droplinked.s3.amazonaws.com/cb910f0c6efffc0720b782fcb17d6b77866f3bebf75516a6595f5a8148e72b32.png' />
        },
        {
            icon: <PriceplanLg color="#fff" />,
            title: t('modularStack.cards.proPlan.title'),
            description: t('modularStack.cards.proPlan.description'),
            gridColumn: { base: "1fr", md: "span 2", lg: "span 2" },
            hasBackgroundOverlay: true,
            children: <ProPlanCard />
        }
    ]

    return <PlatformFunctionalities cardsData={cardsData} />
}
