import { Box, Circle, HStack, useColorModeValue } from '@chakra-ui/react'
import React from "react"

interface StepperProps {
    currentStep: number // 0-based index of the current step
    totalSteps: number // Total number of steps (4 for Steps 4-7)
}

function Stepper({ currentStep, totalSteps }: StepperProps) {
    const activeColor = useColorModeValue('blue.500', 'blue.300')
    const inactiveColor = useColorModeValue('gray.300', 'gray.500')
    const textColor = useColorModeValue('gray.700', 'gray.200')

    function renderStep(index: number) {
        const isActive = index === currentStep
        const isCompleted = index < currentStep

        return (
            <HStack key={index} spacing={4} align="center">
                <Circle
                    size="8"
                    bg={isCompleted || isActive ? activeColor : inactiveColor}
                    color="white"
                    fontWeight="bold"
                >
                    {index + 1}
                </Circle>
                {index < totalSteps - 1 && (
                    <Box
                        flex="1"
                        h="2px"
                        bg={isCompleted ? activeColor : inactiveColor}
                    />
                )}
            </HStack>
        )
    }

    return (
        <HStack
            spacing={0}
            justify="center"
            width="full"
            maxW="container.sm"
        >
            {Array.from({ length: totalSteps }, (_, index) => renderStep(index))}
        </HStack>
    )
}

export default Stepper