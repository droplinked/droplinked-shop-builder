import { Box, Flex, HStack, Image } from '@chakra-ui/react'
import { designContext } from 'pages/register-pages/pages/design/design-context'
import React, { useContext } from 'react'
import previewHeaderModel from './model'

function PreviewHeader() {
    const { state: { shop: { headerIcon, shopDesign: { iconHeaderColor }, template_options } } } = useContext(designContext)
    const { icons } = previewHeaderModel

    return (
        <Flex {...template_options?.['--dlk-hdr']?.['--dlk-hdr-styles']} justifyContent="center">
            <Flex justifyContent="space-between" alignItems="center" {...template_options?.['--dlk-hdr']?.['--dlk-hdr-container']} width="90%" padding="5px 0">
                <Box>{headerIcon && <Image {...template_options?.['--dlk-hdr']?.['--dlk-hdr-logo']} height="50px" src={headerIcon} />}</Box>
                <HStack {...template_options?.['--dlk-hdr']?.['--dlk-hdr-icons']?.['--dlk-hdr-icons-styles']}>
                    <Box {...template_options?.['--dlk-hdr']?.['--dlk-hdr-icons']?.['--dlk-hdr-icons-profile']}>{icons({ icon: "user", color: iconHeaderColor })}</Box>
                    <Box {...template_options?.['--dlk-hdr']?.['--dlk-hdr-icons']?.['--dlk-hdr-icons-cart']}>{icons({ icon: "cart", color: iconHeaderColor })}</Box>
                    <Box {...template_options?.['--dlk-hdr']?.['--dlk-hdr-icons']?.['--dlk-hdr-icons-notification']}>{icons({ icon: "notification", color: iconHeaderColor })}</Box>
                </HStack>
            </Flex>
        </Flex>
    )
}

export default PreviewHeader