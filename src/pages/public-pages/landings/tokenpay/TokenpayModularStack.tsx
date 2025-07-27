import { BoxLg } from 'assets/icons/Finance/Box/BoxLg'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import SectionContainer from '../_shared/components/SectionContainer/SectionContainer'
import { CardImage, Cards } from '../_shared/components/card'
import { CardData } from '../_shared/components/card/Cards'
import ModularStackTypography from '../_shared/svgs/ModularStackTypography'
import GetStartedCard from './GetStartedCard'

function TokenpayModularStack() {
    const { t } = useLocaleResources('public-pages/landings/tokenpay')

    const cardsData: CardData[] = [
        {

            gridColumn: { base: '1', md: '1', lg: '1 / 2' },
            children: <CardImage alt='Token Expansion' src='https://upload-file-droplinked.s3.amazonaws.com/739d4df18d8460a773a6f3940ff01b9ba4a1ff188226a1f6308b7c342742f53c.png' />
        },
        {
            gridColumn: { base: '1', md: '1', lg: '2 / 2' },
            children: <CardImage alt='Token integration' src='https://upload-file-droplinked.s3.amazonaws.com/e26817bf87250c1bd947e7137eddf2277edf357201bbd2a44614c3b91d6d94c2.png' />
        },
        {
            icon: <BoxLg color="#fff" />,
            title: t('readyToGetStarted'),
            description: t('TokenpayModularStack.cards.readyToGetStarted.description'),
            gridColumn: { base: '1', md: '1', lg: '1 / 3' },
            hasBackgroundOverlay: true,
            children: <GetStartedCard />
        }
    ]

    return (
        <SectionContainer
            icon='layer-web'
            sectionTitle={t('platformFunctionalities.sectionTitle')}
            headingTitle={t('platformFunctionalities.headingTitle')}
            headingSubtitle={t('platformFunctionalities.headingSubtitle')}
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