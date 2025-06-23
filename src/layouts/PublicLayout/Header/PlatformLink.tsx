import { Box, Link as ChakraLink, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { NavLink, useMatch } from 'react-router-dom'

interface Props {
    link: any
    onNavigate: () => void
}

export default function PlatformLink({ link, onNavigate }: Props) {
    const isActive = useMatch(link.href)

    return (
        <ChakraLink
            as={NavLink}
            to={link.href}
            padding={3}
            border="1px solid"
            borderColor={isActive ? 'neutral.gray.800' : 'transparent'}
            borderRadius={12}
            position="relative"
            display="flex"
            gap={2}
            overflow="hidden"
            backgroundColor={isActive ? 'neutral.gray.1000' : 'transparent'}
            transition="all 0.3s ease-in-out"
            _hover={{
                borderColor: 'neutral.gray.800',
                backgroundColor: 'neutral.gray.1000'
            }}
            onClick={onNavigate}
        >
            {link.icon && React.cloneElement(link.icon({ color: isActive ? '#2bcfa1' : '#fff' }))}
            <Flex direction="column" gap={1}>
                <Text
                    fontSize={16}
                    fontWeight={isActive ? 500 : 400}
                    color={isActive ? 'text.primary' : 'text.white'}
                >
                    {link.label}
                </Text>
                <Text fontSize={14} color='text.white'>{link.description}</Text>
            </Flex>

            {isActive && (
                <Box
                    position="absolute"
                    width="32px"
                    height="32px"
                    left="-16px"
                    bottom="-16px"
                    borderRadius="24px"
                    backgroundColor="var(--Main-Primary, #2BCFA1)"
                    filter="blur(40px)"
                />
            )}
        </ChakraLink>
    )
} 