import React from "react";
import { Box, HStack, VStack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import FooterLayout from "../app/main/parts/footer/FooterLayout";
import useAppStore from "lib/stores/app/appStore";
import { useCustomNavigate } from "functions/hooks/useCustomeNavigate/useCustomNavigate";
import DashboardLayoutSidebar from "./DashboardLayoutSidebar";
import DashboardLayoutHeader from "./DashboardLayoutHeader";
import { createSubscriptionStatusConstants } from "./dashboard.layout.constants";

const DashboardLayout = () => {
    const { shop } = useAppStore();
    const { shopNavigate } = useCustomNavigate();
    const subscriptionStatusConstants = createSubscriptionStatusConstants({ STARTER: () => shopNavigate("/dashboard/plans") }, shop?.subscription?.daysUntilExpiration)[shop?.subscription?.subscriptionId?.type];
    return (
        <VStack width="full" height="full" alignItems="flex-start" justifyContent="flex-start">
            <HStack width="full" height="full" alignItems="flex-start" justifyContent="flex-start">
                <DashboardLayoutSidebar />
                <VStack width="full" height="full">
                    <DashboardLayoutHeader subscriptionInfo={subscriptionStatusConstants} />
                    <Box width="100%" minH="80vh" padding="24px 36px 24px 36px" borderColor="line"><Outlet /></Box>
                </VStack>
            </HStack>
            <FooterLayout />
        </VStack>
    );
};

export default DashboardLayout;
