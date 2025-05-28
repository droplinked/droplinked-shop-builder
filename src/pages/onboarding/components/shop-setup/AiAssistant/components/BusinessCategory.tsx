import { Flex, FormLabel, Grid, Text } from '@chakra-ui/react'
import { AsteriskSm } from 'assets/icons/Sign/Asterisk/AsteriskSm'
import React from 'react'
import { getCategories } from 'pages/onboarding/constants/categories'
import { GenerateWithAiData } from 'pages/onboarding/types/aiAssistant'
import SelectableItem from './SelectableItem'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import enLocale from 'locales/onboarding/en.json'
import arLocale from 'locales/onboarding/ar.json'

interface Props {
    generateWithAiData: GenerateWithAiData
    onChange: (key: string, value: string) => void
}

export default function BusinessCategory({ generateWithAiData, onChange }: Props) {
    const { t } = useLocaleResources('onboarding', {
        en: enLocale,
        ar: arLocale
    })
    const categories = getCategories(t)
    
    return (
        <Flex flexDirection="column" gap={3}>
            <FormLabel display="flex" gap={1} alignItems="center" fontSize={16} fontWeight={500} color="#FFF">
                <Text>{t('aiAssistant.businessModal.businessCategory.label')}</Text>
                <AsteriskSm width="12px" height="12px" color='#FF2244' />
            </FormLabel>
            <Grid templateColumns={{ base: "1fr 1fr", md: "1fr 1fr 1fr" }} gap={4}>
                {categories.map((item, index) => (
                    <SelectableItem
                        key={index}
                        item={item}
                        isSelected={generateWithAiData.businessCategory === item.key}
                        onClick={() => onChange('businessCategory', item.key)}
                    />
                ))}
            </Grid>
        </Flex>
    )
}
