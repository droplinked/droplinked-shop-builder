import { Center, Flex, Text } from '@chakra-ui/react'
import { GlobeSm } from 'assets/icons/Sign/Globe/GlobeSm'
import Checkbox from 'components/redesign/checkbox/Checkbox'
import React, { useMemo } from 'react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

interface WorldwideSelectorProps {
    countries: any[]
    selectedCountries: string[]
    onSelectionChange: (isChecked: boolean) => void
    usedCountries?: Set<string>
}

function WorldwideSelector({ countries, selectedCountries, onSelectionChange, usedCountries }: WorldwideSelectorProps) {
    const { t } = useLocaleResources("shipping-management")
    const availableCountriesCount = useMemo(() => {
        if (!countries || countries.length === 0) return 0
        if (!usedCountries) return countries.length
        return countries.filter(country => !usedCountries.has(country.iso3)).length
    }, [countries, usedCountries])

    const isWorldwideSelected = useMemo(() => {
        if (availableCountriesCount === 0) return false
        return selectedCountries.length === availableCountriesCount
    }, [availableCountriesCount, selectedCountries])

    // Check if worldwide is partially selected (some countries are selected)
    const isWorldwideIndeterminate = useMemo(() => {
        if (availableCountriesCount === 0) return false
        return selectedCountries.length > 0 && selectedCountries.length < availableCountriesCount
    }, [availableCountriesCount, selectedCountries])

    return (
        <Flex alignItems="center" gap={3} padding="12px 16px">
            <Checkbox
                value="worldwide"
                isChecked={isWorldwideSelected}
                isIndeterminate={isWorldwideIndeterminate}
                onChange={(e) => onSelectionChange(e.target.checked)}
            />
            <Center
                w="30px"
                h="20px"
                backgroundColor="neutral.gray.900"
                borderRadius={4}
            >
                <GlobeSm color='#fff' />
            </Center>
            <Text color="text.white">{t('WorldwideSelector.label')}</Text>
        </Flex>
    )
}

export default WorldwideSelector