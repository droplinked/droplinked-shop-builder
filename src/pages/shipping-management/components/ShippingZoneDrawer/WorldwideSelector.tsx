import { Center, Flex, Text } from '@chakra-ui/react'
import { GlobeSm } from 'assets/icons/Sign/Globe/GlobeSm'
import Checkbox from 'components/redesign/checkbox/Checkbox'
import React, { useMemo } from 'react'

interface WorldwideSelectorProps {
    countries: any[]
    selectedCountries: string[]
    onSelectionChange: (isChecked: boolean) => void
}

function WorldwideSelector({ countries, selectedCountries, onSelectionChange }: WorldwideSelectorProps) {

    const isWorldwideSelected = useMemo(() => {
        if (!countries || countries.length === 0) return false
        return selectedCountries.length === countries.length
    }, [countries, selectedCountries])

    // Check if worldwide is partially selected (some countries are selected)
    const isWorldwideIndeterminate = useMemo(() => {
        if (!countries || countries.length === 0) return false
        return selectedCountries.length > 0 && selectedCountries.length < countries.length
    }, [countries, selectedCountries])

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
            <Text color="text.white">Worldwide</Text>
        </Flex>
    )
}

export default WorldwideSelector
