import { Box, BoxProps } from '@chakra-ui/react'
import React, { useEffect } from 'react'

interface Props extends BoxProps {
    isOpen: boolean
    lockBodyScroll?: boolean
}

export default function SlideDrawer({ isOpen, children, lockBodyScroll = true, ...rest }: Props) {
    useEffect(() => {
        if (lockBodyScroll) {
            document.body.style.overflow = isOpen ? 'hidden' : 'unset'
            return () => {
                document.body.style.overflow = 'unset'
            }
        }
    }, [isOpen, lockBodyScroll])

    const getPosition = () => {
        const isRight = true
        return {
            [isRight ? 'right' : 'left']: isOpen ? "0" : "-100%"
        }
    }

    return (
        <Box
            position="fixed"
            bottom={0}
            transition="0.4s"
            backgroundColor="neutral.websiteBackground"
            zIndex={10}
            {...getPosition()}
            {...rest}
        >
            {children}
        </Box>
    )
} 