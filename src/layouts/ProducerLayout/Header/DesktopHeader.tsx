import React from 'react'
import { Breadcrumbs } from './Breadcrumbs'
import { HeaderContainer } from './HeaderContainer'
import { UserMenu } from './UserMenu/UserMenu'

export const DesktopHeader = () => {
    return (
        <HeaderContainer
            justifyContent="space-between"
            alignItems="center"
            paddingBlock={4}
            paddingInline="24px 36px"
        >
            <Breadcrumbs />
            <UserMenu />
        </HeaderContainer>
    )
}