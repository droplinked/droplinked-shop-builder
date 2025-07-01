import { Flex, Grid, Image } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'
import Container from '../container/Container'
import Details from '../details/Details'
import SpectrumHeader from '../spectrum-header/SpectrumHeader'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

export default function FrontModularity() {
    const { t } = useLocaleResources('public-pages/landings/_components')
    
    const detailItems = [
        {
            imageSrc: 'assets/images/physicalProduct/design-nib.png',
            title: t('frontModularity.items.templateEngine.title'),
            description: t('frontModularity.items.templateEngine.description'),
        },
        {
            imageSrc: 'assets/images/physicalProduct/code.png',
            title: t('frontModularity.items.customization.title'),
            description: t('frontModularity.items.customization.description'),
        },
        {
            imageSrc: 'assets/images/physicalProduct/template.png',
            title: t('frontModularity.items.customTemplates.title'),
            description: t('frontModularity.items.customTemplates.description'),
        },
    ]

    return (
        <Details
            title={t('frontModularity.title')}
            description={t('frontModularity.description')}
        >
            <Grid
                width="100%"
                templateColumns={{ base: "repeat(1, 1fr)", xl: "repeat(3, 1fr)" }}
                templateRows="repeat(1, 1fr)"
                gap={{ base: 6, xl: 9 }}
            >
                {detailItems.map((item) => <DetailItem key={item.title} {...item} />)}
            </Grid>
        </Details>
    )
}

const DetailItem = ({ imageSrc, title, description }) => (
    <Container gap={6}>
        <Image width={12} height={12} src={imageSrc} />
        <Flex direction="column" gap={4}>
            <SpectrumHeader fontSize={20}>{title}</SpectrumHeader>
            <AppTypography fontSize={16} color="#fff">{description}</AppTypography>
        </Flex>
    </Container>
)