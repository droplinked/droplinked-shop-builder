import { Flex, Text } from '@chakra-ui/react'
import { Plan } from 'pages/onboarding/constants/plans'
import React from 'react'

interface Props {
    item: Plan
    isSelected: boolean
    onClick: () => void
}

export default function PlansItems({ item, isSelected, onClick }: Props) {
    const border = isSelected ? "1.5px solid #2BCFA1" : "1.5px solid #292929"
    const color = isSelected ? "#2BCFA1" : "#fff"
    const background = isSelected ? "rgba(43, 207, 161, 0.10)" : "transparent"

    return (
        <Flex
            background={background}
            paddingInline={4}
            paddingBlock={{ base: 3, lg: 4 }}
            borderRadius={8}
            onClick={onClick}
            border={border}
            alignItems="center"
            justifyContent="space-between"
            width="100%"
            cursor="pointer"
            transition="all 0.3s ease"
        >
            <Text
                color={color}
                fontSize={14}
                fontWeight={500}
                transition="color 0.3s ease"
            >
                {item.title}
            </Text>
            <Flex alignItems="end" gap="6px">
                <Text
                    textDecoration="line-through"
                    color={item.hasDiscount ? "#F24" : "#fff"}
                    fontSize={12}
                    transition="color 0.3s ease"
                >
                    {item.hasDiscount && `$${item.price}`}
                </Text>
                <Text
                    color="#fff"
                    fontSize={14}
                    fontWeight={500}
                    transition="color 0.3s ease"
                >
                    {item.isFree ? "Free" : `$${item.priceByDiscount}`}
                </Text>
            </Flex>
        </Flex>
    )
}
