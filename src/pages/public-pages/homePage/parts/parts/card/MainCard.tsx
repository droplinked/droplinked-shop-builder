import { FlexProps, Flex } from '@chakra-ui/react'
import React from 'react'
import classes from './style.module.scss'

interface IProps extends FlexProps { }

function MainCard(props: IProps) {
    return (
        <Flex className={classes.box} flexDirection="column" backdropFilter="blur(20px)" gap="10px" borderRadius={{ base: "12px", md: "24px" }} background="rgba(62, 62, 62, 0.3)" padding={{ base: "15px", lg: "40px" }} marginBottom="20px" maxWidth="267px" width={{ base: "45%", md: "24%" }} {...props}>
            {props.children}
        </Flex>
    )
}

export default MainCard