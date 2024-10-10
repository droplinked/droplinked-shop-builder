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
    const isTechnical = location.pathname.search("settings/technical") > 0;
    return (
        <Flex w="100%" justifyContent={"center"}>
            {/* <Box width={"200px"}>
                <SelectPagesComponent />
            </Box> */}
            <Flex width={isFullpage ? "100%" : isTechnical ? "100%" : "70%"} justifyContent="center">
                <Box width={"95%"} maxWidth={{ md: isFullpage ? "100%" : isTechnical ? "90%" : "800px", lg: isFullpage ? "100%" : isTechnical ? "80%" : "800px", xl: isFullpage ? "100%" : isTechnical ? "70%" : "800px" }}>
                    <Outlet />
                </Box>
            </Flex>
        </Flex>
    );
};

export default RegisterPagesWrapper;
