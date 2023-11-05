import { Box, Flex, HStack, Image } from '@chakra-ui/react'
import { designContext } from 'pages/register-pages/pages/design/design-context'
import React, { useContext, useMemo } from 'react'
import previewHeaderModel from './model'

function PreviewHeader() {
    const { state: { shop: { headerIcon, shopDesign: { iconHeaderColor }, template_options }, device } } = useContext(designContext)
    const { icons } = previewHeaderModel

    const isDesktop = useMemo(() => device === "desktop", [device])

    return (
        <Flex padding="5px 0" {...template_options?.['--dlk-hdr']?.['--dlk-hdr-styles']} justifyContent="center" position="absolute" zIndex="1" top={isDesktop ? "10px" : "4px"} right="0" left="0">
            <Flex justifyContent="space-between" alignItems="center" {...template_options?.['--dlk-hdr']?.['--dlk-hdr-container']} width="85%" padding="5px 0">
                <Box>{headerIcon ? <Image {...template_options?.['--dlk-hdr']?.['--dlk-hdr-logo']} height={isDesktop ? "50px" : "30px"} src={headerIcon} /> : (
                    <Box width="50%">{icons({ icon: "logo", color: "#FFF" })}</Box>
                )}</Box>
                <HStack gap={isDesktop ? "8px" : "0"} {...template_options?.['--dlk-hdr']?.['--dlk-hdr-icons']?.['--dlk-hdr-icons-styles']}>
                    <Box {...template_options?.['--dlk-hdr']?.['--dlk-hdr-icons']?.['--dlk-hdr-icons-profile']}>{icons({ icon: "user", color: iconHeaderColor })}</Box>
                    <Box {...template_options?.['--dlk-hdr']?.['--dlk-hdr-icons']?.['--dlk-hdr-icons-cart']}>{icons({ icon: "cart", color: iconHeaderColor })}</Box>
                    <Box {...template_options?.['--dlk-hdr']?.['--dlk-hdr-icons']?.['--dlk-hdr-icons-notification']}>{icons({ icon: "notification", color: iconHeaderColor })}</Box>
                </HStack>
            </Flex>
        </Flex>
    )
}

export default PreviewHeader