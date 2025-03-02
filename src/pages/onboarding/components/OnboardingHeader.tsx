import { Image, VStack } from '@chakra-ui/react'
import React from 'react'
import Stepper from './Stepper'

function OnboardingHeader() {
    return (
        <VStack spacing={6} mb={8}>
            <Image
                src="/logo.png"
                alt="Website Logo"
                maxH="60px"
                objectFit="contain"
            />
            <Stepper />
        </VStack>
    )
}

export default OnboardingHeader