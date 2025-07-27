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
            children: <CardImage alt={t('MetaverseShowroomModularStack.cards.virtualShowrooms.title')} src='https://upload-file-droplinked.s3.amazonaws.com/7958245098e615c7d8aeb71f574f067c79a41f52a691759b45d17e4d6e09b34d.png' />
        },
        {
            icon: <RocketLg color="#fff" />,
            title: t('MetaverseShowroomModularStack.cards.boostEngagement.title'),
            description: t('MetaverseShowroomModularStack.cards.boostEngagement.description'),
            gridColumn: { base: 'span 1', md: 'span 2' },
            children: <CardImage alt={t('MetaverseShowroomModularStack.cards.boostEngagement.title')} src='https://upload-file-droplinked.s3.amazonaws.com/8002c81eb8d954dd875208070db832f191a0fa65b989f09952b0761d19fb5eb8.png' />
        },
        {
            icon: <Star2Lg color="#fff" />,
            title: t('MetaverseShowroomModularStack.cards.nextGenRetail.title'),
            description: t('MetaverseShowroomModularStack.cards.nextGenRetail.description'),
            gridColumn: { base: 'span 1', md: 'span 2' },
            children: <CardImage alt={t('MetaverseShowroomModularStack.cards.nextGenRetail.title')} src='https://upload-file-droplinked.s3.amazonaws.com/c0fa01678b71e84a4e1826dee02957d928922d8c6dd847fba8ddb99b9bb911cc.png' />
        },
        {
            icon: <DesignLg color="#fff" />,
            title: t('MetaverseShowroomModularStack.cards.virtualShowroomCreation.title'),
            description: t('MetaverseShowroomModularStack.cards.virtualShowroomCreation.description'),
            gridColumn: { base: 'span 1', md: 'span 2', lg: 'span 3' },
            children: <CardImage alt={t('MetaverseShowroomModularStack.cards.virtualShowroomCreation.title')} src='https://upload-file-droplinked.s3.amazonaws.com/e7791b150d9fc84fc3dcab8945c419017a62aa3b0bc84b5c217c5845e4293043.png' />
        },
        {
            icon: <MetaverseLg color="#fff" />,
            title: t('MetaverseShowroomModularStack.cards.immersiveExperiences.title'),
            description: t('MetaverseShowroomModularStack.cards.immersiveExperiences.description'),
            gridColumn: { base: 'span 1', md: 'span 2', lg: 'span 3' },
            children: <CardImage alt={t('MetaverseShowroomModularStack.cards.immersiveExperiences.title')} src='https://upload-file-droplinked.s3.amazonaws.com/bc2ac9a76c7c50e34feff959b73eaa1882184c45b0a3c57fa21c421186363865.png' />
        },
        {
            icon: <BrushLg color="#fff" />,
            title: t('MetaverseShowroomModularStack.cards.brandPersonalization.title'),
            description: t('MetaverseShowroomModularStack.cards.brandPersonalization.description'),
            gridColumn: { base: 'span 1', md: 'span 2' },
            children: <CardImage alt={t('MetaverseShowroomModularStack.cards.brandPersonalization.title')} src='https://upload-file-droplinked.s3.amazonaws.com/bcba31cb358e07703fde4aecce07c621962c30d464988915ba2af7e2779bca70.png' />
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