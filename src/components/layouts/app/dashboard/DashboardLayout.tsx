import React, { useMemo } from "react";
import { Box, Flex, VStack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import SidebarLayout from "./parts/sidebar/SidebarLayout";
import { useProfile } from "functions/hooks/useProfile/useProfile";
import DashboardGateModel from "functions/hoc/admin/parts/gate/model/DashboardGateModel";
import AdminHoc from "functions/hoc/admin/adminHoc";
import HeaderDashboard from "./parts/header/HeaderDashboard";
import FooterLayout from "../main/parts/footer/FooterLayout";

const DashboardLayout = () => {
  const { shop } = useProfile()

  const permission = useMemo(() => DashboardGateModel.checkPermission({ shop }), [shop])

  // This component manage layout 
  return (
    <VStack align={"stretch"} spacing={0} bgColor={"bG"}>
      <Box><HeaderDashboard /></Box>
      <Flex alignItems={"start"}>
        {!permission ? <Box w="72px" position="fixed" left="0" top="70px" paddingTop="45px" borderRight="1px solid" bottom="0"><SidebarLayout /></Box> : null}
        <Box width={"100%"} minH={"80vh"} padding="125px 36px 24px 106px" borderColor={"line"}><Outlet /></Box>
      </Flex>
      <Box><FooterLayout /></Box>
    </VStack>
  );
}

export default AdminHoc(DashboardLayout)