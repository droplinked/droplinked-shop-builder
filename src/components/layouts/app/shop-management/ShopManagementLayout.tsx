import { Box, Flex } from '@chakra-ui/react'
import AdminHoc from 'functions/hoc/admin/adminHoc'
import React from 'react'
import { Outlet } from 'react-router-dom'
import HeaderDashboard from '../dashboard/parts/header/HeaderDashboard'
import FooterLayout from '../main/parts/footer/FooterLayout'

function ShopManagementLayout() {
    return (
        <Flex minHeight={"100dvh"} direction={"column"} bgColor={"bG"}>
            <HeaderDashboard />
            <Box
                minHeight={"80dvh"}
                flex={1}
                padding="86px 36px 24px 36px"
                bgImage={"assets/images/multi-shop-bg.jpg"}
                bgSize={"cover"}
                bgPosition={"center"}
            >
                <Outlet />
            </Box>
            <FooterLayout />
        </Flex>
    )
}

export default AdminHoc(ShopManagementLayout)