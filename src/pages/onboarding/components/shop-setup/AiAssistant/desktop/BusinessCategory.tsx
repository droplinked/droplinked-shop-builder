import { Flex, FormLabel, Grid, Text } from '@chakra-ui/react'
import { AsteriskSm } from 'assets/icons/Sign/Asterisk/AsteriskSm'
import React from 'react'
import { categories } from 'pages/onboarding/constants/categories'
import { GenerateWithAiData } from './AiAssistant'

interface Props {
    generateWithAiData: GenerateWithAiData
    onChange: (key: string, value: string) => void
}

export default function BusinessCategory({ generateWithAiData, onChange }: Props) {
    return (
        <Flex flexDirection="column" gap={3}>
            <FormLabel display="flex" gap={1} alignItems="center" fontSize={16} fontWeight={500} color="#FFF">
                <Text>Business Category</Text>
                <AsteriskSm width="12px" height="12px" color='#FF2244' />
            </FormLabel>
            <Grid templateColumns="1fr 1fr 1fr" gap={4}>
                {categories.map((item, index) => {
                    const isSelected = generateWithAiData.businessCategory === item.title;
                    const border = isSelected ? "1.5px solid #2BCFA1" : "1.5px solid #292929";
                    const color = isSelected ? "#2BCFA1" : "#fff";
                    const background = isSelected ? "rgba(43, 207, 161, 0.10)" : "transparent";

                    return (
                        <Flex
                            key={index}
                            background={background}
                            paddingInline={4}
                            paddingBlock={3}
                            borderRadius={8}
                            onClick={() => onChange('businessCategory', item.title)}
                            border={border}
                            alignItems="center"
                            gap={3}
                            cursor="pointer"
                            transition="all 0.3s ease"
                        >
                            <item.icon color={color} />
                            <Text
                                color={color}
                                fontSize={16}
                                fontWeight={400}
                                transition="color 0.3s ease"
                            >
                                {item.title}
                            </Text>
                        </Flex>
                    )
                })}
            </Grid>
        </Flex>
    )
}
