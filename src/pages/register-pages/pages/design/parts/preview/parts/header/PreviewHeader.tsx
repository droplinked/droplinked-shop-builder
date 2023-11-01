import { Box, Flex, HStack, Image } from '@chakra-ui/react'
import { designContext } from 'pages/register-pages/pages/design/design-context'
import React, { useContext } from 'react'
import previewHeaderModel from './model'

function PreviewHeader() {
    const { state: { shop: { headerIcon, shopDesign: { iconHeaderColor } } } } = useContext(designContext)
    const { icons } = previewHeaderModel

    return (
        <Flex justifyContent="center">
            <Flex justifyContent="space-between" width="90%" alignItems="center">
                <Box>{headerIcon && <Image height="50px" src={headerIcon} />}</Box>
                <HStack>
                    <Box>{icons({ icon: "user", color: iconHeaderColor })}</Box>
                    <Box>{icons({ icon: "cart", color: iconHeaderColor })}</Box>
                    <Box>{icons({ icon: "notification", color: iconHeaderColor })}</Box>
                </HStack>
            </Flex>
        </Flex>
    )
}

export default PreviewHeader