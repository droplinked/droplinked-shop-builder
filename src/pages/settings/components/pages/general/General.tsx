import React from "react"
import StoreDetails from "./components/store-details/StoreDetails";
import CustomerExperience from "./components/customer-experience/CustomerExperience";
import { Box, Divider } from "@chakra-ui/react";

function General() {
    return (
        <>
            <Box px={{ base: 4, md: 6 }} >
                <StoreDetails />
            </Box>
            <Divider borderColor={"#292929"} />
            <Box px={{ base: 4, md: 6 }} >
                <CustomerExperience />
            </Box>
        </>
    );
}

export default General;
