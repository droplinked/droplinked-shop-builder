import { GridLg } from 'assets/icons/Navigation/Grid/GridLg'
import { GlobeLg } from 'assets/icons/Sign/Globe/GlobeLg'
import { Layout2Lg } from 'assets/icons/StyleDesigner/Layout2/Layout2Lg'
import { ConfigureLg } from 'assets/icons/System/Configure/ConfigureLg'
import { Layer1Lg } from 'assets/icons/System/Layer1/Layer1Lg'
import { SettinggearLg } from 'assets/icons/System/SettingGear/SettinggearLg'
import React from 'react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import SectionContainer from '../_shared/components/SectionContainer/SectionContainer'
import { CardImage, Cards } from '../_shared/components/card'
import { CardData } from '../_shared/components/card/Cards'
import ModularStackTypography from '../_shared/svgs/ModularStackTypography'
import localEn from 'locales/public-pages/landings/product-tiles/en.json'
import localAr from 'locales/public-pages/landings/product-tiles/ar.json'

function ProductTilesModularStack() {
    const { t } = useLocaleResources('public-pages/landings/product-tiles', {
        en: localEn,
        ar: localAr
    })
    const cardsData: CardData[] = [
        {
            icon: <GlobeLg color="#fff" />,
            title: t('modularStack.cards.instantlySellEverywhere.title'),
            description: t('modularStack.cards.instantlySellEverywhere.description'),
            gridColumn: { base: '1', md: '1', lg: '1 / 3' },
            children: <CardImage alt={t('modularStack.cards.instantlySellEverywhere.title')} src='https://upload-file-droplinked.s3.amazonaws.com/e426e336161401a8125fe9939a9b6454d0adfebf37ece0221ccedfd3468353a4.png' />
        },
        {
            icon: <Layer1Lg color="#fff" />,
            title: t('modularStack.cards.flexibleFunctionality.title'),
            description: t('modularStack.cards.flexibleFunctionality.description'),
            gridColumn: { base: '1', md: '2', lg: '3' },
            children: <CardImage alt={t('modularStack.cards.flexibleFunctionality.title')} src='https://upload-file-droplinked.s3.amazonaws.com/3fad467997c33fd3d8aeb24da13e74ab172556bc87374dba9ed292eeb511326d.png' />
        },
        {
            icon: <ConfigureLg color="#fff" />,
            title: t('modularStack.cards.smoothIntegration.title'),
            description: t('modularStack.cards.smoothIntegration.description'),
            gridColumn: { base: '1', md: '1', lg: '1' },
            children: <CardImage alt={t('modularStack.cards.smoothIntegration.title')} src='https://upload-file-droplinked.s3.amazonaws.com/48e8cd7986c782c2319b56f8deab19cae2bd7581342f3a67461bdaa88fbd1129.png' />
        },
        {
            icon: <GridLg color="#fff" />,
            title: t('modularStack.cards.componentCreation.title'),
            description: t('modularStack.cards.componentCreation.description'),
            gridColumn: { base: '1', md: '2', lg: '2 / 4' },
            children: <CardImage alt={t('modularStack.cards.componentCreation.title')} src='https://upload-file-droplinked.s3.amazonaws.com/0c64efdf6ee730643dc82f4b8d80f15393ced1bee22688b49ce2488480bfb3de.png' />
        },
        {
            icon: <Layout2Lg color="#fff" />,
            title: t('modularStack.cards.seamlessPurchaseFlows.title'),
            description: t('modularStack.cards.seamlessPurchaseFlows.description'),
            gridColumn: { base: '1', md: '1', lg: '1 / 3' },
            children: <CardImage alt={t('modularStack.cards.seamlessPurchaseFlows.title')} src='https://upload-file-droplinked.s3.amazonaws.com/4bac5ff94f69a810635efba919063aa85e2f68b5bf95074aa44c5b25c3ce3403.png' />
        },
        {
            icon: <SettinggearLg color="#fff" />,
            title: t('modularStack.cards.customizableFlexibleComponents.title'),
            description: t('modularStack.cards.customizableFlexibleComponents.description'),
            gridColumn: { base: '1', md: '2', lg: '3' },
            children: <CardImage alt={t('modularStack.cards.customizableFlexibleComponents.title')} src='https://upload-file-droplinked.s3.amazonaws.com/c0d8bae6b8fb2fc1e00b903d7da3cfff42cb02870fa51388f5fbb2028b6b747e.png' />
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

export default ProductTilesModularStack