import { Box } from '@chakra-ui/react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import classes from "./style.module.scss"

function Effects() {
    const { isRTL } = useLocaleResources("homePage")

    return (
        <Box position={"absolute"} inset={0}>
            <Box
                className={`${classes.shape} ${classes.shape1}`}
                fontSize={{ base: "400px", lg: "700px" }}
                top="0"
                left={isRTL ? "unset" : "200px"}
                right={isRTL ? "200px" : "unset"}
            >
                s
            </Box>
            <Box
                className={`${classes.shape} ${classes.shape2}`}
                fontSize={{ base: "400px", lg: "1400px" }}
                top="200px"
                left={{ base: "0", lg: isRTL ? "unset" : "-210px" }}
                right={{ base: "0", lg: isRTL ? "-210px" : "unset" }}
            >
                s
            </Box>
        </Box>
    )
}

export default Effects