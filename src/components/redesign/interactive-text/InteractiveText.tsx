import { Text, TextProps } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import { Link as RouterLink } from 'react-router-dom'

const interactiveTextStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: 14,
    fontWeight: 500,
    color: 'text.link',
    _hover: { textDecoration: 'underline' },
}

interface ButtonProps extends Omit<TextProps, 'as'> {
    onClick: () => void
    to?: never
}

interface LinkProps extends Omit<TextProps, 'as'> {
    to: string
    onClick?: never
}

type Props = (ButtonProps | LinkProps) & {
    iconLeft?: ReactNode
    iconRight?: ReactNode
}

function InteractiveText({ to, onClick, iconLeft, iconRight, children, ...textProps }: Props) {
    const Component: React.ElementType = to ? RouterLink : 'button'

    return (
        <Text
            as={Component}
            to={to}
            onClick={onClick}
            {...interactiveTextStyles}
            {...textProps}
        >
            {iconLeft}
            {children}
            {iconRight}
        </Text>
    )
}

export default InteractiveText