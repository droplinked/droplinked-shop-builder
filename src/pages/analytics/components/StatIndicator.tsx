import { FlexProps, Text } from "@chakra-ui/react"
import DotSeparatedList from "components/redesign/dotSeparatedList/DotSeparatedList"
import React, { PropsWithChildren } from "react"

interface StatIndicatorProps extends FlexProps, PropsWithChildren {
    percentage: number
}

function StatIndicator({ percentage, children, ...rest }: StatIndicatorProps) {
    return (
        <DotSeparatedList>
            <Text fontSize={14} color="neutral.white">{percentage.toFixed(2)}%</Text>
            {children}
        </DotSeparatedList>
    )
}

export default StatIndicator