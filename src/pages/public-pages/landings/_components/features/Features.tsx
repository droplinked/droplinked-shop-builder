import { Box, Flex } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import { IFeatureGroup } from '../../types/interfaces'
import SpectrumHeader from '../spectrum-header/SpectrumHeader'
import enLocale from 'locales/public-pages/landings/_components/en.json'
import arLocale from 'locales/public-pages/landings/_components/ar.json'

export default function Features({ features }: { features?: IFeatureGroup[] }) {
    const { t } = useLocaleResources('public-pages/landings/_components', { en: enLocale, ar: arLocale })
    
    const defaultFeatureGroups: IFeatureGroup[] = [
        {
            features: [
                {
                    title: t('features.defaultFeatures.offerPerks.title'),
                    description: t('features.defaultFeatures.offerPerks.description'),
                },
                {
                    title: t('features.defaultFeatures.embeddableTiles.title'),
                    description: t('features.defaultFeatures.embeddableTiles.description'),
                },
                {
                    title: t('features.defaultFeatures.decentralizedNetwork.title'),
                    description: t('features.defaultFeatures.decentralizedNetwork.description'),
                }
            ]
        }
    ]
    const featureGroups = features ?? defaultFeatureGroups

    return (
        <>
            {featureGroups.map(({ title, features }, index) => (
                <Flex
                    key={index}
                    width="100%"
                    direction={{ base: 'column', lg: 'row' }}
                    gap={{ base: 6, lg: 4, xl: 6 }}
                >
                    <Box width={{ base: "100%", lg: "400px" }} flexShrink={0}>
                        <SpectrumHeader fontSize={{ base: 20, lg: 28 }}>{title || t('features.defaultTitle')}</SpectrumHeader>
                    </Box>
                    <Flex direction="column" gap={{ base: 6, lg: 9, xl: 14 }}>
                        {features.map((feature, index) => <FeatureItem key={index} {...feature} />)}
                    </Flex>
                </Flex>
            ))}
        </>
    )
}

const FeatureItem = ({ title, description }) => (
    <Flex direction="column" gap={2} sx={{ color: '#fff' }}>
        <AppTypography fontSize={{ base: 18, md: 20 }} fontWeight={700}>{title}</AppTypography>
        <AppTypography fontSize={{ base: 16, xl: 18 }}>{description}</AppTypography>
    </Flex>
)