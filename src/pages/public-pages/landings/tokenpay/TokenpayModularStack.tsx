import { BoxLg } from 'assets/icons/Finance/Box/BoxLg'
import React from 'react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import SectionContainer from '../_shared/components/SectionContainer/SectionContainer'
import { CardImage, Cards } from '../_shared/components/card'
import { CardData } from '../_shared/components/card/Cards'
import ModularStackTypography from '../_shared/svgs/ModularStackTypography'
import GetStartedCard from './GetStartedCard'
import localEn from 'locales/public-pages/landings/tokenpay/en.json'
import localAr from 'locales/public-pages/landings/tokenpay/ar.json'

function TokenpayModularStack() {
    const { t } = useLocaleResources('public-pages/landings/tokenpay', {
        en: localEn,
        ar: localAr
    })
    const cardsData: CardData[] = [
        {
            gridColumn: { base: '1', md: '1', lg: '1 / 2' },
            children: <CardImage alt='Token integration' src='https://upload-file-droplinked.s3.amazonaws.com/3ca03f8ef73472a9e40852cedf67a37fdcf4e6e1b7099f234836bbc2db3711bb.png' />
        },
        {
        
            gridColumn: { base: '1', md: '1', lg: '2 / 2' },
            children: <CardImage alt='Token Expansion' src='https://upload-file-droplinked.s3.amazonaws.com/a060ef3c8a26a02419c861bb53de71767fc26dcdca462831fbbea5782be048f6.png' />
        },
        {
            icon: <BoxLg color="#fff" />,
            title: t('modularStack.cards.readyToGetStarted.title'),
            description: t('modularStack.cards.readyToGetStarted.description'),
            gridColumn: { base: '1', md: '1', lg: '1 / 3' },
            hasBackgroundOverlay: true,
            children: <GetStartedCard />
        }
    ]

    return (
        <SectionContainer
            icon='layer-web'
            sectionTitle={t('modularStack.sectionTitle')}
            headingTitle={t('modularStack.headingTitle')}
            headingSubtitle={t('modularStack.headingSubtitle')}
            typographySvg={<ModularStackTypography />}
        >
            <Cards
                cardsData={cardsData}
                templateColumns={{
                    base: '1fr',
                    md: '1fr',
                    lg: 'repeat(2, 1fr)'
                }}
            />
        </SectionContainer>
    )
}

export default TokenpayModularStack