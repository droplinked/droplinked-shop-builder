import { SimpleGrid } from '@chakra-ui/react'
import { useFormikContext } from 'formik'
import { allCountriesService, citiesService, statesService } from 'lib/apis/address/addressServices'
import AppInput from 'components/redesign/input/AppInput'
import AppSelect from 'components/redesign/select/AppSelect'
import React, { useCallback, useEffect, useMemo } from 'react'
import { useMutation, useQuery } from 'react-query'
import { InvoiceFormSchema } from '../../helpers/helpers'
import useInvoiceStore from '../../store/invoiceStore'
import ToggleableSection from '../ToggleableSection'

function InvoiceAddress() {
    const { updateIsAddressSwitchToggled, isAddressSwitchToggled, updateCountryISO2 } = useInvoiceStore()
    const { values, errors, setFieldValue } = useFormikContext<InvoiceFormSchema>()
    const { isFetching: isFetchingCountries, data: countriesData } = useQuery({ queryFn: allCountriesService })
    const { mutateAsync: fetchStates, data: statesData, isLoading: isFetchingStates } = useMutation(statesService)
    const { mutateAsync: fetchCities, data: citiesData, isLoading: isFetchingCities } = useMutation(citiesService)

    const countries = useMemo(() => countriesData?.data?.data?.countries || [], [countriesData])
    const states = useMemo(() => statesData?.data?.data?.states || [], [statesData])
    const cities = useMemo(() => citiesData?.data?.data?.cities || [], [citiesData])

    const handleCountryChange = useCallback(async (e) => {
        const selectedCountry = e.target.value
        const countryISO2 = e.target.selectedOptions[0]?.getAttribute('data-iso2')

        updateCountryISO2(countryISO2)
        setFieldValue("address.country", selectedCountry)
        setFieldValue("address.state", "")
        setFieldValue("address.city", "")
        await fetchStates({ country_name: selectedCountry })
    }, [updateCountryISO2, setFieldValue, fetchStates])

    const handleStateChange = useCallback(async (e) => {
        const selectedState = e.target.value

        setFieldValue("address.state", selectedState)
        setFieldValue("address.city", "")
        await fetchCities({ country_name: values.address.country, state_name: selectedState })
    }, [setFieldValue, values.address.country, fetchCities])

    useEffect(() => {
        if (values.address.state && !states.length) {
            fetchStates({ country_name: values.address.country })
        }
        if (values.address.city && !cities.length) {
            fetchCities({ country_name: values.address.country, state_name: values.address.state })
        }
    }, [values.address, states, cities, fetchStates, fetchCities])

    return (
        <ToggleableSection
            title='Address'
            description='Enable this option if you want to enter the customers address details.'
            isExpanded={isAddressSwitchToggled}
            onToggle={() => updateIsAddressSwitchToggled(!isAddressSwitchToggled)}
        >
            <SimpleGrid columns={{ base: 1, md: 2 }} columnGap={6} rowGap={4}>
                <AppInput
                    label='Address Line 1'
                    inputProps={{
                        name: "addressLine1",
                        placeholder: "Address",
                        value: values.address.addressLine1,
                        onChange: (e) => setFieldValue("address.addressLine1", e.target.value)
                    }}
                    {...errors.address?.addressLine1 && { state: "error", message: errors.address?.addressLine1 }}
                    showErrorIcon={false}
                    stateColor='#E53E3E'
                />
                <AppInput
                    label='Address Line 2'
                    inputProps={{
                        name: "addressLine2",
                        placeholder: "Address",
                        value: values.address.addressLine2,
                        onChange: (e) => setFieldValue("address.addressLine2", e.target.value)
                    }}
                    {...errors.address?.addressLine2 && { state: "error", message: errors.address?.addressLine2 }}
                    showErrorIcon={false}
                    stateColor='#E53E3E'
                />
            </SimpleGrid>

            <SimpleGrid
                columns={{ base: 1, md: 2, xl: 4 }}
                columnGap={6}
                rowGap={4}
                marginTop={{ base: 4, xl: 6 }}
            >
                <AppSelect
                    label='Country'
                    items={countries}
                    valueAccessor='name'
                    dataAttributes={{ 'data-iso2': 'iso2' }}
                    isLoading={isFetchingCountries}
                    error={errors.address?.country}
                    selectProps={{ placeholder: "Country", onChange: handleCountryChange, value: countries.find(c => c.name === values.address.country) }}
                />
                <AppSelect
                    label='State'
                    items={states}
                    valueAccessor='name'
                    isLoading={isFetchingStates}
                    error={errors.address?.state}
                    selectProps={{ placeholder: "State", onChange: handleStateChange, value: states.find(s => s.name === values.address.state) }}
                />
                <AppSelect
                    label='City'
                    items={cities}
                    valueAccessor='name'
                    isLoading={isFetchingCities}
                    error={errors.address?.city}
                    selectProps={{
                        placeholder: "City",
                        onChange: (e) => setFieldValue("address.city", e.target.value),
                        value: cities.find(c => c.name === values.address.city)
                    }}
                />
                <AppInput
                    label='Zip Code'
                    inputProps={{
                        name: "zip",
                        placeholder: "Zip Code",
                        value: values.address.zip,
                        onChange: (e) => setFieldValue("address.zip", e.target.value)
                    }}
                    labelProps={{ marginBottom: "5px" }}
                    {...errors.address?.zip && { state: "error", message: errors.address?.zip }}
                    showErrorIcon={false}
                    stateColor='#E53E3E'
                />
            </SimpleGrid>
        </ToggleableSection>
    )
}

export default InvoiceAddress