import { FlexProps, Flex } from '@chakra-ui/react'
import React from 'react'

interface IProps extends FlexProps { }

function MainCard(props: IProps) {
    return (
        <Flex flexDirection="column" gap="10px" border="2px solid #464646" background="rgba(139, 139, 139, 0.1)" borderRadius="24px" padding="30px" {...props}>{props.children}</Flex>
    )
}

export default MainCard