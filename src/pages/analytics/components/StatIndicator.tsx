import { FlexProps, Text } from "@chakra-ui/react"
import CircleSeparatorList from "components/redesign/circleSeparatorList/CircleSeparatorList"
import React, { PropsWithChildren } from "react"

interface StatIndicatorProps extends FlexProps, PropsWithChildren {
    percentage: number
}

function StatIndicator({ percentage, children, ...rest }: StatIndicatorProps) {
    return (
        <CircleSeparatorList>
            <Text fontSize={14} color="#FFF">{percentage.toFixed(2)}%</Text>
            {children}
        </CircleSeparatorList>
    )
}

export default StatIndicator