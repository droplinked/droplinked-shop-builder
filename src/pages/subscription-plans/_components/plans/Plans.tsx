import { SimpleGrid } from "@chakra-ui/react";
import React from "react";
import PlansTableCard from "./plans.table.card";

const Plans = () => {
    return (
        <SimpleGrid
            columns={{ base: 1, md: 2, xl: 4 }}
            gap={{ lg: 8, md: 6 }}
        >
            <PlansTableCard plan="starter" />
            <PlansTableCard plan="business" />
            <PlansTableCard plan="premium" />
            <PlansTableCard plan="enterprise" />
        </SimpleGrid>
    )
}

export default Plans
