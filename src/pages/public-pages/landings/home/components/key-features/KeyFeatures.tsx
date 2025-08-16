import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import InlineVideoPlayer from '../../../_shared/components/InlineVideoPlayer'
import SectionContainer from '../../../_shared/components/SectionContainer/SectionContainer'
import { Cards } from '../../../_shared/components/card'
import { CardData } from '../../../_shared/components/card/Cards'
import KeyFeaturesTypography from '../../svgs/KeyFeaturesTypography'
import Charts from './Charts'

export default function KeyFeatures() {
    const { t } = useLocaleResources('homePage')

    const cards: CardData[] = [
        {
            title: t("keyFeatures.cards.onchainRegistration.title"),
            description: t("keyFeatures.cards.onchainRegistration.description"),
            gridColumn: { base: '1', md: '1 / -1', lg: '1 / 4' },
            children: <InlineVideoPlayer src='https://upload-file-droplinked.s3.amazonaws.com/b4fcbbd7fb90acab66e3135f5a72c722515506b25676e2b48336ba31881f5a51_or.webm' style={{ width: "max-content" }} />,
            innerOverlay: 'https://upload-file-droplinked.s3.amazonaws.com/1c39b8bd7265e87eba2cb949d3096ef0cdc986ab1741d35c297c19ee78c96b5b.png'
        },
        {
            title: t("keyFeatures.cards.instantPayments.title"),
            description: t("keyFeatures.cards.instantPayments.description"),
            gridColumn: { base: '1', md: '1', lg: '4 / 7' },
            children: <InlineVideoPlayer src="https://upload-file-droplinked.s3.amazonaws.com/c6a1059dce8e176e2fad0cf8d29973b157a06c44a538c91db29d15cce0b10921_or.webm" style={{ width: "max-content" }} />,
            innerOverlay: 'https://upload-file-droplinked.s3.amazonaws.com/e2d31950aeb6449a86e57496be339d04fcd551f6605346e5dc58d7ed583f1b05.png'
        },
        {
            title: t("keyFeatures.cards.transparentFees.title"),
            description: t("keyFeatures.cards.transparentFees.description"),
            gridColumn: { base: '1', md: '2', lg: '1 / 3' },
            children: <Charts />,
            innerOverlay: 'https://upload-file-droplinked.s3.amazonaws.com/c4ef534dd1063d4dbfb3ed39e6b333cdaef84b00fc1160f799ff6ae7c78f435d.png'
        },
        {
            title: t("keyFeatures.cards.communityDriven.title"),
            description: t("keyFeatures.cards.communityDriven.description"),
            gridColumn: { base: '1', md: '1', lg: '3 / 5' },
            children: <InlineVideoPlayer src="https://upload-file-droplinked.s3.amazonaws.com/285dad10926d39d55d14eadcf93688656e78b080c5ce0976ffbf79e4acff0acd_or.webm" />
        },
        {
            title: t("keyFeatures.cards.numbersThatMatter.title"),
            description: t("keyFeatures.cards.numbersThatMatter.description"),
            gridColumn: { base: '1', md: '2', lg: '5 / 7' },
            children: <InlineVideoPlayer src='https://upload-file-droplinked.s3.amazonaws.com/4c1bfad8f486e790e6e52e56cf783a80e753a2373d915eacbc86530f4692e599_or.webm' />,
            innerOverlay: 'https://upload-file-droplinked.s3.amazonaws.com/4b492fc0d1c7d1d76cb5b93749485d7e4e99ff32663a60a093e3904822fac555.png'
        }
    ]

    return (
        <SectionContainer
            icon='layer'
            sectionTitle={t('keyFeatures.sectionTitle')}
            headingTitle={t('keyFeatures.headingTitle')}
            headingSubtitle={t('keyFeatures.headingSubtitle')}
            typographySvg={<KeyFeaturesTypography />}
        >
            <Cards
                cardsData={cards}
                flexDirection='column-reverse'
                hasGradiantOverlay={true}
                templateColumns={{
                    base: '1fr',
                    md: 'repeat(2, 1fr)',
                    lg: 'repeat(6, 1fr)'
                }}
            />
        </SectionContainer>
    )
}
