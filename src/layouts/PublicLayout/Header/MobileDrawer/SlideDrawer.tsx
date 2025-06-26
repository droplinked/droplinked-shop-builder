import { Box, BoxProps } from '@chakra-ui/react'
import React, { useEffect } from 'react'

interface Props extends BoxProps {
    isOpen: boolean
    lockBodyScroll?: boolean
}

export default function SlideDrawer({ isOpen, children, lockBodyScroll = true, ...rest }: Props) {
    useEffect(() => {
        if (lockBodyScroll) {
            const openDrawers = document.querySelectorAll('.slide-drawer.open')
            const shouldLockScroll = openDrawers.length > 0

            document.body.style.overflow = shouldLockScroll ? 'hidden' : 'unset'

            return () => {
                const remainingOpenDrawers = document.querySelectorAll('.slide-drawer.open')
                if (remainingOpenDrawers.length === 0) {
                    document.body.style.overflow = 'unset'
                }
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
            className={`slide-drawer ${isOpen ? 'open' : 'closed'}`}
            position="fixed"
            bottom={0}
            transition="0.3s ease-in-out"
            backgroundColor="neutral.websiteBackground"
            zIndex={10}
            {...getPosition()}
            {...rest}
        >
            {children}
        </Box>
    )
} 