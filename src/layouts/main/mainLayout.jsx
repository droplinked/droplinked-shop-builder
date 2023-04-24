import { Box, VStack } from '@chakra-ui/react'
import React from 'react'
import { Outlet } from 'react-router-dom'
import FooterLayout from 'layouts/dashboard/parts/footer/FooterLayout'
import HeaderLayout from 'layouts/dashboard/parts/header/HeaderLayout'

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