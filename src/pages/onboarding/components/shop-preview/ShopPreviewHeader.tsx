import { Flex, Text } from '@chakra-ui/react'
import { ShopLg } from 'assets/icons/System/Shop/ShopLg'
import React, { ReactNode } from 'react'

interface ShopPreviewHeaderProps {
    rightIcon: ReactNode
    onClick?: () => void
}

export default function ShopPreviewHeader({ rightIcon, onClick }: ShopPreviewHeaderProps) {
    return (
        <Flex justifyContent="space-between" alignItems="center" width="100%" onClick={onClick}>
            <Flex gap={4} alignItems="center">
                <Flex
                    padding={3}
                    justify="center"
                    align="center"
                    border="1px solid #292929"
                    borderRadius={8}
                    background="#1c1c1c"
                >
                    <ShopLg color="#fff" />
                </Flex>
                <Text color="#fff" fontSize={16} fontWeight={500}>
                    Store Preview
                </Text>
            </Flex>
            {rightIcon}
        </Flex>
    )
}
