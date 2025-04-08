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
            color="text.link"
            _disabled={{ color: "neutral.gray.650" }}
            _hover={{ bg: "none" }}
            sx={{
                ".chakra-button__icon": { margin: 0 }
            }}
            {...rest}
        >
            {children}
        </Button>
    )
}

export default BlueButton