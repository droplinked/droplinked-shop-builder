import { Box, Flex } from "@chakra-ui/react";
import { Outlet, useLocation } from "react-router-dom";
// Master layout register page
const RegisterPagesWrapper = () => {
    const location = useLocation();
    const isFullpage =
        location.pathname.search("settings/design") > 0 ||
        location.pathname.search("register/design") > 0 ||
        location.pathname.search("settings/tile") > 0 ||
        location.pathname.search("settings/payment-link-design") > 0;

    return (
        <Flex w="100%" justifyContent={"center"}>
            {/* <Box width={"200px"}>
                <SelectPagesComponent />
            </Box> */}
            <Flex width={isFullpage ? "100%" : "70%"} justifyContent="center">
                <Box width={"95%"} maxWidth={isFullpage ? "100%" : "800px"}>
                    <Outlet />
                </Box>
            </Flex>
        </Flex>
    );
};

export default RegisterPagesWrapper;
