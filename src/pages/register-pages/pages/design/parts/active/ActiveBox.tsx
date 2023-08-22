import { Box, BoxProps } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import React from 'react'

interface Iprops {
    children: any
    active: boolean
    props?: BoxProps
}

function ActiveBox({ children, active, props }: Iprops) {
    return (
        <Box position={"relative"} {...active && { border: "3px solid #2EC99E" }} {...props}>
            {active && <AppIcons.ActiveIcon style={{position: "absolute", top: "0",left: "0", margin: "5px"}} />}
            {children}
        </Box>
    )
}

export default ActiveBox