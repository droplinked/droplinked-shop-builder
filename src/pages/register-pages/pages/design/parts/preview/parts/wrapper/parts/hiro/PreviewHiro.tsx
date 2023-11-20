import { Image } from '@chakra-ui/image'
import { Box, Flex, VStack } from '@chakra-ui/layout'
import { designContext } from 'pages/register-pages/pages/design/design-context'
import React, { useContext, useMemo } from 'react'
import designPreviewContext from '../../../../context'
import PreviewActive from '../../../parts/active/PreviewActive'
import PreviewTypo from '../../../parts/typo/PreviewTypo'

function PreviewHiro() {
    const { state: { shop: { backgroundImage, backgroundText, shopDesign: { hiroTextColor, hiroLayout }, template_options, fullWidthHero }, device, optionSelected } } = useContext(designContext)
    const { scrollRef } = useContext(designPreviewContext)

    const isDesktop = useMemo(() => device === "desktop", [device])

    const text = useMemo(() => <PreviewTypo fontSize={isDesktop ? "20px" : "14px"} fontfontWeight="bold" {...template_options?.['--dlk-wrp']?.['--dlk-wrp-hiro']?.['--dlk-wrp-hiro-caption']} color={hiroTextColor}>{backgroundText}</PreviewTypo>, [hiroTextColor, backgroundText, device])
    const image = useMemo(() => backgroundImage && <Image width={fullWidthHero ? "100%" : "auto"} height={fullWidthHero ? "auto" : "100%"} maxWidth="100%" {...template_options?.['--dlk-wrp']?.['--dlk-wrp-hiro']?.['--dlk-wrp-hiro-image']} src={backgroundImage} />, [backgroundImage, fullWidthHero])
    const style = useMemo(() => template_options?.['--dlk-wrp']?.['--dlk-wrp-hiro']?.['--dlk-wrp-hiro-styles'], [template_options])

    const handleLayout = useMemo(() => {
        switch (hiroLayout) {
            case 'right':
                return (
                    <Flex justifyContent="space-between" height="100%" padding={isDesktop ? "0" : "30px 0"} position="relative" flexDirection="row-reverse" {...style}>
                        {image}
                        <Box position="absolute" top="50%" width="50%" transform="translateY(-50%)" left="7%" textAlign="left">{text}</Box>
                    </Flex>
                )
            case 'left':
                return (
                    <Flex justifyContent="space-between" height="100%" padding={isDesktop ? "0" : "30px 0"} position="relative" alignItems="center" {...style}>
                        {image}
                        <Box position="absolute" top="50%" width="50%" transform="translateY(-50%)" right="7%">{text}</Box>
                    </Flex>
                )
            case 'center':
                return (
                    <VStack justifyContent="center" height="100%" padding={isDesktop ? "0" : "30px 0"} {...style}>
                        {image}
                        <Box position="absolute" top="50%" left="50%" textAlign="center" width="80%" transform="translate(-50%, -50%)">{text}</Box>
                    </VStack>
                )
            case 'right_text':
                return (
                    <Box justifyContent="center" height="100%" position="relative" {...style}>
                        {image}
                        <Box position="absolute" top="50%" width="50%" transform="translateY(-50%)" right="7%" textAlign="right">{text}</Box>
                    </Box>
                )
            case 'left_text':
                return (
                    <Box justifyContent="center" height="100%" position="relative" {...style}>
                        {image}
                        <Box position="absolute" top="50%" width="50%" transform="translateY(-50%)" left="7%">{text}</Box>
                    </Box>
                )
            case 'center_text':
                return (
                    <Box justifyContent="center" height="100%" position="relative" {...style}>
                        {image}
                        <Box position="absolute" top="50%" left="50%" textAlign="center" width="80%" transform="translate(-50%, -50%)">{text}</Box>
                    </Box>
                )

            default:
                return <span></span>
        }
    }, [hiroLayout, backgroundImage, device, hiroTextColor, template_options, backgroundText, fullWidthHero])

    return (
        <PreviewActive
            section='hero'
            props={{
                ...optionSelected === "hero" && { ref: scrollRef },
                minHeight: "100px",
                height: "270px",
                position: "relative",
                overflow: "hidden"
            }}
        >
            {handleLayout}
        </PreviewActive>
    )
}

export default PreviewHiro