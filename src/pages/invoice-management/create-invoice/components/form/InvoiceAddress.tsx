import { SimpleGrid, useDisclosure } from '@chakra-ui/react'
import { useFormikContext } from 'formik'
import { allCountriesService, citiesService, statesService } from 'lib/apis/address/addressServices'
import { IcitiesService, IsatatesService } from 'lib/apis/address/interfaces'
import Input from 'pages/invoice-management/components/Input'
import Select from 'pages/invoice-management/components/Select'
import React, { useMemo } from 'react'
import { useMutation, useQuery } from 'react-query'
import { InvoiceFormSchema } from '../../store/invoiceStore'
import ToggleableSection from '../ToggleableSection'

function InvoiceAddress() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { values, errors, setFieldValue } = useFormikContext<InvoiceFormSchema>()
    const { isFetching: isFetchingCountries, data: countriesData } = useQuery({
        queryFn: allCountriesService,
        staleTime: 60 * 60 * 1000,
        refetchOnWindowFocus: false,
    })
    const { isLoading: isFetchingStates, mutateAsync: getStates, data: statesData } = useMutation((params: IsatatesService) => statesService(params))
    const { isLoading: isFetchingCities, mutateAsync: getCities, data: citiesData } = useMutation((params: IcitiesService) => citiesService(params))

    const countries = useMemo(() => countriesData?.data?.data?.countries || [], [countriesData])
    const states = useMemo(() => statesData?.data?.data?.states || [], [statesData])
    const cities = useMemo(() => citiesData?.data?.data?.cities || [], [citiesData])

    return (
        <ToggleableSection
            title='Address'
            description='Enable this option if you want to enter the customers address details.'
            isExpanded={isOpen}
            onToggle={isOpen ? onClose : onOpen}
        >
            <SimpleGrid
                columns={{ base: 1, md: 2 }}
                alignItems={"flex-start"}
                columnGap={6}
                rowGap={4}
            >
                <Input
                    label='Address Line 1'
                    inputProps={{ name: "addressLine1", placeholder: "Address", value: values.address.addressLine1, onChange: (e) => setFieldValue("address.addressLine1", e.target.value) }}
                    error={errors.address?.addressLine1}
                />
                <Input
                    label='Address Line 2'
                    inputProps={{ name: "addressLine2", placeholder: "Address", value: values.address.addressLine2, onChange: (e) => setFieldValue("address.addressLine2", e.target.value) }}
                    error={errors.address?.addressLine2}
                />
            </SimpleGrid>
            <SimpleGrid
                marginTop={{ base: 4, xl: 6 }}
                columns={{ base: 1, md: 2, xl: 4 }}
                columnGap={6}
                rowGap={4}
            >
                <Select
                    label='Country'
                    items={countries}
                    value={values.address.country}
                    valueAccessor='name'
                    isLoading={isFetchingCountries}
                    error={errors.address?.country}
                    selectProps={{ placeholder: "Country" }}
                    onChange={(e) => {
                        const selectedCountry = e.target.value
                        setFieldValue("address.country", selectedCountry)
                        setFieldValue("address.state", "")
                        setFieldValue("address.city", "")
                        getStates({ country_name: selectedCountry })
                    }}
                />
                <Select
                    label='State'
                    items={states}
                    value={values.address.state}
                    valueAccessor='name'
                    isLoading={isFetchingStates}
                    error={errors.address?.state}
                    selectProps={{ placeholder: "State" }}
                    onChange={(e) => {
                        const selectedState = e.target.value
                        setFieldValue("address.state", selectedState)
                        setFieldValue("address.city", "")
                        getCities({ country_name: values.address.country, state_name: selectedState })
                    }}
                />
                <Select
                    label='City'
                    items={cities}
                    value={values.address.city}
                    valueAccessor='name'
                    isLoading={isFetchingCities}
                    error={errors.address?.city}
                    selectProps={{ placeholder: "City" }}
                    onChange={(e) => setFieldValue("address.city", e.target.value)}
                />
                <Input
                    label='Zip Code'
                    inputProps={{ name: "zip", placeholder: "Zip Code", value: values.address.zip, onChange: (e) => setFieldValue("address.zip", e.target.value) }}
                    error={errors.address?.zip}
                />
            </SimpleGrid>
        </ToggleableSection>
    )
}

export default InvoiceAddress