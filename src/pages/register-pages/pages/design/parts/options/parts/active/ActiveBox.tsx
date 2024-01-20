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
        <Box position={"relative"} borderRadius="8px" cursor="pointer" border={`3px solid ${active ? "#2EC99E" : "transparent"}`} {...props}>
            {/* {active && <AppIcons.ActiveIcon style={{ position: "absolute", top: "0", left: "0", margin: "5px" }} />} */}
            {children}
        </Box>
    )
}

export default ActiveBox