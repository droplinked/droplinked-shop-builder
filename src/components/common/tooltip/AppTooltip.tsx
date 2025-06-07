import { Tooltip, TooltipProps } from '@chakra-ui/react'
import React from 'react'

function AppTooltip(props: TooltipProps) {
    return (
        <Tooltip
            border="1px solid"
            borderColor={"neutral.gray.800"}
            borderRadius="6px"
            padding="4px 16px"
            backgroundColor="neutral.gray.1000"
            color="white"
            placement='auto-start'
            {...props}
        />
    )
}

export default AppTooltip