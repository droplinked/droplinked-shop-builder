import { Flex, Box } from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { useProfile } from "../../../hooks/useProfile/useProfile";

import SidebarLayout from "../../../layouts/sidebar-layout/SidebarLayout";

const AdminWrapper = () => {
  const navigate = useNavigate();
  const { profile } = useProfile();

  useEffect(() => {
    if (!profile) navigate("/");
  }, [profile]);

  return (
    <Flex w="100%" height="100%" minHeight="100%">
      <Box
        w="72px"
        borderRight="1px solid"
        borderColor="line"
        maxHeight="auto"
        h="100%"
        minH="100vh"
        pt="24px"
      >
        <SidebarLayout />
      </Box>
      <Box w="100%" h="100%" p="24px">
        <Outlet />
      </Box>
    </Flex>
  );
};

export default AdminWrapper;
