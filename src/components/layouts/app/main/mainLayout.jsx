import { Box, VStack } from '@chakra-ui/react'
import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import FooterLayout from './parts/footer/FooterLayout'
import HeaderMain from './parts/header/HeaderMain'

// This is master layout
function MainLayout() {
    const location = useLocation()

    return (
        <VStack align={"stretch"} bgColor={"bG"}>
            {location.pathname !== "/" && <Box><HeaderMain /></Box>}
            <Box><Outlet /></Box>
            {location.pathname !== "/" && <Box><FooterLayout /></Box>}
        </VStack>
    )
}

export default MainLayout