import { Box, Center, Checkbox } from '@chakra-ui/react'
import React from 'react'

interface Props {
    isOpen: boolean
    onToggle: () => void
}

function HamburgerMenuButton({ isOpen, onToggle }: Props) {
    return (
        <>
            <Checkbox
                id="menu-toggle"
                display="none"
                isChecked={isOpen}
                onChange={onToggle}
            />
            <Center
                as="label"
                htmlFor="menu-toggle"
                display="flex"
                flexDirection="column"
                gap="4px"
                width={6}
                height={6}
                cursor="pointer"
            >
                <Box
                    width="18px"
                    height="2px"
                    borderRadius={8}
                    backgroundColor="neutral.white"
                    transition="all 0.3s ease-in-out"
                    transform={isOpen ? "translateY(6px) rotate(45deg)" : "none"}
                />
                <Box
                    width="18px"
                    height="2px"
                    borderRadius={8}
                    backgroundColor="neutral.white"
                    transition="all 0.3s ease-in-out"
                    opacity={isOpen ? 0 : 1}
                />
                <Box
                    width="18px"
                    height="2px"
                    borderRadius={8}
                    backgroundColor="neutral.white"
                    transition="all 0.3s ease-in-out"
                    transform={isOpen ? "translateY(-6px) rotate(-45deg)" : "none"}
                />
            </Center>
        </>
    )
}

export default HamburgerMenuButton 