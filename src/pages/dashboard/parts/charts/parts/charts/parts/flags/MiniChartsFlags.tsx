import { Box, HStack } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'
import miniChartsFlagsModel from './model'

interface IProps {
    color: "green" | "purple" | 'yellow' | 'gold' | 'brown'
    caption: string
}
function MiniChartsFlags({ caption, color }: IProps) {
    return (
        <HStack flexWrap="nowrap">
            <Box width="8px" height="8px" borderRadius="100%" border={`2px solid ${miniChartsFlagsModel.colors[color]}`}></Box>
            <AppTypography fontSize="12px">{caption}</AppTypography>
        </HStack>
    )
}

export default MiniChartsFlags