import { Flex } from '@chakra-ui/react'
import React from 'react'
import TopBar from './TopBar'
import ShopBanner from './ShopBanner'
import ShopBar from './ShopBar'
import ProductPlaceholder from './ProductPlaceholder'

export default function DesktopPreview() {
    return (
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
    )
}
