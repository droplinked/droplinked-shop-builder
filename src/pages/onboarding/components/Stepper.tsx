import { Text } from '@chakra-ui/react'
import React from "react"
import { useOnboarding } from '../hooks/useOnboarding'

function Stepper() {
    const { currentStep } = useOnboarding()

    return (
        <Text color="#FFF">{currentStep}</Text>
    )
}

export default Stepper