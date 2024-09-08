import { Flex } from '@chakra-ui/react'
import React from 'react'
import Button from '../components/Button'
import SectionedContent from './components/SectionedContent'
import InvoiceAddress from './components/form/InvoiceAddress'
import InvoiceContactInformation from './components/form/InvoiceContactInformation'
import InvoiceShippingMethods from './components/form/InvoiceShippingMethods'
import InvoiceSummary from './components/form/InvoiceSummary'

function CreateInvoice() {
    return (
        <Flex direction={{ base: "column", lg: "row" }} gap={6}>
            <SectionedContent flex={1} title="Client Details">
                <InvoiceContactInformation />
                <InvoiceAddress />
                <InvoiceShippingMethods />
            </SectionedContent>
            <Flex direction={"column"} gap={6}>
                <InvoiceSummary />
                <Button onClick={() => console.log("clicked")}>Create Invoice</Button>
            </Flex>
        </Flex>
    )
}

export default CreateInvoice