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
                bgImg={"https://upload-file-flatlay.s3.us-west-2.amazonaws.com/2b7b70c4e1f6a4288cc468e07048880deafcd6c44d7edccb5a39314b6f56f5a4.jpg_or.jpg"}
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