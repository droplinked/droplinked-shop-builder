import { Box, Flex, HStack, Text } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import React from 'react'

export default function WalletFeatures() {
    return (
        <Flex gap="9">
            <HStack>
                <Box p="2" bg="#2bcea11a" borderRadius="50px">
                    <AppIcons.Secure />
                </Box>
                <Text color="white" fontSize="sm">
                    Secure
                </Text>
            </HStack>
            <HStack>
                <Box p="2" bg="#2bcea11a" borderRadius="50px">
                    <AppIcons.GreenSpeedometer />
                </Box>
                <Text color="white" fontSize="sm">
                    Instant
                </Text>
            </HStack>
            <HStack>
                <Box p="2" bg="#2bcea11a" borderRadius="50px" sx={{ path: { stroke: "#2bcfa1" } }}>
                    <AppIcons.Refresh color='#2BCFA1' style={{ width: "16px", height: "16px" }} />
                </Box>
                <Text color="white" fontSize="sm">
                    Automatic Conversion
                </Text>
            </HStack>
        </Flex>
    )
}
