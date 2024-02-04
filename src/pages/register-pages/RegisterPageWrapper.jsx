import { Outlet } from "react-router-dom";
import { Flex, Box } from "@chakra-ui/react";

import SelectPagesComponent from "./component/select-pages-component/SelectPagesComponent";

const RegisterPagesWrapper = () => {
  return (
    <Flex w="100%">
      <Box width={"200px"}>
        <SelectPagesComponent />
      </Box>
      <Flex width={"100%"} justifyContent="center" paddingRight={[0, "13%"]}>
        <Box width={"90%"} maxWidth="800px" ><Outlet /></Box>
      </Flex>
    </Flex>
  );
};

export default RegisterPagesWrapper;
