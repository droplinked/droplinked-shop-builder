import { FlexProps, Flex } from '@chakra-ui/react'
import React from 'react'
import classes from './style.module.scss'

interface IProps extends FlexProps { }

function MainCard(props: IProps) {
    return (
        <Flex
            width={{ base: "46%", md: "25%", xl: "285px" }}
            flexDirection="column"
            backdropFilter="blur(20px)"
            gap={"12px !important"}
            borderRadius={{ base: "12px", md: "24px" }}
            background="rgba(62, 62, 62, 0.3)"
            padding={{ base: "25px 10px", lg: "40px 10px" }}
            marginBottom="20px"
            {...props}
            className={classes.box}
        >
            {props.children}
        </Flex>
    )
}

export default MainCard