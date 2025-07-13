import React from 'react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import { CardData } from '../_shared/components/card/Cards'
import PlatformFunctionalities from '../_shared/components/PlatformFunctionalities'
import CardImage from '../_shared/components/card/CardImage'
import { ShieldLg } from 'assets/icons/System/Shield/ShieldLg'
import { LockLg } from 'assets/icons/System/Lock/LockLg'
import { TransferLg } from 'assets/icons/Navigation/Transfer/TransferLg'
import { BoxLg } from 'assets/icons/Finance/Box/BoxLg'
import { ShowLg } from 'assets/icons/Action/Show/ShowLg'
import { GlobeLg } from 'assets/icons/Sign/Globe/GlobeLg'
import localEn from 'locales/public-pages/landings/tokenizing-products/en.json'
import localAr from 'locales/public-pages/landings/tokenizing-products/ar.json'

export default function TokenizingModularStack() {
    const { t } = useLocaleResources('public-pages/landings/tokenizing-products', {
        en: localEn,
        ar: localAr
    })
    const cardsData: CardData[] = [
        {
            icon: <ShieldLg color='#fff' />,
            title: t('modularStack.cards.secureCustodyOwnership.title'),
            description: t('modularStack.cards.secureCustodyOwnership.description'),
            children: (
                <CardImage
                    src='https://upload-file-droplinked.s3.amazonaws.com/e246ff24934ed9c1e40b05ef2c66f5bae5630c53b98c1829c5a5b89db859c119.png'
                    alt={t('modularStack.cards.secureCustodyOwnership.title')}
                    objectFit="cover"
                />
            ),
            gridColumn: { base: 'span 1', md: 'span 2', lg: 'span 3' }
        },
        {
            icon: <LockLg color='#fff' />,
            title: t('modularStack.cards.transparentImmutableRecords.title'),
            description: t('modularStack.cards.transparentImmutableRecords.description'),
            children: (
                <CardImage
                    src='https://upload-file-droplinked.s3.amazonaws.com/a6ec3a9fc8c59a04f004de48b1955c97998ae8ebd27ee1e9a5af1a4427493b1a.png'
                    alt={t('modularStack.cards.transparentImmutableRecords.title')}
                />
            ),
            gridColumn: { base: 'span 1', md: 'span 2' }
        },
        {
            icon: <TransferLg color='#fff' />,
            title: t('modularStack.cards.simpleSecureTransfers.title'),
            description: t('modularStack.cards.simpleSecureTransfers.description'),
            children: (
                <CardImage
                    src='https://upload-file-droplinked.s3.amazonaws.com/4dfae6d86f5ebcca2d1ab8e8ff4e69fd4f6d7d0d7fe2b16f9c753896ac6f32f1.png'
                    alt={t('modularStack.cards.simpleSecureTransfers.title')}
                />
            ),
            gridColumn: { base: 'span 1', md: 'span 2' }
        },
        {
            icon: <BoxLg color='#fff' />,
            title: t('modularStack.cards.digitalRepresentationInventory.title'),
            description: t('modularStack.cards.digitalRepresentationInventory.description'),
            children: (
                <CardImage
                    src='https://upload-file-droplinked.s3.amazonaws.com/11251346ad2d449166b7772438b17414218a5568d307cd2cf5e671b7ad14c20b.png'
                    alt={t('modularStack.cards.digitalRepresentationInventory.title')}
                />
            ),
            gridColumn: { base: 'span 1', md: 'span 2', lg: 'span 3' }
        },
        {
            icon: <ShowLg color='#fff' />,
            title: t('modularStack.cards.enhancedTransparency.title'),
            description: t('modularStack.cards.enhancedTransparency.description'),
            children: (
                <CardImage
                    src='https://upload-file-droplinked.s3.amazonaws.com/2358fd1bc8db360c120af5666539466c9f195a1e5a7ffced3b11443b2cd5111c.png'
                    alt={t('modularStack.cards.enhancedTransparency.title')}
                />
            ),
            gridColumn: { base: 'span 1', md: 'span 2', lg: 'span 3' }
        },
        {
            icon: <GlobeLg color='#fff' />,
            title: t('modularStack.cards.globalMarketAccess.title'),
            description: t('modularStack.cards.globalMarketAccess.description'),
            children: (
                <CardImage
                    src='https://upload-file-droplinked.s3.amazonaws.com/275fd9230f7ac41b7c7ff0ca170018a9c7a5582e47d9d32dcc3a7be95fef9b44.png'
                    alt={t('modularStack.cards.globalMarketAccess.title')}
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
