import React, { useMemo } from "react";
import { Box, Flex, VStack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import SidebarLayout from "./parts/sidebar/SidebarLayout";
import { useProfile } from "functions/hooks/useProfile/useProfile";
import DashboardGateModel from "functions/hoc/admin/parts/gate/model/DashboardGateModel";
import AdminHoc from "functions/hoc/admin/adminHoc";
import HeaderDashboard from "./parts/header/HeaderDashboard";
import FooterLayout from "../main/parts/footer/FooterLayout";
import StickyBox from "react-sticky-box";

const DashboardLayout = () => {
  const { profile } = useProfile()
  const permission = useMemo(() => DashboardGateModel.checkPermission({ user: profile }), [profile])

  // This component manage layout 
  return (
    <VStack align={"stretch"} spacing={0} bgColor={"bG"}>
      <Box><HeaderDashboard /></Box>
      <Flex alignItems={"start"}>
        {!permission ? <StickyBox offsetTop={20} offsetBottom={20} style={{ width: "72px", borderRight: '1px solid"', position: 'absolute', paddingTop: '100px' }}><SidebarLayout /></StickyBox> : null}
        <Box width={"100%"} minH={"80vh"} padding="125px 36px 24px 36px" borderColor={"line"}><Outlet /></Box>
      </Flex>
      <Box><FooterLayout /></Box>
    </VStack>
  );
}

export default AdminHoc(DashboardLayout)