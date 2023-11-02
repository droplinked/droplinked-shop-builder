import { Box, Flex } from '@chakra-ui/layout'
import { designContext } from 'pages/register-pages/pages/design/design-context'
import React, { useContext } from 'react'
import PreviewProducts from './parts/products/PreviewProducts'
import PreviewProfile from './parts/profile/PreviewProfile'

function PreviewHomepage() {
    const { state: { shop: { template_options }, device } } = useContext(designContext)

    return (
        <Flex justifyContent="center" {...template_options?.['--dlk-wrp']?.['--dlk-wrp-styles']}>
            <Flex width="85%" gap="20px" flexDirection={device === "desktop" ? "row" : "column"}>
                <Box width={device === "desktop" ? "30%" : "100%"}><PreviewProfile /></Box>
                <Box width={device === "desktop" ? "70%" : "100%"}><PreviewProducts /></Box>
            </Flex>
        </Flex>
    )
}

export default PreviewHomepage