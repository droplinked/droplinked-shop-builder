import { Link as ChakraLink, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { NavLink, useMatch } from 'react-router-dom'

interface Props {
    link: any
    onCloseAll: () => void
}

export default function PlatformLink({ link, onCloseAll }: Props) {
    const isActive = useMatch(link.href)

    return (
        <ChakraLink
            as={NavLink}
            to={link.href}
            display="flex"
            gap={2}
            borderRadius={12}
            padding={3}
            onClick={onCloseAll}
            backgroundColor={isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent'}
        >
            {link.icon && React.cloneElement(link.icon({ color: isActive ? '#2bcfa1' : '#fff' }))}
            <Flex direction="column" gap={1}>
                <Text fontSize={16} fontWeight={isActive ? 500 : 400} color={isActive ? 'text.primary' : 'text.white'}>{link.label}</Text>
                <Text fontSize={14} color='text.white'>{link.description}</Text>
            </Flex>
        </ChakraLink>
    )
} 