import { Flex, Box } from '@chakra-ui/react'
import React from 'react'
import TopBar from './TopBar'
import ShopBanner from './ShopBanner'
import ShopBar from './ShopBar'
import ProductPlaceholder from './ProductPlaceholder'
import RightSectionWrapper from '../common/RightSectionWrapper'

export default function DesktopPreview() {
    return (
        <RightSectionWrapper>
            <Box position="relative" overflow="hidden">
                <Flex
                    position="relative"
                    flexDirection={"column"}
                    border={"1px solid #292929"}
                    borderTopRadius={8}
                    userSelect={"none"}
                >
                    <TopBar />
                    <ShopBanner />
                    <ShopBar />
                    <ProductPlaceholder />
                </Flex>
                <Box
                    position="absolute"
                    bottom="0"
                    left="0"
                    right="0"
                    height="30rem"
                    background="linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(20,20,20,0.5) 10%, #141414 100%)"
                    pointerEvents="none"
                />
            </Box>
        </RightSectionWrapper>
    )
}
