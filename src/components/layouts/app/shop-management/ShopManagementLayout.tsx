import { Box, Flex } from '@chakra-ui/react'
import AdminHoc from 'functions/hoc/admin/adminHoc'
import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import DashboardLayoutHeader from 'components/layouts/dashboard/DashboardLayoutHeader'
import Footer from '../main/components/footer/Footer'

function ShopManagementLayout() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, [pathname]);

    return (
        <Flex minHeight={"100dvh"} direction={"column"} bgColor={"bG"}>
            <DashboardLayoutHeader />
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
            <Footer />
        </Flex>
    )
}

export default AdminHoc(ShopManagementLayout)