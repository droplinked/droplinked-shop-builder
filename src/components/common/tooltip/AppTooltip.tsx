import { Tooltip, TooltipProps } from '@chakra-ui/react'
import React from 'react'

interface IProps extends TooltipProps { }
function AppTooltip(props: IProps) {
    return (
        <Tooltip backgroundColor="#292929" padding="5px 15px" color="#C2C2C2" borderRadius="100px" placement='auto-start' {...props}></Tooltip>
    )
}

export default AppTooltip