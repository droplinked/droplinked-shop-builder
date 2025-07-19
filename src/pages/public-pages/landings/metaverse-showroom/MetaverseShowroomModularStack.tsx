import { RocketLg } from 'assets/icons/Action/Rocket/RocketLg'
import { BrushLg } from 'assets/icons/StyleDesigner/Brush/BrushLg'
import { DesignLg } from 'assets/icons/StyleDesigner/Design/DesignLg'
import { MetaverseLg } from 'assets/icons/System/Metaverse/MetaverseLg'
import { ShopLg } from 'assets/icons/System/Shop/ShopLg'
import { Star2Lg } from 'assets/icons/System/Star2/Star2Lg'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import PlatformFunctionalities from '../_shared/components/PlatformFunctionalities'
import { CardImage } from '../_shared/components/card'
import { CardData } from '../_shared/components/card/Cards'

function MetaverseShowroomModularStack() {
    const { t } = useLocaleResources('public-pages/landings/metaverse-showroom')

    const cardsData: CardData[] = [
        {
            icon: <ShopLg color="#fff" />,
            title: t('MetaverseShowroomModularStack.cards.virtualShowrooms.title'),
            description: t('MetaverseShowroomModularStack.cards.virtualShowrooms.description'),
            gridColumn: { base: 'span 1', md: 'span 2', lg: 'span 3' },
            children: <CardImage alt={t('MetaverseShowroomModularStack.cards.virtualShowrooms.title')} src='https://upload-file-droplinked.s3.amazonaws.com/c49374c13e78aa989cc54ff200a80b1daf36c9cf020b20b112a5e3050c378785.png' />
        },
        {
            icon: <RocketLg color="#fff" />,
            title: t('MetaverseShowroomModularStack.cards.boostEngagement.title'),
            description: t('MetaverseShowroomModularStack.cards.boostEngagement.description'),
            gridColumn: { base: 'span 1', md: 'span 2' },
            children: <CardImage alt={t('MetaverseShowroomModularStack.cards.boostEngagement.title')} src='https://upload-file-droplinked.s3.amazonaws.com/a9c270953cbc427ebedee57b7cfc9675defea332f8d8e0e33a69168444647e8c.png' />
        },
        {
            icon: <Star2Lg color="#fff" />,
            title: t('MetaverseShowroomModularStack.cards.nextGenRetail.title'),
            description: t('MetaverseShowroomModularStack.cards.nextGenRetail.description'),
            gridColumn: { base: 'span 1', md: 'span 2' },
            children: <CardImage alt={t('MetaverseShowroomModularStack.cards.nextGenRetail.title')} src='https://upload-file-droplinked.s3.amazonaws.com/b4159100a4fcaf8718eecf33ebcb829d6159a12b7ef81b3101aec00d442c2545.png' />
        },
        {
            icon: <DesignLg color="#fff" />,
            title: t('MetaverseShowroomModularStack.cards.virtualShowroomCreation.title'),
            description: t('MetaverseShowroomModularStack.cards.virtualShowroomCreation.description'),
            gridColumn: { base: 'span 1', md: 'span 2', lg: 'span 3' },
            children: <CardImage alt={t('MetaverseShowroomModularStack.cards.virtualShowroomCreation.title')} src='https://upload-file-droplinked.s3.amazonaws.com/1f25b79d3eaa42dd7dd6f4c97b6f0765443058cdedda7dbfecf3c0c6b3034146.png' />
        },
        {
            icon: <MetaverseLg color="#fff" />,
            title: t('MetaverseShowroomModularStack.cards.immersiveExperiences.title'),
            description: t('MetaverseShowroomModularStack.cards.immersiveExperiences.description'),
            gridColumn: { base: 'span 1', md: 'span 2', lg: 'span 3' },
            children: <CardImage alt={t('MetaverseShowroomModularStack.cards.immersiveExperiences.title')} src='https://upload-file-droplinked.s3.amazonaws.com/4d65e70075ed8204c6536c26e4fd58266cb7c9ccb0950ead7ffceec7312fcc42.png' />
        },
        {
            icon: <BrushLg color="#fff" />,
            title: t('MetaverseShowroomModularStack.cards.brandPersonalization.title'),
            description: t('MetaverseShowroomModularStack.cards.brandPersonalization.description'),
            gridColumn: { base: 'span 1', md: 'span 2' },
            children: <CardImage alt={t('MetaverseShowroomModularStack.cards.brandPersonalization.title')} src='https://upload-file-droplinked.s3.amazonaws.com/517709352c2dfca3a4bb1715b75efd7cdbe02a966fb88272b5081931c42cbfa9.png' />
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

export default MetaverseShowroomModularStack