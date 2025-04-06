import { Flex, Text } from '@chakra-ui/react'
import { AvailableoutlinedSm } from 'assets/icons/Sign/AvailableOutlined/AvailableoutlinedSm'
import React from 'react'

export default function PlanFeatures({ features }: { features: string[] }) {
    return (
        <Flex flexDirection="column" gap={4}>
            {
                features.map((feature, index) => (
                    <Flex gap={2} key={index}>
                        <AvailableoutlinedSm color='#fff' />
                        <Text fontSize={14} color="#fff">{feature}</Text>
                    </Flex>
                ))
            }
        </Flex>
    )
}
