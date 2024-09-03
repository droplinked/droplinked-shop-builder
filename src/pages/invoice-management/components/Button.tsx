import { ButtonProps, Button as ChakraButton } from '@chakra-ui/react'
import React from 'react'

interface Props extends ButtonProps {
    onClick: () => void
}

function Button({ onClick, children, ...props }: Props) {
    return (
        <ChakraButton
            flexShrink={0}
            display={"flex"}
            alignItems={"center"}
            gap={"6px"}
            borderRadius={8}
            paddingBlock={3}
            paddingInline={4}
            bgColor={"#2BCFA1"}
            color={"black"}
            onClick={onClick}
            _hover={{}}
            _active={{}}
            sx={{
                "p": {
                    fontSize: "14px",
                    fontWeight: "500"
                }
            }}
            {...props}
        >
            {children}
        </ChakraButton>
    )
}

export default Button