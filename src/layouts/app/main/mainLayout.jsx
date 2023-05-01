import { Box, VStack } from '@chakra-ui/react'
import React from 'react'
import { Outlet } from 'react-router-dom'
import FooterLayout from './parts/footer/FooterLayout'
import HeaderLayout from './parts/header/HeaderLayout'

function MainLayout() {
    return (
        <VStack align={"stretch"} bgColor={"bG"}>
            <Box><HeaderLayout /></Box>
            <Box><Outlet /></Box>
            <Box><FooterLayout /></Box>
        </VStack>
    )
}

export default MainLayout