import { Flex, Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import Sidebar from "../../layouts/sidebar/Sidebar";

const AdminWrapper = () => {
  return (
    <Flex w="100%"  height='100%' minHeight='100%' >
      <Box w="72px" borderRight='1px solid' borderColor='line' maxHeight='auto'  h='100%' minH="100vh" pt='24px'>
        <Sidebar />
      </Box>
      <Box w="100%" h="100%" p='24px'>
      <Outlet />
      </Box>
    </Flex>
  );
};

export default AdminWrapper;
