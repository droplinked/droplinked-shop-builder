import { Outlet, useLocation } from "react-router-dom";
import { Flex, Box } from "@chakra-ui/react";

import SelectPagesComponent from "./component/select-pages-component/SelectPagesComponent";

// Master layout register page
const RegisterPagesWrapper = () => {
    const location = useLocation();
    const isFullpage = location.pathname.search("settings/design") > 0 || location.pathname.search("register/design") > 0 || location.pathname.search("settings/tile") > 0;

    return (
        <Flex w="100%">
            <Box width={"200px"}>
                <SelectPagesComponent />
            </Box>
            <Flex width={"100%"} justifyContent="center" paddingRight={isFullpage ? 0 : [0, "13%"]}>
                <Box width={"95%"} maxWidth={isFullpage ? "100%" : "800px"}>
                    <Outlet />
                </Box>
            </Flex>
        </Flex>
    );
};

export default RegisterPagesWrapper;
