import { Flex, Text } from '@chakra-ui/react'
import { ShopLg } from 'assets/icons/System/Shop/ShopLg'
import IconWrapper from 'components/redesign/icon-wrapper/IconWrapper'
import React, { ReactNode } from 'react'

interface ShopPreviewHeaderProps {
    rightIcon: ReactNode
    onClick?: () => void
}

export default function ShopPreviewHeader({ rightIcon, onClick }: ShopPreviewHeaderProps) {
    return (
        <Flex justifyContent="space-between" alignItems="center" width="100%" onClick={onClick}>
            <Flex gap={4} alignItems="center">
                <IconWrapper icon={<ShopLg color="#fff" />} />
                <Text color="#fff" fontSize={16} fontWeight={500}>
                    Store Preview
                </Text>
            </Flex>
            {rightIcon}
        </Flex>
    )
}
