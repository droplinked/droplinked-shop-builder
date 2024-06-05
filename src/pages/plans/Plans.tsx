import { HStack } from "@chakra-ui/react";
import React from "react";
import PlansTableCard from "./plans.table.card";

const Plans = () => {
    return (
        <HStack alignItems={"flex-start"} alignSelf={"stretch"} height={"full"}>
            <PlansTableCard plan="starter" />
            <PlansTableCard plan="business" />
            <PlansTableCard plan="premium" />
            <PlansTableCard plan="enterprise" />
        </HStack>
    );
};

export default Plans;
