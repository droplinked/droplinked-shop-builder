import { Box, Flex, Grid, Image, Text, useBreakpointValue } from '@chakra-ui/react'
import React from 'react'
import { LazyLoad } from '../LazyLoad'
import HeroAnimation from './HeroAnimation'

/**
 * Props for HeroSection component
 */
interface HeroSectionProps {
    /** Main title text */
    title?: string
    /** Subtitle text */
    subtitle?: string
    /** Additional elements to render below subtitle */
    subTitleElements?: React.ReactNode
    /** Video URL for desktop breakpoint */
    videoDesktop?: string
    /** Video URL for tablet breakpoint */
    videoTablet?: string
    /** Video URL for mobile breakpoint */
    videoMobile?: string
    /** Image URL for desktop breakpoint */
    imageDesktop?: string
    /** Image URL for tablet breakpoint */
    imageTablet?: string
    /** Image URL for mobile breakpoint */
    imageMobile?: string
    /** Custom styles for video player */
    videoStyle?: React.CSSProperties
    /** Custom styles for image */
    imageStyle?: React.CSSProperties
    /** HTML video element props */
    playerProps?: React.VideoHTMLAttributes<HTMLVideoElement>
    /** HTML image element props */
    imageProps?: React.ImgHTMLAttributes<HTMLImageElement>
    /** Children elements to render inside the hero section */
    children?: React.ReactNode
}

/**
 * Hero section component with responsive background images and embedded video/image animation.
 * Uses HeroAnimation component for video playback or Image component for static images with breakpoint-specific sources.
 */
export default function HeroSection({
    title,
    subtitle,
    subTitleElements,
    videoDesktop,
    videoTablet,
    videoMobile,
    imageDesktop,
    imageTablet,
    imageMobile,
    videoStyle,
    imageStyle,
    playerProps,
    imageProps,
    children
}: HeroSectionProps) {
    const backgroundImage = useBreakpointValue({
        base: "url(https://upload-file-droplinked.s3.amazonaws.com/5faebef9a91644efc0f2a81b0283762ab54982d57fcbac6969d51f4f08fde1a7.png)",
        md: "url(https://upload-file-droplinked.s3.amazonaws.com/3761e9e1835f3d39f9b409299913078b6b7cffa2c8af76007fe2b2b7fe8cdf0b.png)",
        xl: "url(https://upload-file-droplinked.s3.amazonaws.com/7e5f157d56078d2736d69e135d1353a7cba7430d99fb433f8c329cb6169340f4.png)",
        "2xl": "url(https://upload-file-droplinked.s3.amazonaws.com/b34093c1f326a8235b02ab761a21605c7c5dcc183cc6a87fccfd7b6c6ebb9130.png)"
    })

    const paddingInline = useBreakpointValue({ base: "8px", md: "20px", xl: "36px", "2xl": "48px" })

    // Determine if we should show video or image based on provided props
    const hasVideo = videoDesktop || videoTablet || videoMobile
    const hasImage = imageDesktop || imageTablet || imageMobile

    // Get responsive image URL
    const imageUrl = useBreakpointValue({
        base: imageMobile || imageDesktop,
        md: imageTablet || imageDesktop,
        xl: imageDesktop,
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
                <Flex flexDirection="column" justifyContent="space-between" zIndex={1} gridArea="1 / 1 / 2 / 2">
                    <Box width="100%">
                        <Flex flexDirection="column" alignItems="center" gap={{ base: 2, md: 4 }}>
                            <Text
                                color="neutral.white"
                                fontWeight={500}
                                lineHeight={{ base: "48px", md: "64px", xl: "72px", "2xl": "80px" }}
                                fontSize={{ base: "32px", md: "48px", xl: "56px", "2xl": "64px" }}
                                mt={{ base: "48px", "md": "80px" }}
                                whiteSpace={{ base: "normal", md: "pre-line" }}
                                textAlign="center"
                            >
                                {title}
                            </Text>
                            <Text
                                color="text.subtext.placeholder.light"
                                maxWidth={{ base: "90%", md: "80%", xl: "45%" }}
                                fontSize={{ base: "14px", lg: "16px" }}
                                textAlign="center"
                                whiteSpace={{ base: "normal", md: "pre-line" }}
                            >
                                {subtitle}
                            </Text>
                        </Flex>
                        {subTitleElements}
                    </Box>
                    {children || (
                        hasImage ? (
                            <Image
                                src={imageUrl}
                                alt={title || "Hero image"}
                                style={{
                                    margin: "48px auto auto",
                                    paddingInline: paddingInline,
                                    width: "100%",
                                    height: "auto",
                                    ...imageStyle
                                }}
                                {...imageProps}
                            />
                        ) : hasVideo ? (
                            <HeroAnimation
                                videoDesktop={videoDesktop}
                                videoTablet={videoTablet}
                                videoMobile={videoMobile}
                                style={videoStyle}
                                playerProps={playerProps}
                            />
                        ) : null
                    )}
                </Flex>
            </Grid>
        </LazyLoad>
    )
}