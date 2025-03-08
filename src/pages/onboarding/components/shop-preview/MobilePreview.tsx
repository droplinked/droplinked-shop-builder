import { Flex } from '@chakra-ui/react'
import React from 'react'
import ShopBanner from './ShopBanner'
import ShopBar from './ShopBar'

export default function MobilePreview() {
    return (
        <Flex
            position="relative"
            flexDirection={"column"}
            border={"1px solid #292929"}
            userSelect={"none"}
        >
            <ShopBanner />
            <ShopBar />
        </Flex>
    )
}
