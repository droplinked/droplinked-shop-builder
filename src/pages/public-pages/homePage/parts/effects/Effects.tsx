import { Box } from '@chakra-ui/react'
import React, { useState } from 'react'
import classes from "./style.module.scss"

function Effects() {
    const [isPauesd, setPaused] = useState(false)

    return (
        <Box position={"absolute"} inset={0}>
            <Box className={`${classes.shape} ${classes.shape1} ${isPauesd ? classes.animationPaused : ''}`} fontSize={{ base: "400px", lg: "700px" }} top={"0"} right={"200px"}>s</Box>
            <Box className={`${classes.shape} ${classes.shape2} ${isPauesd ? classes.animationPaused : ''}`} fontSize={{ base: "400px", lg: "1400px" }} top="200px" left={{ base: "0", lg: "-210px" }}>s</Box>
        </Box>
    )
}

export default Effects