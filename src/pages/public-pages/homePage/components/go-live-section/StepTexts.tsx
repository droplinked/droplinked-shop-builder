import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'

interface StepData {
    title: string
    description: string
}

const stepData: StepData[] = [
    {
        title: "Join and Launch with AI",
        description: "Pick your niche. AI builds your branded store theme, logo, colors and domain to get you ready to sell in minutes"
    },
    {
        title: "Automated Setup",
        description: "Import or create physical or digital products in a snap. AI optimizes titles, descriptions, and SEO to boost sales"
    },
    {
        title: "Accept Payments",
        description: "Connect global payment gateways. Accept cash and crypto. Automations handle orders so you scale faster"
    }
]

interface StepTextsProps {
    currentStep: number
}

export default function StepTexts({ currentStep }: StepTextsProps) {
    return (
        <Flex
            width="100%"
            direction={{ base: "column", md: "row" }}
            justifyContent="space-between"
            alignItems={{ base: "flex-start", md: "center" }}
            gap={{ base: 4, md: 8 }}
            mt={6}
            px={{ base: 4, md: 0 }}
        >
            {stepData.map((step, index) => {
                const stepNumber = index + 1
                const isActive = stepNumber === currentStep

                return (
                    <Flex
                        key={stepNumber}
                        flex="1"
                        alignItems="flex-start"
                        gap={3}
                        transition="opacity 0.3s ease"
                    >
                        <Text
                            fontSize={{ base: "16px", lg: "18px" }}
                            fontWeight="400"
                            color={isActive ? "text.primary" : "text.disabled.dark"}
                            minW="fit-content"
                            transition="color 1s ease"
                        >
                            {stepNumber}
                        </Text>
                        <Box>
                            <Text
                                fontSize={{ base: "16px", lg: "20px" }}
                                fontWeight="500"
                                color={isActive ? "text.white" : "text.subtext.placeholder.dark"}
                                mb={1}
                                transition="color 1s ease"
                            >
                                {step.title}
                            </Text>
                            <Text
                                fontSize={{ base: "14px", lg: "16px" }}
                                color={isActive ? "text.subtext.placeholder.light" : "text.disabled.dark"}
                                transition="color 1s ease"
                            >
                                {step.description}
                            </Text>
                        </Box>
                    </Flex>
                )
            })}
        </Flex>
    )
}
