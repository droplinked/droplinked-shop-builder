import { Text, TextProps } from '@chakra-ui/react'
import React from 'react'

interface Props extends TextProps {
    label: string
}

const ActionButton = ({ label, ...rest }: Props) => (
    <Text
        as="button"
        fontSize={14}
        fontWeight={500}
        {...rest}
    >
        {label}
    </Text>
)

export default ActionButton