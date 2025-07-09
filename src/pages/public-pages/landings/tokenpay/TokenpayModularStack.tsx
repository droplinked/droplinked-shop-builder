import { BoxLg } from 'assets/icons/Finance/Box/BoxLg'
import React from 'react'
import SectionContainer from '../_shared/components/SectionContainer/SectionContainer'
import { CardImage, Cards } from '../_shared/components/card'
import { CardData } from '../_shared/components/card/Cards'
import ModularStackTypography from '../_shared/svgs/ModularStackTypography'
import GetStartedCard from './GetStartedCard'

function TokenpayModularStack() {   
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
            title: "Ready to Get Started?",
            description: "Now’s the chance to join the next wave of commerce and make an impact",
            gridColumn: { base: '1', md: '1', lg: '1 / 3' },
            hasBackgroundOverlay: true,
            children: <GetStartedCard />
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