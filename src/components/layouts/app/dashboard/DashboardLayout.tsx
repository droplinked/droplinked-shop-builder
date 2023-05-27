import React, { useMemo } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import SidebarLayout from "./parts/sidebar/SidebarLayout";
import AdminHoc from "hoc/admin/adminHoc";
import { useProfile } from "hooks/useProfile/useProfile";
import DashboardGateModel from "hoc/admin/parts/gate/model/DashboardGateModel";

const DashboardLayout = () => {
  const { shop } = useProfile()

  const permission = useMemo(() => DashboardGateModel.checkPermission({ shop }), [shop])

  return (
    <Flex alignItems={"start"}>
      {!permission ? <Box w="72px"><SidebarLayout /></Box> : null}
      <Box width={"100%"} minH={"80vh"} padding={10} borderLeft="1px solid" borderColor={"line"} paddingTop={10} paddingBottom={10}>
        <Outlet />
      </Box>
    </Flex>
  );
}

export default AdminHoc(DashboardLayout)