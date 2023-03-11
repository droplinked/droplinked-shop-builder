import { Outlet } from "react-router-dom";
import { Flex, Box } from "@chakra-ui/react";

import { SideText } from "./RegisterPages-style";

const RegisterPagesWrapper = () => {
  return (
    <Flex w="100%" position="relative" justifyContent="center">
      <Box position="absolute" left="0px" top="0px">
        <SideText color='lightGray' >Shop info</SideText>
        <SideText color='lightGray' >Contact options</SideText>
        <SideText color='lightGray' >Design template</SideText>
      </Box>
      <Outlet />
    </Flex>
  );
};

export default RegisterPagesWrapper;
