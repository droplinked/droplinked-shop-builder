import { Box, Button, UseDisclosureReturn } from '@chakra-ui/react'
import React from 'react'
import { Breadcrumbs } from './Breadcrumbs'
import { Dropdown } from './Dropdown'

interface MobileHeaderProps {
    disclosure: Pick<UseDisclosureReturn, 'onOpen'>
}

export const MobileHeader = ({ disclosure }: MobileHeaderProps) => {
    return (
        <Box>
            <Button onClick={disclosure.onOpen}>Menu</Button>
            <img src="/logo.png" alt="Brand Logo" />
            <Dropdown />
            <Breadcrumbs />
        </Box>
    )
}