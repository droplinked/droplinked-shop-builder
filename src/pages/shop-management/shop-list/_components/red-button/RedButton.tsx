import { Button, ButtonProps } from '@chakra-ui/react'
import React, { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren, ButtonProps { }

function RedButton({ children }: Props) {
    return (
        <Button
            minWidth={"160px"}
            border={"1px solid #E63F43"}
            borderRadius={6}
            bgColor={"#E63F43"}
            fontWeight={500}
            color={"white"}
            _hover={{ bgColor: "transparent", color: "#E63F43" }}
        >
            {children}
        </Button>
    )
}

export default RedButton