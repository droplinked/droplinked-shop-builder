import { Refresh1Lg } from 'assets/icons/Action/Refresh1/Refresh1Lg'
import { BarchartLg } from 'assets/icons/Finance/BarChart/BarchartLg'
import { ChartLg } from 'assets/icons/Finance/Chart/ChartLg'
import { DesignLg } from 'assets/icons/StyleDesigner/Design/DesignLg'
import { ConfigureLg } from 'assets/icons/System/Configure/ConfigureLg'
import { TechnologyLg } from 'assets/icons/System/Technology/TechnologyLg'
import React from 'react'
import { CardData } from '../_shared/components/card/Cards'
import PlatformFunctionalities from '../_shared/components/PlatformFunctionalities'
import CardImage from '../_shared/components/card/CardImage'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import localEn from 'locales/public-pages/landings/dpp-landing/en.json'
import localAr from 'locales/public-pages/landings/dpp-landing/ar.json'

export default function DPPModularStack() {
    const { t } = useLocaleResources('public-pages/landings/dpp-landing', { en: localEn, ar: localAr })

    const cardsData: CardData[] = [
        {
            icon: <Refresh1Lg color='#fff' />,
            title: t('modularStack.cards.comprehensiveLifecycleData.title'),
            description: t('modularStack.cards.comprehensiveLifecycleData.description'),
            children: (
                <CardImage
                    src='https://upload-file-droplinked.s3.amazonaws.com/d1be62b07688b9b8fb13aa60c4d2e941a890aca21958da54612d9e21b774b76b.png'
                    alt={t('modularStack.cards.comprehensiveLifecycleData.title')}
                />
            ),
            gridColumn: { base: 'span 1', md: 'span 2', lg: 'span 3' }
        },
        {
            icon: <TechnologyLg color='#fff' />,
            title: t('modularStack.cards.advancedTechnologyIntegration.title'),
            description: t('modularStack.cards.advancedTechnologyIntegration.description'),
            children: (
                <CardImage
                    src='https://upload-file-droplinked.s3.amazonaws.com/8ac929a1d81c887f42beedb3b7fa718e3043e38554b0d601c4099a118a0290d6.png'
                    alt={t('modularStack.cards.advancedTechnologyIntegration.title')}
                />
            ),
            gridColumn: { base: 'span 1', md: 'span 2' }
        },
        {
            icon: <ChartLg color='#fff' />,
            title: t('modularStack.cards.enhancedSustainability.title'),
            description: t('modularStack.cards.enhancedSustainability.description'),
            children: (
                <CardImage
                    src='https://upload-file-droplinked.s3.amazonaws.com/c94156f4d36a429d1f957a6245cbc09c12bf8a2108c1945069482cedf4528068.png'
                    alt={t('modularStack.cards.enhancedSustainability.title')}
                />
            ),
            gridColumn: { base: 'span 1', md: 'span 2' }
        },
        {
            icon: <ConfigureLg color='#fff' />,
            title: t('modularStack.cards.regulatoryComplianceMadeEasy.title'),
            description: t('modularStack.cards.regulatoryComplianceMadeEasy.description'),
            children: (
                <CardImage
                    src='https://upload-file-droplinked.s3.amazonaws.com/97d9bfcb7fdee0256ce22807b339fd0604613ddf8deba9cc6eea56e1a62dba03.png'
                    alt={t('modularStack.cards.regulatoryComplianceMadeEasy.title')}
                />
            ),
            gridColumn: { base: 'span 1', md: 'span 2', lg: 'span 3' }
        },
        {
            icon: <DesignLg color='#fff' />,
            title: t('modularStack.cards.userFriendlyInterface.title'),
            description: t('modularStack.cards.userFriendlyInterface.description'),
            children: (
                <CardImage
                    src='https://upload-file-droplinked.s3.amazonaws.com/b36620b05d473d1dbb348d6aee59a634f4121823692142fb9d91744402754932.png'
                    alt={t('modularStack.cards.userFriendlyInterface.title')}
                />
            ),
            gridColumn: { base: 'span 1', md: 'span 2', lg: 'span 3' }
        },
        {
            icon: <BarchartLg color='#fff' />,
            title: t('modularStack.cards.dataDrivenDecisionMaking.title'),
            description: t('modularStack.cards.dataDrivenDecisionMaking.description'),
            children: (
                <CardImage
                    src='https://upload-file-droplinked.s3.amazonaws.com/837b856f991bc7510b970089c2beb4782b318d8301670a676505ff746da890a7.png'
                    alt={t('modularStack.cards.dataDrivenDecisionMaking.title')}
                />
            ),
            gridColumn: { base: 'span 1', md: 'span 2' }
        }
    ]

    const templateColumns = {
        base: '1fr',
        md: 'repeat(4, 1fr)',
        lg: 'repeat(5, 1fr)'
    }

    return (
        <PlatformFunctionalities
            cardsData={cardsData}
            templateColumns={templateColumns}
            hasGradiantOverlay={true}
        />
    )
}
