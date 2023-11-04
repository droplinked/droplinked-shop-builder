import { Image } from '@chakra-ui/image'
import { Box, Flex, VStack } from '@chakra-ui/layout'
import { useProfile } from 'functions/hooks/useProfile/useProfile'
import { designContext } from 'pages/register-pages/pages/design/design-context'
import React, { useContext } from 'react'
import PreviewTypo from '../../../../../parts/typo/PreviewTypo'
import PreviewSocials from './parts/socials/PreviewSocials'

function PreviewProfile() {
    const { shop } = useProfile()
    const { state: { shop: { logo, shopDesign: { foreground, textColorParagraphs } }, device } } = useContext(designContext)

    return (
        <VStack align="stretch" spacing="15px">
            <VStack align="stretch" spacing={device === "desktop" ? "15px" : "5px"} padding={device === "desktop" ? "30px 20px" : "10px"} backgroundColor={foreground || "#141414"} borderRadius="8px">
                <Flex justifyContent="center">
                    {logo && <Image width="90px" height="90px" borderRadius="100%" src={logo} />}
                </Flex>
                <Flex justifyContent="center"><PreviewTypo fontSize="15px" fontWeight="bold" color={textColorParagraphs || "#FFF"}>{shop?.name}</PreviewTypo></Flex>
                <PreviewSocials />
            </VStack>
        </VStack>
    )
}

export default PreviewProfile