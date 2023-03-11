import { Flex, Box } from "@chakra-ui/react";

import Sidebar from "../../layouts/sidebar/Sidebar";

const AdminWrapper = () => {
  return (
    <Flex w="100%"  height='100%' minHeight='100%' >
      <Box w="72px" borderRight='1px solid' borderColor='line' height='100%' minHeight='100%' pt='24px'>
        <Sidebar />
      </Box>
      <Box w="100%" h="100%" p='24px'>

      </Box>
    </Flex>
  );
};

export default AdminWrapper;
