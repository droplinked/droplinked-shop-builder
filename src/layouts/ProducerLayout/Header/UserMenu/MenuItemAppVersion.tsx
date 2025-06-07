import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { appVersion } from 'utils/app/variable'

function MenuItemAppVersion() {
    return (
        <Flex
            justifyContent="space-between"
            alignItems="center"
            padding="12px 24px"
        >
            <Text fontSize={14} color="text.subtext.placeholder.dark">Version</Text>
            <Text fontSize={14} fontWeight={500} color="text.subtext.placeholder.light">{appVersion}</Text>
        </Flex>
    )
}

export default MenuItemAppVersion