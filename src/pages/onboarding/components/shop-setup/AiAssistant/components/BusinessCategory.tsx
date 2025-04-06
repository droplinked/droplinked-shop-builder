import { Flex, FormLabel, Grid, Text } from '@chakra-ui/react'
import { AsteriskSm } from 'assets/icons/Sign/Asterisk/AsteriskSm'
import React from 'react'
import { categories } from 'pages/onboarding/constants/categories'
import Item from './Item'
import { GenerateWithAiData } from 'pages/onboarding/types/aiAssistant'

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
            <Grid templateColumns={{ base: "1fr 1fr", md: "1fr 1fr 1fr" }} gap={4}>
                {categories.map((item, index) => (
                    <Item
                        key={index}
                        item={item}
                        isSelected={generateWithAiData.businessCategory === item.title}
                        onClick={() => onChange('businessCategory', item.title)}
                    />
                ))}
            </Grid>
        </Flex>
    )
}
