import { Flex, FlexProps } from '@chakra-ui/react'
import React from 'react'

interface Props extends FlexProps {
    children: any;
    gap?: number;
}

function Container({ children, gap = 9, ...props }: Props) {
    return (
        <Flex
            direction={"column"}
            gap={gap}
            padding={{ base: 7, lg: 9 }}
            borderRadius={16}
            border={"1px solid rgb(255, 255, 255 , 0.3)"}
            background={"linear-gradient(155deg, rgba(255, 255, 255, 0.00) -2.13%, rgba(255, 255, 255, 0.15) 136.58%)"}
            boxShadow={"0px 4.282px 52.456px 0px rgba(0, 7, 72, 0.12)"}
            {...props}
        >
            {children}
        </Flex>
    )
}

export default Container