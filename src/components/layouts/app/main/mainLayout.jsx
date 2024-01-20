import { Box, VStack } from '@chakra-ui/react'
import useHookStore from 'functions/hooks/store/useHookStore'
import React, { useEffect } from 'react'
import { Outlet, useLocation, useRoutes } from 'react-router-dom'
import FooterLayout from './parts/footer/FooterLayout'
import HeaderMain from './parts/header/HeaderMain'
import { useCustomNavigate } from "functions/hooks/useCustomeNavigate/useCustomNavigate";

// This is master layout
function MainLayout() {
    const location = useLocation()
    const { app: { shop } } = useHookStore();
    const { shopNavigate } = useCustomNavigate();

    useEffect(() => {
        if (shop) shopNavigate('products')
    }, [shop])


    return (
        <VStack align={"stretch"} bgColor={"bG"}>
            {location.pathname !== "/" && <Box><HeaderMain /></Box>}
            <Box><Outlet /></Box>
            {location.pathname !== "/" && <Box><FooterLayout /></Box>}
        </VStack>
    )
}

export default MainLayout