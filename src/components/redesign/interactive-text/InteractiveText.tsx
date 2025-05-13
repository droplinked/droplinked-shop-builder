import { Text, TextProps } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import { Link as RouterLink } from 'react-router-dom'

/**
 * InteractiveText Component - Text that functions as button or link
 * 
 * A versatile component that renders as either a button or a router link
 * based on props, with consistent styling and optional left/right icons.
 * 
 * @param {object} props - Component props
 * @param {string} [props.to] - URL for router link mode (makes component a link)
 * @param {function} [props.onClick] - Click handler for button mode (makes component a button)
 * @param {ReactNode} [props.iconLeft] - Icon to display before the text
 * @param {ReactNode} [props.iconRight] - Icon to display after the text
 * @param {React.ReactNode} props.children - Text content to display
 * @param {TextProps} props - Additional Chakra UI text props
 */
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
    target?: "_blank" | "_self"
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