import { SimpleGrid } from '@chakra-ui/react'
import Input from 'pages/invoice-management/components/Input'
import React from 'react'
import ToggleableSection from '../ToggleableSection'

function InvoiceShippingMethods() {
    return (
        <ToggleableSection
            title='Shipping'
            description='Shipping methods are based on the type of inventory and address on the invoice.'
        >
            <SimpleGrid
                columns={{ base: 1, md: 2 }}
                columnGap={6}
                rowGap={4}
            >
                <Input label='Address Line 1' inputProps={{ placeholder: "Address" }} />
                <Input label='Address Line 2' inputProps={{ placeholder: "Address" }} />
            </SimpleGrid>
        </ToggleableSection>
    )
}

export default InvoiceShippingMethods