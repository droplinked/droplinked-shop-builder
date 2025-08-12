import { SearchLg } from 'assets/icons/System/Search/SearchLg'
import AppInput from 'components/redesign/input/AppInput'
import RuledGrid from 'components/redesign/ruled-grid/RuledGrid'
import useDebounce from 'hooks/useDebounce/useDebounce'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import { Zone } from 'pages/shipping-management/types/shipping'
import React, { useCallback, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { allCountriesService } from 'services/address/addressServices'
import LabeledContent from '../common/LabeledContent'
import CountryItem from './CountryItem'
import WorldwideSelector from './WorldwideSelector'

interface Props {
    allZones: Zone[]
    selectedCountries: string[]
    onSelectionChange: (countries: string[]) => void
    zoneIndex?: number
}

function CountrySelector({ allZones, selectedCountries, onSelectionChange, zoneIndex }: Props) {
    const { t } = useLocaleResources("shipping-management")
    const [searchTerm, setSearchTerm] = useState('')
    const debouncedSearchTerm = useDebounce(searchTerm)
    const { data: countries } = useQuery({
        queryKey: ['countries'],
        queryFn: allCountriesService,
        select: (data) => data.data.data.countries || []
    })

    const usedCountries = useMemo(() => {
        const set = new Set<string>()
        allZones.forEach((zone, i) => {
            if (i !== zoneIndex) {
                zone.countries.forEach(c => set.add(c))
            }
        })
        return set
    }, [allZones, zoneIndex])

    const availableCountryIds = useMemo(() => {
        return countries?.filter(c => !usedCountries.has(c.iso3)).map(c => c.iso3) || []
    }, [countries, usedCountries])

    // Memoize filtered countries based on search term
    const filteredCountries = useMemo(() => {
        if (!countries || !Array.isArray(countries)) return []
        if (!debouncedSearchTerm.trim()) return countries

        const searchLower = debouncedSearchTerm.toLowerCase()
        return countries.filter((country) => country.name.toLowerCase().includes(searchLower))
    }, [countries, debouncedSearchTerm])

    // Handle checkbox selection changes
    const handleCheckboxChange = useCallback((countryId: string, isChecked: boolean) => {
        if (usedCountries.has(countryId)) return
        if (isChecked) onSelectionChange([...selectedCountries, countryId])
        else onSelectionChange(selectedCountries.filter(id => id !== countryId))
    }, [selectedCountries, onSelectionChange, usedCountries])

    // Handle worldwide selection changes (select all or deselect all)
    const handleWorldwideChange = useCallback((isChecked: boolean) => {
        if (isChecked) {
            onSelectionChange(availableCountryIds)
        } else {
            onSelectionChange([])
        }
    }, [availableCountryIds, onSelectionChange])

    // Memoize country items for efficient rendering
    const countryItems = useMemo(() => {
        return filteredCountries.map((country) => (
            <CountryItem
                key={country._id}
                country={country}
                isSelected={selectedCountries.includes(country.iso3)}
                onSelectionChange={handleCheckboxChange}
                isDisabled={usedCountries.has(country.iso3)}
            />
        ))
    }, [filteredCountries, selectedCountries, handleCheckboxChange, usedCountries])

    return (
        <LabeledContent label={t('CountrySelector.label')} required>
            <AppInput
                leftElement={<SearchLg color='#7b7b7b' />}
                inputProps={{
                    value: searchTerm,
                    onChange: (e) => setSearchTerm(e.target.value),
                    placeholder: t('CountrySelector.placeholder.searchByCountryName'),
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
                    usedCountries={usedCountries}
                />

                {/* Country list */}
                {countryItems}
            </RuledGrid>
        </LabeledContent>
    )
}

export default CountrySelector