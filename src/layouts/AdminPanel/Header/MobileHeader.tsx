import { Box, Button } from '@chakra-ui/react'
import { useProducerLayout } from 'context/ProducerLayoutContext'
import React from 'react'
import { Breadcrumbs } from './Breadcrumbs'
import { Dropdown } from './Dropdown'

export const MobileHeader = () => {
    const { toggleSidebar } = useProducerLayout()

    return (
        <Box>
            <Button onClick={toggleSidebar}>Menu</Button>
            <img src="/logo.png" alt="Brand Logo" />
            <Dropdown />
            <Breadcrumbs />
        </Box>
    )
}