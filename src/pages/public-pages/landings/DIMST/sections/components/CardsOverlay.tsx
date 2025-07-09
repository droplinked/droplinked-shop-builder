import { Box, Flex, Text } from '@chakra-ui/react'
import IconWrapper from 'components/redesign/icon-wrapper/IconWrapper'
import React from 'react'

interface Props {
    title?: string
    icon?: React.ReactNode
    children?: React.ReactNode
}

export default function CardsOverlay({ title, icon, children }: Props) {
    return (
        <Flex flexDirection="column" gap={6} padding={{ base: 4, md: 6 }}>
            <Box>
                <IconWrapper icon={icon} />
                <Text mt={4} fontSize={{ base: 16, md: 20 }} fontWeight={500} color="text.white">{title}</Text>
            </Box>
            {children}
        </Flex>
    )
}
