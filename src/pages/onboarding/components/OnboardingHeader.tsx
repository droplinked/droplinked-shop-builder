import { Flex, Image } from '@chakra-ui/react'
import React from 'react'
import Stepper from './Stepper'
import AppIcons from 'assets/icon/Appicons'

function OnboardingHeader() {
    return (
        <>
            <AppIcons.Droplinked />
            <Stepper />
        </>
    )
}

export default OnboardingHeader