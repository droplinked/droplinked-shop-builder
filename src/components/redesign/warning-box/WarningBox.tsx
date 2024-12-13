import { Box, Flex, Text } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import React from 'react'

interface Props {
    title: string
    description: string
}

function WarningBox({ title, description }: Props) {
    return (
        <Flex
            gap={2}
            border="1px solid #FFD951"
            borderRadius={8}
            padding={4}
            bgColor="rgba(255, 217, 81, 0.10)"
        >
            <Box flexShrink={0}><AppIcons.YellowWarning /></Box>
            <Flex
                direction="column"
                gap={1}
                sx={{ p: { fontSize: 14, color: "#FFF" } }}
            >
                <Text fontWeight={700}>{title}</Text>
                <Text>{description}</Text>
            </Flex>
        </Flex>
    )
}

export default WarningBox