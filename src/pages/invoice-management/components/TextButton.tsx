import { Button, ButtonProps } from '@chakra-ui/react';
import React from 'react';

interface Props extends ButtonProps {
    onClick: () => void;
    children?: React.ReactNode;
}

function TextButton({ onClick, children, ...props }: Props) {
    return (
        <Button
            height={"fit-content"}
            type='button'
            display={"flex"}
            alignItems={"center"}
            gap={2}
            padding={0}
            bg={"none"}
            fontSize={14}
            fontWeight={400}
            color={"#2BCFA1"}
            cursor={"pointer"}
            userSelect={"none"}
            sx={{ "svg path": { "stroke": "#2BCFA1" } }}
            onClick={onClick}
            _hover={{}}
            _focusVisible={{}}
            _active={{}}
            {...props}
        >
            {children}
        </Button>
    )
}

export default TextButton