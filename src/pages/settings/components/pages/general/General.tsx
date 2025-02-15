import { Box, Divider } from "@chakra-ui/react";
import React from "react";
import CustomerExperience from "./components/customer-experience/CustomerExperience";
import StoreDetails from "./components/store-details/StoreDetails";

function General() {
    return (
        <>
            <Box px={{ base: 4, md: 6 }}>
                {/* TODO: Instead of using Box here, move the `px={{ base: 4, md: 6 }}` to the SectionContainer component. */}
                {/* TODO: If the padding is variable in different situations or places, consider extending SectionContainer's props from `FlexProps` to customize it in different parts of the website. */}
                <StoreDetails />
            </Box>
            <Divider borderColor={"#292929"} />
            <Box px={{ base: 4, md: 6 }}>
                {/* TODO: Same as above, move padding prop to SectionContainer for better maintainability. */}
                <CustomerExperience />
            </Box>
        </>
    );
}

export default General;
