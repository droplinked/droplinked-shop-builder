import { Flex, Text } from '@chakra-ui/react'
import { SearchLg } from 'assets/icons/System/Search/SearchLg'
import Checkbox from 'components/redesign/checkbox/Checkbox'
import AppInput from 'components/redesign/input/AppInput'
import RuledGrid from 'components/redesign/ruled-grid/RuledGrid'
import React, { useMemo, useState } from 'react'
import LabeledContent from '../common/LabeledContent'

interface Props {
    selectedCountries: string[]
    onSelectionChange: (countries: string[]) => void
}

export default function CountrySelector({ selectedCountries, onSelectionChange }: Props) {
    const [searchTerm, setSearchTerm] = useState('')

    const allCountries = ["Worldwide", "European Union", "Belgium", "Greece", "Lithuania", "Portugal", "Afghanistan", "Albania", "Algeria", "Angola", "Argentina", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau"]

    const filteredCountries = useMemo(() => {
        if (!searchTerm) return allCountries
        return allCountries.filter(c => c.toLowerCase().includes(searchTerm.toLowerCase()))
    }, [allCountries, searchTerm])

    const handleCheckboxChange = (country: string, isChecked: boolean) => {
        let newSelection: string[]
        if (isChecked) {
            newSelection = [...selectedCountries, country]
        } else {
            newSelection = selectedCountries.filter(c => c !== country)
        }
        onSelectionChange(newSelection)
    }

    return (
        <LabeledContent label='Choose Zone or Country' required>
            <Flex direction="column" gap={4}>
                <AppInput
                    inputProps={{
                        value: searchTerm,
                        onChange: (e) => setSearchTerm(e.target.value),
                        placeholder: 'Search by country or zone',
                        fontSize: 16
                    }}
                    leftElement={<SearchLg color='#7b7b7b' />}
                />
                <RuledGrid columns={1} borderRadius={8} maxH="300px" overflowY="auto">
                    {filteredCountries.map((country) => (
                        <Flex
                            key={country}
                            alignItems="center"
                            gap={3}
                            padding="12px 16px"
                        >
                            <Checkbox
                                value={country}
                                isChecked={selectedCountries.includes(country)}
                                onChange={(e) => handleCheckboxChange(country, e.target.checked)}
                            />
                            <Text color="text.white" fontSize={16} fontWeight={500}>{country}</Text>
                        </Flex>
                    ))}
                </RuledGrid>
            </Flex>
        </LabeledContent>
    )
}
