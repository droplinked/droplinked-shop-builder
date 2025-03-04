import { Flex } from '@chakra-ui/react'
import Drop3 from 'assets/brand-identity/Drop3'
import DroplinkedTypography from 'assets/brand-identity/DroplinkedTypography'
import React from 'react'
import Stepper from './Stepper'

function OnboardingHeader() {
    return (
        <>
            <Flex gap={3} alignItems={"center"}>
                <Drop3 color='#2BCFA1' width='36px' height='36px' />
                <DroplinkedTypography color='#2BCFA1' width='143px' height='27px' />
            </Flex>
            <Stepper />
        </>
    )
}

export default OnboardingHeader