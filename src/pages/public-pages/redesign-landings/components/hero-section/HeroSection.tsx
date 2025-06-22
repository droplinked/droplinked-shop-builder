import { Box, Flex, Grid, Text } from '@chakra-ui/react'
import React from 'react'
import HeroAnimation from './HeroAnimation'
import { LottieOptions } from 'lottie-react'

interface HeroSectionProps {
    title?: string
    subtitle?: string
    backgroundImage?: string
    subTitleElements?: React.ReactNode
    heroDesktop?: Object
    heroTablet?: Object
    heroMobile?: Object
    lottieOptions?: Omit<LottieOptions, 'animationData'>
}

export default function HeroSection({
    title,
    subtitle,
    backgroundImage,
    subTitleElements,
    heroDesktop,
    heroTablet,
    heroMobile,
    lottieOptions,
}: HeroSectionProps) {
    return (
        <Grid
            templateColumns="1fr"
            templateRows="repeat(1, 1fr)"
            height="max-content"
            mx={{ base: 4, lg: 6 }}
            backgroundImage={`url(${backgroundImage})`}
            backgroundSize="cover"
            backgroundRepeat="no-repeat"
            borderRadius="24px"
        >
            <Box>
                <Flex flexDirection="column" alignItems="center" gap={{ base: 2, md: 4 }}>
                    <Text
                        color="neutral.white"
                        fontWeight={500}
                        lineHeight={{ base: "52px", md: "64px", xl: "72px", "2xl": "80px" }}
                        fontSize={{ base: "36px", md: "48px", xl: "56px", "2xl": "64px" }}
                        mt={{ base: "48px", "md": "80px" }}
                        whiteSpace="pre-line"
                        textAlign="center"
                    >
                        {title}
                    </Text>                    <Text
                        color="text.subtext.placeholder.light"
                        maxWidth={{ base: "90%", md: "80%", xl: "45%" }}
                        textAlign="center"
                        fontSize={{ base: "14px", md: "16px" }}
                    >
                        {subtitle}
                    </Text>
                </Flex>
                {subTitleElements}
            </Box>
            <HeroAnimation
                heroDesktop={heroDesktop}
                heroTablet={heroTablet}
                heroMobile={heroMobile}
                lottieOptions={lottieOptions}
            />
        </Grid>
    )
}