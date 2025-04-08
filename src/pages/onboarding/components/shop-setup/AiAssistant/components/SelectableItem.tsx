import { Flex, Text } from '@chakra-ui/react'
import { AiCategory } from 'pages/onboarding/constants/categories'
import React from 'react'

interface Props {
    item: AiCategory
    isSelected: boolean
    onClick: () => void
}

export default function SelectableItem({ item, isSelected, onClick }: Props) {
    const border = isSelected ? "1.5px solid #2BCFA1" : "1.5px solid #292929"
    const color = isSelected ? "#2BCFA1" : "#fff"
    const background = isSelected ? "rgba(43, 207, 161, 0.10)" : "transparent"

    return (
        <Flex
            background={background}
            paddingInline={4}
            paddingBlock={3}
            borderRadius={8}
            onClick={onClick}
            border={border}
            alignItems="center"
            gap={3}
            cursor="pointer"
            transition="all 0.3s ease"
        >
            {item?.icon && <item.icon color={color} />}
            <Text
                color={color}
                fontSize={{ base: 14, md: 16 }}
                fontWeight={400}
                transition="color 0.3s ease"
            >
                {item?.title}
            </Text>
        </Flex>
    )
}
