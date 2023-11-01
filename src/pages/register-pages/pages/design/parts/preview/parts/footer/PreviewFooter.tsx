import { Image } from '@chakra-ui/image'
import { Box, Flex, Link, VStack } from '@chakra-ui/layout'
import { designContext } from 'pages/register-pages/pages/design/design-context'
import React, { useContext } from 'react'
import PreviewTypo from '../parts/typo/PreviewTypo'

function PreviewFooter() {
    const { state: { shop: { headerIcon, shopDesign: { footerLinks } } } } = useContext(designContext)

    return (
        <Flex justifyContent="center" backgroundColor="#141414" padding="20px 0">
            <VStack align="stretch" width="90%" spacing="20px">
                <Flex justifyContent="space-between">
                    {headerIcon && <Image height="50px" src={headerIcon} />}
                    <VStack align="stretch">
                        {footerLinks && footerLinks.length ? footerLinks.map((el, key) => (
                            <Link href={el.link} key={key} target="_blank">
                                <PreviewTypo fontSize="14px">{el.caption}</PreviewTypo>
                            </Link>
                        )) : null}
                    </VStack>
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