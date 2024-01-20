import { Box, BoxProps } from '@chakra-ui/react';
import React from 'react'
import classes from './style.module.scss'

interface Iprops extends BoxProps {
    scrollbarHide?: boolean
}
function AppScrollBar(props: Iprops) {
    return (
        <Box className={`${classes.scroll} ${props.scrollbarHide ? classes.scrollbarHide : ''}`} {...props}>{props.children}</Box>
    )
}

export default AppScrollBar