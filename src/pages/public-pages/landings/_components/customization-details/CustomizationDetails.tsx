import { Flex, Grid, Image } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'
import Details from '../details/Details'
import Container from '../container/Container'
import CustomHeading from '../heading/Heading'

export default function CustomizationDetails() {
    const detailItems = [
        {
            imageSrc: 'assets/images/physicalProduct/design-nib.png',
            title: 'Template engine tools',
            description: 'Utilize our template engine tools for easy customization',
        },
        {
            imageSrc: 'assets/images/physicalProduct/code.png',
            title: 'Customization with CSS & HTML',
            description: 'Ready to go further? Dive into customization with implementing CSS and HTML coding',
        },
        {
            imageSrc: 'assets/images/physicalProduct/template.png',
            title: 'Create custom templates',
            description: 'Seeking a unique template? Our designers are here to turn your vision into reality',
        },
    ]

    return (
        <Details
            title="Front-End Modularity"
            description="Empower your brand with our fully customizable storefront tools"
        >
            <Grid
                width="100%"
                templateColumns={{ base: "repeat(1, 1fr)", xl: "repeat(3, 1fr)" }}
                templateRows="repeat(1, 1fr)"
                gap={{ base: 6, xl: 9 }}
            >
                {detailItems.map(({ imageSrc, title, description }, index) => (
                    <DetailItem
                        key={index}
                        imageSrc={imageSrc}
                        title={title}
                        description={description}
                    />
                ))}
            </Grid>
        </Details>
    )
}

const DetailItem = ({ imageSrc, title, description }) => (
    <Container gap={6}>
        <Image width={12} height={12} src={imageSrc} />
        <Flex direction="column" gap={4}>
            <CustomHeading title={title} fontSize={20} />
            <AppTypography fontSize={16} color="#fff">
                {description}
            </AppTypography>
        </Flex>
    </Container>
)