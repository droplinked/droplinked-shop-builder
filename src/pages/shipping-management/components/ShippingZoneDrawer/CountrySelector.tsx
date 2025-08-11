import { SearchLg } from 'assets/icons/System/Search/SearchLg'
import AppInput from 'components/redesign/input/AppInput'
import RuledGrid from 'components/redesign/ruled-grid/RuledGrid'
import useDebounce from 'hooks/useDebounce/useDebounce'
import React, { useCallback, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { allCountriesService } from 'services/address/addressServices'
import LabeledContent from '../common/LabeledContent'
import CountryItem from './CountryItem'
import WorldwideSelector from './WorldwideSelector'

interface Props {
    selectedCountries: string[]
    onSelectionChange: (countries: string[]) => void
}

function CountrySelector({ selectedCountries, onSelectionChange }: Props) {
    const [searchTerm, setSearchTerm] = useState('')
    const debouncedSearchTerm = useDebounce(searchTerm)
    const { data: countries } = useQuery({
        queryKey: ['countries'],
        queryFn: allCountriesService,
        select: (data) => data.data.data.countries || []
    })

    // Memoize filtered countries based on search term
    const filteredCountries = useMemo(() => {
        if (!countries || !Array.isArray(countries)) return []
        if (!debouncedSearchTerm.trim()) return countries

        const searchLower = debouncedSearchTerm.toLowerCase()
        return countries.filter((country) => country.name.toLowerCase().includes(searchLower))
    }, [countries, debouncedSearchTerm])

    // Handle checkbox selection changes
    const handleCheckboxChange = useCallback((countryId: string, isChecked: boolean) => {
        if (isChecked) onSelectionChange([...selectedCountries, countryId])
        else onSelectionChange(selectedCountries.filter(id => id !== countryId))
    }, [selectedCountries, onSelectionChange])

    // Handle worldwide selection changes (select all or deselect all)
    const handleWorldwideChange = useCallback((isChecked: boolean) => {
        if (isChecked) {
            const allCountryIds = countries?.map(country => country.iso3) || []
            onSelectionChange(allCountryIds)
        } else {
            onSelectionChange([])
        }
    }, [countries, onSelectionChange])

    // Memoize country items for efficient rendering
    const countryItems = useMemo(() => {
        return filteredCountries.map((country) => (
            <CountryItem
                key={country._id}
                country={country}
                isSelected={selectedCountries.includes(country.iso3)}
                onSelectionChange={handleCheckboxChange}
            />
        ))
    }, [filteredCountries, selectedCountries, handleCheckboxChange])

    return (
        <LabeledContent label='Choose Zone or Country' required>
            <AppInput
                leftElement={<SearchLg color='#7b7b7b' />}
                inputProps={{
                    value: searchTerm,
                    onChange: (e) => setSearchTerm(e.target.value),
                    placeholder: 'Search by country name',
                    fontSize: 16
                }}
            />

            <RuledGrid
                columns={1}
                maxH="400px"
                marginTop={4}
                borderRadius={8}
                overflowY="auto"
                sx={{
                    '&::-webkit-scrollbar': { width: '8px' },
                    '&::-webkit-scrollbar-track': {
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '4px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: 'rgba(255, 255, 255, 0.3)',
                        borderRadius: '4px',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                        background: 'rgba(255, 255, 255, 0.5)',
                    },
                }}
            >
                {/* Worldwide option */}
                <WorldwideSelector
                    countries={countries}
                    selectedCountries={selectedCountries}
                    onSelectionChange={handleWorldwideChange}
                />

                {/* Country list */}
                {countryItems}
            </RuledGrid>
        </LabeledContent>
    )
}

export default CountrySelector