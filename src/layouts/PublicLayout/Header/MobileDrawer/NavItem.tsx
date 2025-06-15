import { Box, Link as ChakraLink, Flex, Text } from '@chakra-ui/react'
import { ChevronrightMd } from 'assets/icons/Navigation/ChevronRight/ChevronrightMd'
import React from 'react'
import { NavLink } from 'react-router-dom'

const activeStateStyles = {
    borderColor: "neutral.gray.900",
    bgColor: "neutral.background",
    '.icon-wrapper': { opacity: 1 }
}

export const navItemStyles = {
    display: "flex",
    alignItems: "center",
    gap: 2,
    border: "1px solid transparent",
    borderRadius: 12,
    padding: 3,
    fontSize: 16,
    fontWeight: 500,
    color: "text.white",
    _hover: activeStateStyles,
    _activeLink: activeStateStyles
}

export interface NavItemProps {
    icon?: React.ReactNode
    label: string
    onClick?: () => void
    to?: string
}

export const NavItem = ({ icon, label, onClick, to }: NavItemProps) => {
    const content = (
        <>
            <Flex flex={1} alignItems="center" gap={2}>
                {icon}
                {label}
            </Flex>
            <Box className='icon-wrapper' opacity={0} transition="opacity 0.2s">
                <ChevronrightMd color='#fff' />
            </Box>
        </>
    )

    if (to) return (
        <ChakraLink
            as={NavLink}
            to={to}
            textDecoration="none"
            {...navItemStyles}
            onClick={onClick}
        >
            {content}
        </ChakraLink>
    )

    return <Text as="button" {...navItemStyles} onClick={onClick}>{content}</Text>
} 