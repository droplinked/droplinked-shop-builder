import { Box, Flex } from '@chakra-ui/layout'
import { designContext } from 'pages/register-pages/pages/design/design-context'
import React, { useContext, useMemo } from 'react'
import designPreviewContext from '../../../../context'
import PreviewProducts from './parts/products/PreviewProducts'
import PreviewProfile from './parts/profile/PreviewProfile'

function PreviewHomepage() {
    const { state: { shop: { template_options }, device, optionSelected } } = useContext(designContext)
    const { scrollRef } = useContext(designPreviewContext)

    const isDesktop = useMemo(() => device === "desktop", [device])

    return (
        <Flex ref={["products", "profile"].includes(optionSelected) ? scrollRef : null} justifyContent="center" padding={isDesktop ? "80px 0" : "10px 0"} {...template_options?.['--dlk-wrp']?.['--dlk-wrp-styles']}>
            <Flex width={isDesktop ? "85%" : "100%"} gap={isDesktop ? "40px" : "20px"} alignItems="flex-start" flexDirection={isDesktop ? "row" : "column"}>
                <Box width={isDesktop ? "25%" : "100%"}><PreviewProfile /></Box>
                <Box width={isDesktop ? "75%" : "100%"}>
                    <PreviewProducts />
                </Box>
            </Flex>
        </Flex>
    )
}

export default PreviewHomepage