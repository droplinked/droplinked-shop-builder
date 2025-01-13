import { Button, ButtonProps } from '@chakra-ui/react'
import React from 'react'

function BlueButton({ children, ...rest }: ButtonProps) {
    return (
        <Button
            display="flex"
            alignItems="center"
            gap={1}
            padding="8px 12px"
            bg="none"
            fontSize={12}
            fontWeight={500}
            color="#179EF8"
            _hover={{ bg: "none" }}
            {...rest}
        >
            {children}
        </Button>
    )
}

export default BlueButton