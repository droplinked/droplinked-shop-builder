import { Flex } from '@chakra-ui/react'
import React from 'react'
import { Breadcrumbs } from './Breadcrumbs'
import { UserMenu } from './UserMenu/UserMenu'

export const DesktopHeader = () => {
    return (
        <Flex
            as="header"
            justifyContent="space-between"
            alignItems="center"
            paddingBlock={4}
            paddingInline="24px 36px"
        >
            <Breadcrumbs />
            <UserMenu />
        </Flex>
    )
}