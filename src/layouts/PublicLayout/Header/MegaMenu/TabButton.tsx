import { Box, Flex, Text } from '@chakra-ui/react'
import IconWrapper from 'components/redesign/icon-wrapper/IconWrapper'
import React from 'react'

interface TabButtonProps {
    item: {
        label: string
        icon: (props: { color: string }) => React.ReactElement
    }
    isActive: boolean
    onClick: () => void
}

export default function TabButton({ item, isActive, onClick }: TabButtonProps) {
    return (
        <Flex
            as="button"
            position="relative"
            alignItems="center"
            gap={3}
            border="1px solid"
            borderRadius={12}
            padding={3}
            borderColor={isActive ? "neutral.gray.900" : "transparent"}
            backgroundColor={isActive ? 'neutral.background' : 'transparent'}
            transition="all 0.3s ease-in-out"
            overflow="hidden"
            _hover={{
                borderColor: "neutral.gray.900",
                backgroundColor: 'neutral.background'
            }}
            onClick={onClick}
        >
            <IconWrapper
                icon={React.cloneElement(item.icon({
                    color: isActive ? '#2bcfa1' : '#fff',
                }))}
                {...(isActive && {
                    borderColor: "label.primary",
                    bgColor: "label.primary"
                })}
            />

            <Text
                fontWeight={isActive ? 500 : 400}
                color={isActive ? 'text.primary' : 'text.white'}
            >
                {item.label}
            </Text>

            {/* Active indicator bar - only visible when active */}
            {isActive && (
                <Box
                    position="absolute"
                    right={0}
                    w="3px"
                    height="48px"
                    borderRadius={8}
                    bgColor="main.primary"
                    border="1px solid"
                    borderColor="rgba(43, 207, 161, 0.10)"
                    filter="blur(1px)"
                />
            )}

            {/* Blur effect box - only visible when active */}
            {isActive && (
                <Box
                    position="absolute"
                    w="32px"
                    height="32px"
                    right="-16px"
                    borderRadius="24px"
                    bgColor="main.primary"
                    filter="blur(20px)"
                />
            )}
        </Flex>
    )
} 