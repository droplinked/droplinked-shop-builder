import { FlexProps, Flex, Box } from '@chakra-ui/react'
import React from 'react'
import classes from './style.module.scss'

interface IProps extends FlexProps { }

function MainCard(props: IProps) {
    return (
        <Flex className={classes.box} flexDirection="column" backdropFilter="blur(20px)" gap="10px" borderRadius="24px" background="rgba(62, 62, 62, 0.3)" padding="40px 40px" maxWidth="267px" width="24%" {...props}>
            {props.children}
        </Flex>
    )
}

export default MainCard