import { SimpleGrid } from '@chakra-ui/react'
import Input from 'pages/invoice-management/components/Input'
import React from 'react'
import ToggleableSection from '../ToggleableSection'

function InvoiceAddress() {
    return (
        <ToggleableSection
            title='Contact Information'
            description='Enable this option if you want to enter the customers address details.'
        >
            <SimpleGrid
                columns={{ base: 1, md: 2 }}
                columnGap={6}
                rowGap={4}
            >
                <Input label='Address Line 1' inputProps={{ placeholder: "Address" }} />
                <Input label='Address Line 2' inputProps={{ placeholder: "Address" }} />
            </SimpleGrid>
            <SimpleGrid
                marginTop={{ base: 4, xl: 6 }}
                columns={{ base: 1, md: 2, xl: 4 }}
                columnGap={6}
                rowGap={4}
            >
                <Input label='Address Line 1' inputProps={{ placeholder: "Address" }} />
                <Input label='Address Line 2' inputProps={{ placeholder: "Address" }} />
                <Input label='Address Line 2' inputProps={{ placeholder: "Address" }} />
                <Input label='Zip Code' inputProps={{ placeholder: "Enter Zip Code" }} />
            </SimpleGrid>
        </ToggleableSection>
    )
}

export default InvoiceAddress