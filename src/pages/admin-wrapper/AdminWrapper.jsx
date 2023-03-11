import { Flex, Box } from "@chakra-ui/react";

import Sidebar from "../../layouts/sidebar/Sidebar";

const AdminWrapper = () => {
  return (
    <Flex w="100%" border="3px solid red" minH="100%" h="100%">
      <Box w="72px" border="2px solid blue" h="100%" pt='24px'>
        <Sidebar />
      </Box>
      <Box w="100%" border="4px solid pink" h="100%" pt='24px'>

      </Box>
    </Flex>
  );
};

export default AdminWrapper;
