import { Text, TextProps } from '@chakra-ui/react'
import React, { PropsWithChildren } from 'react'

/**
 * ErrorMessage Component - Displays error text with consistent styling
 * 
 * A simple text component with predefined styling for error messages,
 * using red color and appropriate font size.
 * 
 * @param {object} props - Component props extending Chakra UI's TextProps
 * @param {React.ReactNode} props.children - Content to display within the error message
 * @param {TextProps} props - Additional styling properties for the text
 */
interface Props extends TextProps, PropsWithChildren { }

function ErrorMessage({ children, ...rest }: Props) {
    return (
        <Text fontSize={14} color="#F24" {...rest}>{children}</Text>
    )
}

export default ErrorMessage