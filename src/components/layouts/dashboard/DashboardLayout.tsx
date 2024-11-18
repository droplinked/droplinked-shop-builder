import React from "react";
import { Box, HStack, VStack } from "@chakra-ui/react";
import { Outlet, useLocation } from "react-router-dom";
import FooterLayout from "../app/main/parts/footer/FooterLayout";
import DashboardLayoutSidebar from "./DashboardLayoutSidebar";
import DashboardLayoutHeader from "./DashboardLayoutHeader";
import AdminHoc from "functions/hoc/admin/adminHoc";

const DashboardLayout = () => {
    const location = useLocation().pathname
    return (
        <VStack width="full" height="full" alignItems="flex-start" justifyContent="flex-start">
            <HStack width="full" height="full" alignItems="flex-start" justifyContent="flex-start">
                <DashboardLayoutSidebar />
                <VStack width="full" height="full" {...location.endsWith("/plans") && { overflow: "auto" }}>
                    <DashboardLayoutHeader />
                    <Box width="100%" minH="80vh" padding="24px 36px 24px 36px" borderColor="line"><Outlet /></Box>
                </VStack>
            </HStack>
            <FooterLayout />
        </VStack>
    );
};

export default AdminHoc(DashboardLayout);
