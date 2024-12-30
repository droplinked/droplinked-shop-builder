import { Tooltip, TooltipProps } from '@chakra-ui/react'
import React from 'react'

function AppTooltip(props: TooltipProps) {
    return (
        <Tooltip
            backgroundColor="#292929"
            padding="4px 16px"
            color="#C2C2C2"
            borderRadius="100px"
            placement='auto-start'
            {...props}
        />
    )
}

export default AppTooltip