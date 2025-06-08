import { Center, CenterProps } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

/**
 * IconWrapper Component - Container for displaying icons
 * 
 * Provides consistent styling for icons with a bordered square container
 * and proper centering. Standardizes icon display across the application.
 * 
 * @param {object} props - Component props
 * @param {ReactNode} props.icon - The icon to display in the wrapper
 * @param {CenterProps} props - Additional styling properties for the container
 */
interface Props extends CenterProps {
    icon: ReactNode
}

function IconWrapper({ icon, ...rest }: Props) {
    return (
        <Center
            width={12}
            height={12}
            border="1px solid"
            borderColor="neutral.gray.800"
            borderRadius={8}
            bg="neutral.gray.1000"
            {...rest}
        >
            {icon}
        </Center>
    )
}

export default IconWrapper