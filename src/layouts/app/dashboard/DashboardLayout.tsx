import React from "react";
import { Box, HStack, VStack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import SidebarLayout from "./parts/sidebar/SidebarLayout";
import AdminHoc from "hoc/admin/adminHoc";
import { useProfile } from "hooks/useProfile/useProfile";
import { useCustomNavigate } from "hooks/useCustomeNavigate/useCustomNavigate";
import DashboardGateModel from "hoc/admin/parts/gate/model/DashboardGateModel";

const DashboardLayout = () => {
  const { shop } = useProfile()

  return (
    <VStack align={"stretch"} bgColor={"bG"} spacing={0}>
      <HStack alignItems={"start"}>
        {!DashboardGateModel.checkPermission({ shop }) ? <Box w="72px"><SidebarLayout /></Box> : null}
        <Box width={"100%"} minH={"80vh"} padding={10} borderLeft="1px solid" borderColor={"line"} paddingTop={10} paddingBottom={10}>
          <Outlet />
        </Box>
      </HStack>
    </VStack >
  );
}

export default AdminHoc(DashboardLayout)