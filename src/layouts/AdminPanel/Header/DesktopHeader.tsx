import { Box } from '@chakra-ui/react'
import React from 'react'
import { Breadcrumbs } from './Breadcrumbs'
import { Dropdown } from './Dropdown'

export const DesktopHeader = () => {
    return (
        <Box>
            <Breadcrumbs />
            <Dropdown />
        </Box>
    )
}