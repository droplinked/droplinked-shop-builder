import { Flex, Text } from '@chakra-ui/react'
import Checkbox from 'components/redesign/checkbox/Checkbox'
import { getEmoji } from 'pages/shipping-management/utils/utils'
import React from 'react'

interface CountryItemProps {
    country: any
    isSelected: boolean
    onSelectionChange: (countryIso3: string, isChecked: boolean) => void
    isDisabled: boolean
}

function CountryItem({ country, isSelected, onSelectionChange, isDisabled }: CountryItemProps) {
    return (
        <Flex alignItems="center" gap={3} padding="12px 16px">
            <Checkbox
                value={country.iso3}
                isChecked={isSelected}
                onChange={(e) => onSelectionChange(country.iso3, e.target.checked)}
                isDisabled={isDisabled}
            />
            <Text fontSize="28px" lineHeight={1} opacity={isDisabled ? 0.5 : 1}>
                {getEmoji(country.emojiU)}
            </Text>
            <Text color={isDisabled ? "neutral.gray.500" : "text.white"}>{country.name}</Text>
        </Flex>
    )
}

export default CountryItem