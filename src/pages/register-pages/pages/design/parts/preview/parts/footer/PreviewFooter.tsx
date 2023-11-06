import { Image } from '@chakra-ui/image'
import { Box, Flex, Link, VStack } from '@chakra-ui/layout'
import { designContext } from 'pages/register-pages/pages/design/design-context'
import React, { useContext, useMemo } from 'react'
import previewHeaderModel from '../header/model'
import PreviewTypo from '../parts/typo/PreviewTypo'

function PreviewFooter() {
    const { state: { shop: { headerIcon, shopDesign: { footerLinks, foreground, textColorParagraphs }, template_options }, device } } = useContext(designContext)
    const { icons } = previewHeaderModel

    const isDekstop = useMemo(() => device === "desktop", [device])

    return (
        <Flex justifyContent="center" backgroundColor={foreground || "#141414"} padding="20px 0" {...template_options?.['--dlk-ftr']?.['--dlk-ftr-styles']}>
            <VStack align="stretch" width="85%" spacing="20px">
                <Flex justifyContent="space-between" flexDirection={isDekstop ? "row" : "column"} rowGap={isDekstop ? 0 : "20px"} alignItems="center">
                    {headerIcon ? <Image maxWidth="100%" height="50px" {...template_options?.['--dlk-ftr']?.['--dlk-ftr-logo']} src={headerIcon} /> : <Box width="40%" maxWidth="150px">{icons({ icon: "logo", color: "#FFF" })}</Box>}
                    <Flex width={isDekstop ? "70%" : "100%"} flexDirection="row-reverse" justifyContent={isDekstop ? "unset" : "center"} align="stretch" flexWrap="wrap" gap="15px" rowGap="5px">
                        {footerLinks && footerLinks.length ? footerLinks.map((el, key) => (
                            <Link href={el.link} key={key} target="_blank">
                                <Flex alignItems="center" gap="15px">
                                    <PreviewTypo fontSize="14px">{el.caption}</PreviewTypo>
                                    {key !== 0 ? <Box opacity=".4" borderLeft={`1px solid ${textColorParagraphs}`} height="10px"></Box> : null}
                                </Flex>
                            </Link>
                        )) : null}
                    </Flex>
                </Flex>
                <Box borderBottom="2px solid #777"></Box>
                <Flex gap="15px">
                    <Box width="80px" borderBottom="5px solid #555"></Box>
                    <Box width="80px" borderBottom="5px solid #555"></Box>
                    <Box width="80px" borderBottom="5px solid #555"></Box>
                    <Box width="80px" borderBottom="5px solid #555"></Box>
                </Flex>
            </VStack>
        </Flex>
    )
}

export default PreviewFooter