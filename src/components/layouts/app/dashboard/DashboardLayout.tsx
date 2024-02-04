import React, { useMemo } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import SidebarLayout from "./parts/sidebar/SidebarLayout";
import { useProfile } from "functions/hooks/useProfile/useProfile";
import DashboardGateModel from "functions/hoc/admin/parts/gate/model/DashboardGateModel";
import AdminHoc from "functions/hoc/admin/adminHoc";

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