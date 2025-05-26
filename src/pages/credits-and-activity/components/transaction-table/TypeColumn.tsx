import { Flex } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'

interface Props {
    amountType: string
    type: string
}

export default function TypeColumn({ amountType, type }: Props) {
    const isInbound = amountType === "INCREASE"

    return (
        <Flex gap={4} alignItems="center">
            <Flex p="6px" borderRadius="8px" bg={isInbound ? "#2bcfa11a" : "#ff22440d"} border={`1px solid ${isInbound ? "#2bcfa11a" : "#ff224426"}`}>
                {isInbound && <AppIcons.ArrowDownOutlined color='#2BCFA1' width="20px" height="20px" />}
                {!isInbound && <AppIcons.ArrowUp color='#FF2244' width="20px" height="20px" />}
            </Flex>
            <AppTypography color="#fff" fontSize={16}>{type}</AppTypography>
        </Flex>
    )
}
