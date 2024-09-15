import { SimpleGrid, useDisclosure } from '@chakra-ui/react'
import { useFormikContext } from 'formik'
import { allCountriesService } from 'lib/apis/address/addressServices'
import Input from 'pages/invoice-management/components/Input'
import Select from 'pages/invoice-management/components/Select'
import React from 'react'
import { useQuery } from 'react-query'
import { InvoiceFormSchema } from '../../store/invoiceStore'
import ToggleableSection from '../ToggleableSection'

function InvoiceAddress() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { values, errors, setFieldValue } = useFormikContext<InvoiceFormSchema>()
    const { isFetching: isFetchingCountries, data: countriesData } = useQuery({
        queryFn: allCountriesService,
        queryKey: ["countries"],
        staleTime: 60 * 60 * 1000,
        refetchOnWindowFocus: false
    })
    const countries = countriesData?.data?.data?.countries || []

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
                    // items={countries.map((country) => ({ value: country._id, caption: country.name }))}
                    items={[]}
                    selectProps={{ placeholder: "Country" }}
                />
                <Select
                    label='State'
                    items={[]}
                    selectProps={{ placeholder: "State" }}
                />
                <Select
                    label='City'
                    items={[]}
                    selectProps={{ placeholder: "City" }}
                />
                <Input
                    label='Zip Code'
                    inputProps={{ name: "zip", placeholder: "Enter Zip Code", value: values.address.zip, onChange: (e) => setFieldValue("address.zip", e.target.value) }}
                    error={errors.address?.zip}
                />
            </SimpleGrid>
        </ToggleableSection >
    )
}

export default InvoiceAddress