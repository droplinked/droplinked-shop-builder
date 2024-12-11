import { Text, TextProps } from '@chakra-ui/react'
import React, { PropsWithChildren } from 'react'

interface Props extends TextProps, PropsWithChildren { }

function ErrorMessage({ children, ...rest }: Props) {
    return (
        <Text fontSize={14} color="#E53E3E" {...rest}>{children}</Text>
    )
}

export default ErrorMessage