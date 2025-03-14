import { Flex } from "@chakra-ui/react";
import React from "react";
import DroplinkedBrand from "./DroplinkedBrand";
import Stepper from "./stepper/Stepper";

function OnboardingPageHeader() {
    return (
        <Flex
            flexDirection={{ base: 'row', lg: 'column' }}
            gap={{ base: 0, lg: 12 }}
            justifyContent={{ base: 'space-between', lg: 'center' }}
        >
            <DroplinkedBrand />
            <Stepper />
        </Flex>
    )
}

export default OnboardingPageHeader