import { Outlet, useLocation } from "react-router-dom";
import { Flex, Box } from "@chakra-ui/react";

import { SideText } from "./RegisterPages-style";

const RegisterPagesWrapper = () => {
  const currentPath = useLocation().pathname;

  // The current location.

//primary
//lightGray
  return (
    <Flex w="100%" position="relative" justifyContent="center">
      <Box position="absolute" left="0px" top="0px">
        <SideText color={currentPath.includes('shop-info')?'primary':'lightGray'}>Shop info</SideText>
        <SideText color={currentPath.includes('contact-info')?'primary':'lightGray'}>Contact options</SideText>
        <SideText color={currentPath.includes('design')?'primary':'lightGray'}>Design template</SideText>
      </Box>
      <Outlet />
    </Flex>
  );
};

export default RegisterPagesWrapper;
