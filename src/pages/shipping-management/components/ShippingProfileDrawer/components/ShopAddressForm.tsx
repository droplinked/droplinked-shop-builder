import { Flex, SimpleGrid } from '@chakra-ui/react'
import AppInput from 'components/redesign/input/AppInput'
import AppSelect from 'components/redesign/select/AppSelect'
import useShippingManagementStore from 'pages/shipping-management/stores/useShippingManagementStore'
import React, { useCallback } from 'react'
import { useQuery } from 'react-query'
import { allCountriesService, citiesService, statesService } from 'services/address/addressServices'
import LabeledContent from '../../common/LabeledContent'

function ShopAddressForm() {
    const { address, updateAddress } = useShippingManagementStore(s => ({
        address: s.address,
        updateAddress: s.updateAddress
    }))

    const { data: countries, isLoading: isFetchingCountries } = useQuery({
        queryKey: ['countries'],
        queryFn: allCountriesService,
        select: (data) => data.data.data.countries || []
    })

    const { data: states, isLoading: isFetchingStates } = useQuery({
        queryKey: ['states', address.country],
        queryFn: () => statesService({ country_name: address.country }),
        select: (data) => data.data.data.states || [],
        enabled: !!address.country
    })

    const { data: cities, isLoading: isFetchingCities } = useQuery({
        queryKey: ["city", address.state, address.country],
        enabled: !!address.state && !!address.country,
        queryFn: () => citiesService({ country_name: address.country, state_name: address.state }),
        select: (data) => data.data.data.cities || []
    })

    const countriesOptions = countries ?? []
    const statesOptions = states ?? []
    const citiesOptions = cities ?? []

    const handleCountryChange = useCallback((selectedCountry: string) => {
        updateAddress('country', selectedCountry)
        updateAddress('state', '')
        updateAddress('city', '')
    }, [updateAddress])

    const handleStateChange = useCallback((selectedState: string) => {
        updateAddress('state', selectedState)
        updateAddress('city', '')
    }, [updateAddress])

    return (
        <LabeledContent label='Shop Address' >
            <Flex
                direction='column'
                gap={9}
                border="1px solid"
                borderColor="neutral.gray.800"
                borderRadius={8}
                padding={4}
                sx={{ input: { fontSize: 16 } }}
            >
                <SimpleGrid columns={2} gap={4}>
                    <AppInput
                        label='First Name'
                        inputProps={{
                            value: address.firstName,
                            onChange: (e) => updateAddress('firstName', e.target.value),
                            placeholder: 'John',
                            isRequired: true
                        }}
                    />
                    <AppInput
                        label='Last Name'
                        inputProps={{
                            value: address.lastName,
                            onChange: (e) => updateAddress('lastName', e.target.value),
                            placeholder: 'Doe',
                            isRequired: true
                        }}
                    />
                </SimpleGrid>

                <Flex direction='column' gap={6}>
                    <AppInput
                        label='Address Line 1'
                        inputProps={{
                            value: address.addressLine1,
                            onChange: (e) => updateAddress('addressLine1', e.target.value),
                            placeholder: 'e.g., 123 Main St, PO Box 456',
                            isRequired: true
                        }}
                    />
                    <AppInput
                        label='Address Line 2'
                        inputProps={{
                            value: address.addressLine2,
                            onChange: (e) => updateAddress('addressLine2', e.target.value),
                            placeholder: 'e.g., Apt 4B, Suite 205, Building 7'
                        }}
                    />
                </Flex>

                <Flex direction='column' gap={6}>
                    <SimpleGrid columns={2} gap={4}>
                        <AppSelect
                            label='Country'
                            isRequired
                            isLoading={isFetchingCountries}
                            items={countriesOptions}
                            valueAccessor='name'
                            selectProps={{
                                value: address.country,
                                onChange: (e) => handleCountryChange(e.target.value),
                                placeholder: 'Country'
                            }}
                        />

                        <AppSelect
                            label='State'
                            isRequired
                            isLoading={isFetchingStates}
                            items={statesOptions}
                            valueAccessor='name'
                            selectProps={{
                                value: address.state,
                                onChange: (e) => handleStateChange(e.target.value),
                                placeholder: 'State'
                            }}
                        />
                    </SimpleGrid>

                    <SimpleGrid columns={2} gap={4}>
                        <AppSelect
                            label='City'
                            isRequired
                            isLoading={isFetchingCities}
                            items={citiesOptions}
                            valueAccessor='name'
                            selectProps={{
                                value: address.city,
                                onChange: (e) => updateAddress('city', e.target.value),
                                placeholder: 'City',
                            }}
                        />

                        <AppInput
                            label='Zip Code'
                            inputProps={{
                                value: address.zip,
                                onChange: (e) => updateAddress('zip', e.target.value),
                                placeholder: '10001',
                                isRequired: true
                            }}
                        />
                    </SimpleGrid>
                </Flex>
            </Flex>
        </LabeledContent>
    )
}

export default ShopAddressForm