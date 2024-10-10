import { Flex } from '@chakra-ui/react'
import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import FooterLayout from './parts/footer/FooterLayout'
import HeaderMain from './parts/header/HeaderMain'

function MainLayout() {
    const location = useLocation()

    return (
        <Flex direction={"column"} bgColor={"bG"}>
            {location.pathname !== "/" && <HeaderMain />}
            <Outlet />
            {location.pathname !== "/" && <FooterLayout />}
        </Flex>
    )
}

export default MainLayout