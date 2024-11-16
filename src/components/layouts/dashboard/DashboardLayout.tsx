import React from "react";
import { Box, HStack, VStack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import DashboardLayoutSidebar from "./DashboardLayoutSidebar";
import DashboardLayoutHeader from "./DashboardLayoutHeader";
import AdminHoc from "functions/hoc/admin/adminHoc";
import Footer from "../app/main/components/footer/Footer";

const DashboardLayout = () => {
    return (
        <VStack width="full" height="full" alignItems="flex-start" justifyContent="flex-start">
            <HStack width="full" height="full" alignItems="flex-start" justifyContent="flex-start">
                <DashboardLayoutSidebar />
                <VStack width="full" height="full">
                    <DashboardLayoutHeader />
                    <Box width="100%" minH="80vh" padding="24px 36px 24px 36px" borderColor="line"><Outlet /></Box>
                </VStack>
            </HStack>
            <Footer />
        </VStack>
    );
};

export default AdminHoc(DashboardLayout);
