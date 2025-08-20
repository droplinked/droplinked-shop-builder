import { Box, Flex, Text } from '@chakra-ui/react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import localAr from 'locales/public-pages/landings/homePage/ar.json'
import localEn from 'locales/public-pages/landings/homePage/en.json'
import React from 'react'

interface StepData {
    title: string
    description: string
}

interface StepTextsProps {
    currentStep: number
}

export default function StepTexts({ currentStep }: StepTextsProps) {
    const { t } = useLocaleResources('homePage', { en: localEn, ar: localAr })

    const stepData: StepData[] = t('steps', { returnObjects: true }) as StepData[]

    return (
        <Flex
            width="100%"
            direction={{ base: "column", md: "row" }}
            justifyContent="space-between"
            alignItems={{ base: "flex-start", md: "center" }}
            gap={{ base: 4, md: 8 }}
            mt={{ base: 0, md: 6 }}
            px={{ base: 4, md: 0 }}
        >
            {stepData.map((step, index) => {
                const stepNumber = `0${index + 1}`
                const isActive = (index + 1) === currentStep

                return (
                    <Flex
                        key={stepNumber}
                        flex="1"
                        flexDirection={{ base: "column", "xl": "row" }}
                        alignItems="flex-start"
                        gap={{ base: 2, lg: 3 }}
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
