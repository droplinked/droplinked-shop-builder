import { Divider } from "@chakra-ui/react";
import React from "react";
import CustomerExperience from "./components/customer-experience/CustomerExperience";
import Preferences from "./components/preferences/Preferences";
import StoreDetails from "./components/store-details/StoreDetails";

function General() {
    return (
        <>
            <StoreDetails />
            <Divider borderColor={"neutral.gray.800"} />
            <Preferences />
            <Divider borderColor={"neutral.gray.800"} />
            <CustomerExperience />
        </>
    );
}

export default General;
