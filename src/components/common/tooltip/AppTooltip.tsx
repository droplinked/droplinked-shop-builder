import { Tooltip, TooltipProps } from '@chakra-ui/react'
import React from 'react'

function AppTooltip(props: TooltipProps) {
    return (
        <Tooltip
            backgroundColor="#292929"
            padding="4px 16px"
            color="#C2C2C2"
            borderRadius="6px"
            border={"1px solid #3C3C3C"}
            placement='auto-start'
            {...props}
        />
    )
}

export default AppTooltip