import { TextProps } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import React from 'react';

interface Props extends TextProps {
    onClick: () => void;
    children?: React.ReactNode;
}

function TextButton({ onClick, children, ...props }: Props) {
    return (
        <AppTypography
            as={"button"}
            display={"flex"}
            alignItems={"center"}
            gap={2}
            textAlign={"center"}
            fontSize={14}
            color={"#2BCFA1"}
            cursor={"pointer"}
            userSelect={"none"}
            sx={{ "svg path": { "stroke": "#2BCFA1" } }}
            onClick={onClick}
            {...props}
        >
            {children}
        </AppTypography >
    )
}

export default TextButton