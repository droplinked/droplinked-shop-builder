import { Flex, ModalBody, Text } from '@chakra-ui/react'
import { plans } from 'pages/onboarding/constants/plans'
import React from 'react'
import PlansItems from './PlansItems'

interface Props {
    selectedPlan: string
    setSelectedPlan: (value: string) => void
}

export default function PlansModalBody({ selectedPlan, setSelectedPlan }: Props) {
    return (
        <ModalBody
            display="flex"
            flexDirection="column"
            gap={6}
            padding="48px !important"
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
        </ModalBody>
    )
}
