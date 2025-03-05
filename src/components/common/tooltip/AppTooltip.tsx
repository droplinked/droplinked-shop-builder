import { Tooltip, TooltipProps } from '@chakra-ui/react'
import React from 'react'

function AppTooltip(props: TooltipProps) {
    return (
        <Tooltip
            border="1px solid"
            borderColor={"neutral.gray.700"}
            borderRadius="6px"
            padding="4px 16px"
            backgroundColor="neutral.gray.800"
            color="#C2C2C2"
            placement='auto-start'
            {...props}
        />
    )
}

export default AppTooltip