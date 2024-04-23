import { Flex, Grid, Image } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import Container from 'pages/public-pages/landings/parts/container/Container'
import CustomHeading from 'pages/public-pages/landings/parts/heading/Heading'
import React from 'react'
import Details from '../details/Details'

function CustomizationDetails() {
    return (
        <Details
            title='Build Fully Customizable Storefronts'
            description='Empower your brand with our fully customizable storefront tools'
        >
            <Grid
                width={"100%"}
                templateColumns={{ base: "repeat(1, 1fr)", xl: "repeat(3, 1fr)" }}
                templateRows={"repeat(1, 1fr)"}
                gap={{ base: 6, xl: 9 }}
            >
                <Container gap={6}>
                    <Image width={12} height={12} src='assets/images/physicalProduct/design-nib.png' />
                    <Flex direction="column" gap={4}>
                        <CustomHeading title='Template engine tools' fontSize={20} />
                        <AppTypography fontSize={16} color={"#fff"}>Utilize our template engine tools for easy customization</AppTypography>
                    </Flex>
                </Container>
                <Container gap={6}>
                    <Image width={12} height={12} src='assets/images/physicalProduct/code.png' />
                    <Flex direction="column" gap={4}>
                        <CustomHeading title='Customization with CSS & HTML' fontSize={20} />
                        <AppTypography fontSize={16} color={"#fff"}>Ready to go further? Dive into customization with implementing CSS and HTML coding</AppTypography>
                    </Flex>
                </Container>
                <Container gap={6}>
                    <Image width={12} height={12} src='assets/images/physicalProduct/template.png' />
                    <Flex direction="column" gap={4}>
                        <CustomHeading title='Order your uniqe Template' fontSize={20} />
                        <AppTypography fontSize={16} color={"#fff"}>Seeking a unique template? Our designers are here to turn your vision into reality
                        </AppTypography>
                    </Flex>
                </Container>
            </Grid>
        </Details>
    )
}

export default CustomizationDetails