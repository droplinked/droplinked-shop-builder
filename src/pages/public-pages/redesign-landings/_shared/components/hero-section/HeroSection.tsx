import { Box, Flex, Grid, Text, useBreakpointValue } from '@chakra-ui/react'
import React from 'react'
import HeroAnimation from './HeroAnimation'
import { LottieOptions } from 'lottie-react'
import { LazyLoad } from '../LazyLoad'

interface HeroSectionProps {
    title?: string
    subtitle?: string
    subTitleElements?: React.ReactNode
    heroDesktop?: Object
    heroTablet?: Object
    heroMobile?: Object
    lottieOptions?: Omit<LottieOptions, 'animationData'>
}

export default function HeroSection({
    title,
    subtitle,
    subTitleElements,
    heroDesktop,
    heroTablet,
    heroMobile,
    lottieOptions,
}: HeroSectionProps) {
    const backgroundImage = useBreakpointValue({
        base: "url(https://upload-file-droplinked.s3.amazonaws.com/5faebef9a91644efc0f2a81b0283762ab54982d57fcbac6969d51f4f08fde1a7.png)", // 767 به پایین
        md: "url(https://upload-file-droplinked.s3.amazonaws.com/3761e9e1835f3d39f9b409299913078b6b7cffa2c8af76007fe2b2b7fe8cdf0b.png)", // 1279 تا 768
        xl: "url(https://upload-file-droplinked.s3.amazonaws.com/7e5f157d56078d2736d69e135d1353a7cba7430d99fb433f8c329cb6169340f4.png)", // 1439 تا 1280
        "2xl": "url(https://upload-file-droplinked.s3.amazonaws.com/b34093c1f326a8235b02ab761a21605c7c5dcc183cc6a87fccfd7b6c6ebb9130.png)" // 1440 به بالا
    })

    return (
        <LazyLoad>
            <Grid
                templateColumns="1fr"
                templateRows="repeat(1, 1fr)"
                height={{ base: "728px", md: "max-content" }}
                mx={{ base: 2, md: 4, lg: 6 }}
                backgroundImage={backgroundImage}
                backgroundSize="cover"
                backgroundRepeat="no-repeat"
                backgroundPosition="center"
                borderRadius="24px"
                position="relative"
                overflow="hidden"
            >
                <Box zIndex={1} gridArea="1 / 1 / 2 / 2">
                    <Box>
                        <Flex flexDirection="column" alignItems="center" gap={{ base: 2, md: 4 }}>
                            <Text
                                color="neutral.white"
                                fontWeight={500}
                                lineHeight={{ base: "48px", md: "64px", xl: "72px", "2xl": "80px" }}
                                fontSize={{ base: "32px", md: "48px", xl: "56px", "2xl": "64px" }}
                                mt={{ base: "48px", "md": "80px" }}
                                whiteSpace="pre-line"
                                textAlign="center"
                            >
                                {title}
                            </Text>
                            <Text
                                color="text.subtext.placeholder.light"
                                maxWidth={{ base: "90%", md: "80%", xl: "45%" }}
                                textAlign="center"
                                fontSize={{ base: "14px", lg: "16px" }}
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
                </Box>
            </Grid>
        </LazyLoad>
    )
}