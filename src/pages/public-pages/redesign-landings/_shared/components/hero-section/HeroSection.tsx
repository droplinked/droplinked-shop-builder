import { Box, Flex, Grid, Text } from '@chakra-ui/react'
import React from 'react'
import HeroAnimation from './HeroAnimation'
import { LottieOptions } from 'lottie-react'
import { motion } from 'framer-motion'
import { ReactComponent as BluredStar } from '../../svgs/BluredStar.svg'

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
    return (
        <Grid
            templateColumns="1fr"
            templateRows="repeat(1, 1fr)"
            height="max-content"
            mx={{ base: 4, lg: 6 }}
            backgroundSize="cover"
            backgroundRepeat="no-repeat"
            borderRadius="24px"
            position="relative"
            overflow="hidden"
        >
            <Box
                position="absolute"
                inset="0"
                zIndex={0}
                bg="linear-gradient(0deg, rgba(43, 207, 161, 0.04) 0%, rgba(43, 207, 161, 0.04) 100%), linear-gradient(0deg, rgba(10, 10, 10, 0.00) 0%, #0A0A0A 100%)"
            >
                <Box
                    position="absolute"
                    inset="0"
                    bgImage="url(https://upload-file-droplinked.s3.amazonaws.com/3b12a2fc765465de8080fadb321a30195c0df35dcffea9f75956465f70d35826.png)"
                    bgPosition="center"
                    bgSize="cover"
                    bgRepeat="no-repeat"
                    bgColor="lightgray"
                />
                <Box
                    position="absolute"
                    inset="0"
                    bg="var(--Main-Primary, #2BCFA1)"
                    mixBlendMode="color"
                />
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                        repeat: Infinity,
                        duration: 40,
                        ease: 'linear',
                    }}
                    style={{
                        position: 'absolute',
                        top: '45%',
                        left: '-50%',
                        width: '200%',
                        height: '200%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 999,
                    }}
                >
                    <BluredStar width="100%" height="100%" />
                </motion.div>
                <Box
                    position="absolute"
                    inset="0"
                    backdropFilter="blur(50px)"
                />
            </Box>
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
    )
}