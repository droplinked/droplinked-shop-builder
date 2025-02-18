import { Divider } from "@chakra-ui/react";
import React from "react";
import CustomerExperience from "./components/customer-experience/CustomerExperience";
import StoreDetails from "./components/store-details/StoreDetails";

function General() {
    return (
        <>
            <StoreDetails />
            <Divider borderColor={"#292929"} />
            <CustomerExperience />
        </>
    );
}

export default General;
