import { ButtonProps, Button as ChakraButton } from '@chakra-ui/react';
import React from 'react';

interface Props extends ButtonProps {
    onClick?: () => void;
    variant?: 'primary' | 'ghost';
}

function Button({ onClick, variant = 'primary', children, ...props }: Props) {
    const isPrimary = variant === 'primary'

    return (
        <ChakraButton
            variant={variant}
            flexShrink={0}
            display={"flex"}
            alignItems={"center"}
            gap={"6px"}
            border={`1px solid ${isPrimary ? "#2BCFA1" : "#616161"}`}
            borderRadius={8}
            paddingBlock={3}
            paddingInline={4}
            bgColor={isPrimary ? "#2BCFA1" : "transparent"}
            color={isPrimary ? "black" : "white"}
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