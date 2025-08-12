import { BoxLg } from 'assets/icons/Finance/Box/BoxLg'
import { PositionLg } from 'assets/icons/Sign/Position/PositionLg'
import { ImageLg } from 'assets/icons/System/Image/ImageLg'
import { MinttomerchLg } from 'assets/icons/System/MintToMerch/MinttomerchLg'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import InlineVideoPlayer from '../../_shared/components/InlineVideoPlayer'
import SectionContainer from '../../_shared/components/SectionContainer/SectionContainer'
import { Cards } from '../../_shared/components/card'
import { CardData } from '../../_shared/components/card/Cards'
import Products from '../svgs/Products'

export default function ProductOfferingSection() {
    const { t } = useLocaleResources('homePage')

    const cardsData: CardData[] = [
        {
            icon: <PositionLg color='#fff' />,
            title: t("productOfferings.cards.services.title"),
            description: t("productOfferings.cards.services.description"),
            gridColumn: { base: 'span 1', md: 'span 4', lg: 'span 3' },
            children: <InlineVideoPlayer src="https://upload-file-droplinked.s3.amazonaws.com/6a73c2702a701de1a1d0f575a30514c0a801b6964c819ad5f652f108cbbc4926_or.webm" />,
            innerOverlay: "https://upload-file-droplinked.s3.amazonaws.com/7b228ed2a617cefa1a86123a032c7955b548d2b64d858532a2f7245d4f3c9ff2.png"
        },
        {
            icon: <ImageLg color='#fff' />,
            title: t("productOfferings.cards.digitalProducts.title"),
            description: t("productOfferings.cards.digitalProducts.description"),
            gridColumn: { base: 'span 1', md: 'span 2', lg: 'span 2' },
            children: <InlineVideoPlayer src="https://upload-file-droplinked.s3.amazonaws.com/d1308b65f100a22d6d66952df10ad3d3a1ce13530e8cb2594e7fed0dd3ecfc6b_or.webm" />,
            innerOverlay: 'https://upload-file-droplinked.s3.amazonaws.com/0adc77b2411ddedae289d4a13d1c264c2670995eb95e5bdf15c115ba77b077b7.png'
        },
        {
            icon: <BoxLg color='#fff' />,
            title: t("productOfferings.cards.physicalProducts.title"),
            description: t("productOfferings.cards.physicalProducts.description"),
            gridColumn: { base: 'span 1', md: 'span 2', lg: 'span 2' },
            children: <InlineVideoPlayer src="https://upload-file-droplinked.s3.amazonaws.com/d323ff455d81c282830be5c31f3cccd0eac3f1cf3fd2ab058dc5c90324d82962_or.webm" />,
            innerOverlay: 'https://upload-file-droplinked.s3.amazonaws.com/05c6d5f6d6f830993e96d7eb47f3f930d2aeec67a6c81fa2ba18fd255e9c64b6.png'
        },
        {
            icon: <MinttomerchLg color='#fff' />,
            title: t("productOfferings.cards.podAndNfts.title"),
            description: t("productOfferings.cards.podAndNfts.description"),
            gridColumn: { base: 'span 1', md: 'span 4', lg: 'span 3' },
            children: <InlineVideoPlayer src="https://upload-file-droplinked.s3.amazonaws.com/0037d35ed3249e0dc754d90c3f07338558b11a57c5f4520ce7f9cb8f2af5594e_or.webm" />,
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
                isGridCards
                templateColumns={{
                    base: '1fr',
                    md: 'repeat(4, 1fr)',
                    lg: 'repeat(5, 1fr)'
                }}
            />
        </SectionContainer>
    )
}
