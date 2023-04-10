import { Outlet } from "react-router-dom";
import { Flex, Box } from "@chakra-ui/react";

import SelectPagesComponent from "./component/select-pages-component/SelectPagesComponent";

const RegisterPagesWrapper = () => {
  return (
    <Flex w="100%" position="relative" justifyContent="center">
      <Box position="absolute" left="0px" top="0px">
        <SelectPagesComponent />
      </Box>
      <Outlet />
    </Flex>
  );
};

export default RegisterPagesWrapper;
