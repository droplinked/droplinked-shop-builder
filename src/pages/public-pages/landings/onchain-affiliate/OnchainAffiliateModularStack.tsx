import { ChartLg } from 'assets/icons/Finance/Chart/ChartLg'
import { ReceivemoneyLg } from 'assets/icons/Finance/ReceiveMoney/ReceivemoneyLg'
import { DesignLg } from 'assets/icons/StyleDesigner/Design/DesignLg'
import { CartLg } from 'assets/icons/System/Cart/CartLg'
import { ConfigureLg } from 'assets/icons/System/Configure/ConfigureLg'
import { SoonLg } from 'assets/icons/System/Soon/SoonLg'
import React from 'react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import SectionContainer from '../_shared/components/SectionContainer/SectionContainer'
import { CardImage, Cards } from '../_shared/components/card'
import { CardData } from '../_shared/components/card/Cards'
import ModularStackTypography from '../_shared/svgs/ModularStackTypography'
import localEn from 'locales/public-pages/landings/onchain-affiliate/en.json'
import localAr from 'locales/public-pages/landings/onchain-affiliate/ar.json'

function OnchainAffiliateModularStack() {
    const { t } = useLocaleResources('public-pages/landings/onchain-affiliate', {
        en: localEn,
        ar: localAr
    })

    const cardsData: CardData[] = [
        {
            icon: <ChartLg color="#fff" />,
            title: t('modularStack.cards.collaborateGrow.title'),
            description: t('modularStack.cards.collaborateGrow.description'),
            gridColumn: { base: '1', md: '1', lg: '1 / 3' },
            children: <CardImage alt={t('modularStack.cards.collaborateGrow.title')} src='https://upload-file-droplinked.s3.amazonaws.com/8b578704d2f9a317f0a0068cc5e96d74adad4272cd396fdceaaa52b3cb3c9e81.png' />
        },
        {
            icon: <ReceivemoneyLg color="#fff" />,
            title: t('modularStack.cards.promoteEarn.title'),
            description: t('modularStack.cards.promoteEarn.description'),
            gridColumn: { base: '1', md: '2', lg: '3' },
            children: <CardImage alt={t('modularStack.cards.promoteEarn.title')} src='https://upload-file-droplinked.s3.amazonaws.com/3940656e3e595c6d59e4b11fbac744a36060ea16ae6f05201ee6c221594c53a7.png' />
        },
        {
            icon: <CartLg color="#fff" />,
            title: t('modularStack.cards.collaborateSell.title'),
            description: t('modularStack.cards.collaborateSell.description'),
            gridColumn: { base: '1', md: '1', lg: '1' },
            children: <CardImage alt={t('modularStack.cards.collaborateSell.title')} src='https://upload-file-droplinked.s3.amazonaws.com/6bcb307853e9282ae38a0501eeff45f326e602a6dbd13059d738c3a68c7d1ea5.png' />
        },
        {
            icon: <DesignLg color="#fff" />,
            title: t('modularStack.cards.createStorefronts.title'),
            description: t('modularStack.cards.createStorefronts.description'),
            gridColumn: { base: '1', md: '2', lg: '2 / 4' },
            children: <CardImage alt={t('modularStack.cards.createStorefronts.title')} src='https://upload-file-droplinked.s3.amazonaws.com/c79cb9a3c1472a42a9ea34e4bc3b6b8060455a04106383eedaf9af4cdfbe36dd.png' />
        },
        {
            icon: <ConfigureLg color="#fff" />,
            title: t('modularStack.cards.manageRequests.title'),
            description: t('modularStack.cards.manageRequests.description'),
            gridColumn: { base: '1', md: '1', lg: '1 / 3' },
            children: <CardImage alt={t('modularStack.cards.manageRequests.title')} src='https://upload-file-droplinked.s3.amazonaws.com/d60dbd4e81187a6c534b5b7cc63336e9e57c123688216b64ea6ffb2aa5a6ac0b.png' />
        },
        {
            icon: <SoonLg color="#fff" />,
            title: t('modularStack.cards.gettingStarted.title'),
            description: t('modularStack.cards.gettingStarted.description'),
            gridColumn: { base: '1', md: '2', lg: '3' },
            children: <CardImage alt={t('modularStack.cards.gettingStarted.title')} src='https://upload-file-droplinked.s3.amazonaws.com/4b886aabec7e48e608e3087c07194d4d508f7a24bb12f3909a0d3aa0feee214a.png' />
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
                hasGradiantOverlay={true}
                cardsData={cardsData}
            />
        </SectionContainer>
    )
}

export default OnchainAffiliateModularStack