import { Flex, Text } from '@chakra-ui/react'
import AppImage from 'components/common/image/AppImage'
import useAppStore from 'lib/stores/app/appStore'
import React from 'react'

function MenuItemShopInfo() {
    const { shop, user } = useAppStore()

    return (
        <Flex className='menuItem' alignItems="center" gap={4}>
            <AppImage
                width="50px"
                aspectRatio={1}
                borderRadius={8}
                objectFit="contain"
                src={shop?.logo}
            />
            <Flex flexDirection="column">
                <Text fontWeight={500} color="neutral.white">{shop?.name}</Text>
                <Text fontSize={12} color="text.subtext.placeholder.light">{shop?.description}</Text>
            </Flex>
        </Flex>
    )
}

export default MenuItemShopInfo