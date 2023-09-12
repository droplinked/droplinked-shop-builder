import { Box, VStack } from '@chakra-ui/react'
import React from 'react'
import { Outlet } from 'react-router-dom'
import FooterLayout from './parts/footer/FooterLayout'
import HeaderMain from './parts/header/HeaderMain'

// This is master layout

function MainLayout() {
    return (
        <VStack align={"stretch"} bgColor={"bG"}>
            <Box><HeaderMain /></Box>
            <Box><Outlet /></Box>
            <Box><FooterLayout /></Box>
        </VStack>
    )
}

export default MainLayout