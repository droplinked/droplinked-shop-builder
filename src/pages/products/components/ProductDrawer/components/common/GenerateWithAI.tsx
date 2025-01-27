import { Flex, Text } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import React from 'react'

function GenerateWithAI() {
    return (
        <Flex
            justifyContent="space-between"
            alignItems="center"
            borderRadius={8}
            padding="12px 16px"
            bg="linear-gradient(to right, #2BCFA100, #2BCFA11A)"
        >
            <Flex alignItems="center" gap="6px">
                <AppIcons.MagicWind />
                <Text
                    background="linear-gradient(92deg, #2BCFA1 0%, #C59CFF 47.99%, #9C4EFF 99.98%)"
                    backgroundClip="text"
                >
                    Generate with AI
                </Text>
            </Flex>
            <Text fontSize={12} fontWeight={500} color="#B1B1B1">Coming Soon</Text>
        </Flex>
    )
}

export default GenerateWithAI