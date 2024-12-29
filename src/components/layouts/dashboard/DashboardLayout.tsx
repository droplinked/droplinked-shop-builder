import { Box, HStack, VStack } from "@chakra-ui/react";
import AdminHoc from "functions/hoc/admin/adminHoc";
import useAppStore from "lib/stores/app/appStore";
import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "../app/main/components/footer/Footer";
import DashboardLayoutHeader from "./DashboardLayoutHeader";
import DashboardLayoutSidebar from "./DashboardLayoutSidebar";

const DashboardLayout = () => {
    const { user } = useAppStore()
    const location = useLocation().pathname
    const navigate = useNavigate()
    const notSettingPage = !location.endsWith("account-settings")
    useEffect(() => {
        if (["PROFILE_COMPLETED", "VERIFIED"].includes(user?.status)) navigate("/analytics/registration")
    }, [user, navigate])

    return (
        <VStack width="full" height="full" alignItems="flex-start" justifyContent="flex-start">
            <HStack width="full" height="full" alignItems="flex-start" justifyContent="flex-start">
                <DashboardLayoutSidebar />
                <VStack width="full" height="full" {...location.endsWith("/plans") && { overflow: "auto" }}>
                    <DashboardLayoutHeader />
                    <Box width="100%" minH="80vh" {...notSettingPage && { padding: 6 }} borderColor="line"><Outlet /></Box>
                </VStack>
            </HStack>
            <Footer />
        </VStack>
    );
};

export default AdminHoc(DashboardLayout)