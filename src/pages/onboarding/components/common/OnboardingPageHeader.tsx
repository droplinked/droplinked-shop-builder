import { Flex, FlexProps } from "@chakra-ui/react"
import React from "react"
import DroplinkedBrand from "./DroplinkedBrand"
import Stepper from "./stepper/Stepper"

function OnboardingPageHeader({ ...props }: FlexProps) {
    return (
        <Flex
            flexDirection={{ base: 'row', lg: 'column' }}
            justifyContent={{ base: 'space-between', lg: 'center' }}
            gap={{ base: 0, lg: 12 }}
            {...props}
        >
            <DroplinkedBrand />
            <Stepper />
        </Flex>
    )
}

export default OnboardingPageHeader