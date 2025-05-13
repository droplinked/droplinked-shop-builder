import { Box, Center } from '@chakra-ui/react'
import React, { PropsWithChildren } from 'react'

/**
 * ModalHeaderIconWrapper Component - Stylized container for modal icons
 * 
 * Creates a visually distinctive icon container with a rotated white accent
 * element and a semi-transparent backdrop for use in modal headers.
 * 
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Icon element to display within the wrapper
 */
function ModalHeaderIconWrapper({ children }: PropsWithChildren) {
    return (
        <Box position="relative" borderRadius="8px">
            <Box
                position="absolute"
                top={-1}
                right={-1}
                w={12}
                h={12}
                bg="white"
                transform="rotate(15deg)"
                borderRadius="inherit"
            />
            <Center
                w={12}
                h={12}
                borderRadius="inherit"
                border="1px solid #FFF"
                bg="rgba(0, 0, 0, 0.75)"
                backdropFilter="blur(8px)"
            >
                {children}
            </Center>
        </Box>
    )
}

export default ModalHeaderIconWrapper