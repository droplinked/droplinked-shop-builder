import { Image } from '@chakra-ui/image'
import { Box, Flex, VStack } from '@chakra-ui/layout'
import { designContext } from 'pages/register-pages/pages/design/design-context'
import React, { useContext, useMemo } from 'react'
import PreviewTypo from '../../../parts/typo/PreviewTypo'

function PreviewHiro() {
    const { state: { shop: { backgroundImage, backgroundText, shopDesign: { hiroTextColor, hiroLayout }, template_options, fullWidthHero }, device } } = useContext(designContext)

    const isDesktop = useMemo(() => device === "desktop", [device])

    const text = useMemo(() => <PreviewTypo fontSize={isDesktop ? "20px" : "14px"} fontWeight="bold" {...template_options?.['--dlk-wrp']?.['--dlk-wrp-hiro']?.['--dlk-wrp-hiro-caption']} color={hiroTextColor}>{backgroundText}</PreviewTypo>, [hiroTextColor, backgroundText, device])
    const image = useMemo(() => backgroundImage && <Image width={fullWidthHero ? "100%" : "auto"} maxWidth="100%" {...template_options?.['--dlk-wrp']?.['--dlk-wrp-hiro']?.['--dlk-wrp-hiro-image']} src={backgroundImage} />, [backgroundImage, fullWidthHero])
    const style = useMemo(() => template_options?.['--dlk-wrp']?.['--dlk-wrp-hiro']?.['--dlk-wrp-hiro-styles'], [template_options])


    const handleLayout = useMemo(() => {
        switch (hiroLayout) {
            case 'right':
                return (
                    <Flex justifyContent="space-between" position="relative" flexDirection="row-reverse" {...style}>
                        {image}
                        <Box position="absolute" top="50%" transform="translate(-50%, -50%)" left="10%">{text}</Box>
                    </Flex>
                )
            case 'left':
                return (
                    <Flex justifyContent="space-between" position="relative" alignItems="center" {...style}>
                        {image}
                        <Box position="absolute" top="50%" transform="translate(-50%, -50%)" right="5%">{text}</Box>
                    </Flex>
                )
            case 'center':
                return (
                    <VStack justifyContent="center" {...style}>
                        {image}
                        <Box>{text}</Box>
                    </VStack>
                )
            case 'right_text':
                return (
                    <Box justifyContent="center" position="relative" {...style}>
                        {image}
                        <Box position="absolute" top="50%" transform="translate(-50%, -50%)" right="5%">{text}</Box>
                    </Box>
                )
            case 'left_text':
                return (
                    <Box justifyContent="center" position="relative" {...style}>
                        {image}
                        <Box position="absolute" top="50%" transform="translate(-50%, -50%)" left="10%">{text}</Box>
                    </Box>
                )
            case 'center_text':
                return (
                    <Box justifyContent="center" position="relative" {...style}>
                        {image}
                        <Box position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)">{text}</Box>
                    </Box>
                )

            default:
                return <span></span>
        }
    }, [hiroLayout, backgroundImage, device, hiroTextColor, template_options, backgroundText, fullWidthHero])

    return handleLayout
}

export default PreviewHiro