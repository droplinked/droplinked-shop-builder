import { Flex, Text } from '@chakra-ui/react'
import { plans } from 'pages/onboarding/constants/plans'
import React from 'react'
import PlansItems from './PlansItems'

interface Props {
    selectedPlan: string
    setSelectedPlan: (value: string) => void
}

export default function PlanList({ selectedPlan, setSelectedPlan }: Props) {
    return (
        <Flex
            flexDirection="column"
            gap={6}
            padding={{ base: 4, md: "48px !important" }}
        >
            <Text color="#fff" fontSize={16}>Billing Cycle</Text>
            <Flex width="100%" flexDirection="column" gap={4} userSelect="none">
                {plans.map((item, index) => (
                    <PlansItems
                        key={index}
                        item={item}
                        isSelected={selectedPlan === item.title}
                        onClick={() => setSelectedPlan(item.title)}
                    />
                ))}
            </Flex>
        </Flex>
    )
}
