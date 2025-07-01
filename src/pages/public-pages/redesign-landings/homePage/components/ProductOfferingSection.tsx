import { BoxLg } from 'assets/icons/Finance/Box/BoxLg'
import { PositionLg } from 'assets/icons/Sign/Position/PositionLg'
import { ImageLg } from 'assets/icons/System/Image/ImageLg'
import { MinttomerchLg } from 'assets/icons/System/MintToMerch/MinttomerchLg'
import React from 'react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import localEn from 'locales/public-pages/redesign-landings/homePage/en.json'
import localAr from 'locales/public-pages/redesign-landings/homePage/ar.json'
import { Cards } from '../../_shared/components/card'
import { CardData } from '../../_shared/components/card/Cards'
import InlineVideoPlayer from '../../_shared/components/InlineVideoPlayer'
import SectionContainer from '../../_shared/components/SectionContainer/SectionContainer'
import Products from '../svgs/Products'

export default function ProductOfferingSection() {
    const { t } = useLocaleResources('homePage', { en: localEn, ar: localAr })

    const cardsData: CardData[] = [
        {
            icon: <PositionLg color='#fff' />,
            title: t("productOfferings.cards.services.title"),
            description: t("productOfferings.cards.services.description"),
            gridColumn: { base: '1', md: '1 / -1', lg: '1 / 3' },
            children: <InlineVideoPlayer src="https://upload-file-droplinked.s3.amazonaws.com/2d590fabf845f1755d39c1f521b7abf37fa8fd253d15e826c02ad95e15d1d22b_or.webm" />,
            innerOverlay: "https://upload-file-droplinked.s3.amazonaws.com/7b228ed2a617cefa1a86123a032c7955b548d2b64d858532a2f7245d4f3c9ff2.png"
        },
        {
            icon: <BoxLg color='#fff' />,
            title: t("productOfferings.cards.digitalProducts.title"),
            description: t("productOfferings.cards.digitalProducts.description"),
            gridColumn: { base: '1', md: '1', lg: '3' },
            children: <InlineVideoPlayer src="https://upload-file-droplinked.s3.amazonaws.com/dd38f4a712c8f68e8375dd70bc92951c9a903dc49ad93bfcb6901bb0126079cd_or.webm" />,
            innerOverlay: 'https://upload-file-droplinked.s3.amazonaws.com/0adc77b2411ddedae289d4a13d1c264c2670995eb95e5bdf15c115ba77b077b7.png'
        },
        {
            icon: <ImageLg color='#fff' />,
            title: t("productOfferings.cards.physicalProducts.title"),
            description: t("productOfferings.cards.physicalProducts.description"),
            gridColumn: { base: '1', md: '2', lg: '1' },
            children: <InlineVideoPlayer src="https://upload-file-droplinked.s3.amazonaws.com/a8446a148de62ba284980a767f7284acc55e8a63d8955fc55f4271ed969a8a7e_or.webm" />,
            innerOverlay: 'https://upload-file-droplinked.s3.amazonaws.com/05c6d5f6d6f830993e96d7eb47f3f930d2aeec67a6c81fa2ba18fd255e9c64b6.png'
        },
        {
            icon: <MinttomerchLg color='#fff' />,
            title: t("productOfferings.cards.podAndNfts.title"),
            description: t("productOfferings.cards.podAndNfts.description"),
            gridColumn: { base: '1', md: '1 / -1', lg: '2 / 4' },
            children: <InlineVideoPlayer src="https://upload-file-droplinked.s3.amazonaws.com/3aca27f1be4b8c9a86b30f7a4648f6d40b70e28b6dd4f76213be8ed793f5603a_or.webm" />,
            innerOverlay: 'https://upload-file-droplinked.s3.amazonaws.com/35f4d210524301dcc5bafc1eb2f98a274553f3f765b10473b199496245816f93.png'
        }
    ]

    return (
        <SectionContainer
            icon='story'
            sectionTitle={t('productOfferings.sectionTitle')}
            headingTitle={t('productOfferings.headingTitle')}
            headingSubtitle={t('productOfferings.headingSubtitle')}
            typographySvg={<Products />}
        >
            <Cards
                hasGradiantOverlay={true}
                cardsData={cardsData}
            />
        </SectionContainer>
    )
}
