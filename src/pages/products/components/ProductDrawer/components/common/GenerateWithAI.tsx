import { Flex, Text } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import React from 'react'
import AnimatedBox from './AnimatedBox'



function GenerateWithAI() {
    return (
        <AnimatedBox>
            <Flex width={"100%"} borderRadius={8} padding={"12px 16px"} background={"#1c1c1c"} flexDirection={"column"} justifyContent={"start"} alignItems={"start"}>
                <Flex gap={2}>
                    <AppIcons.MagicWind />
                    <Flex flexDirection={"column"} gap={1}>
                        <Flex alignItems="center" gap="6px">
                            <Text background="#2bcfa1" backgroundClip="text" fontSize={14} fontWeight={500}>
                                Generate with AI
                            </Text>
                        </Flex>
                        <Text fontSize={12} fontWeight={400} color="#FFFFFF">
                            Populate a product name and description based on the chosen default image.
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
        </AnimatedBox>
    )
}

export default GenerateWithAI