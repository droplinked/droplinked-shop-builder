import { Flex } from '@chakra-ui/react'
import React from 'react'
import Button from '../components/Button'
import SectionedContent from './components/SectionedContent'
import InvoiceAddress from './components/form/InvoiceAddress'
import InvoiceContactInformation from './components/form/InvoiceContactInformation'
import InvoiceProductTable from './components/form/InvoiceProductTable'
import InvoiceShippingMethods from './components/form/InvoiceShippingMethods'
import InvoiceSummary from './components/form/InvoiceSummary'
import InvoiceProvider from './context/InvoiceContext'

function CreateInvoice() {
    return (
        <InvoiceProvider>
            <Flex direction={{ base: "column", lg: "row" }} gap={6}>
                <Flex flex={1} direction={"column"} gap={"inherit"}>
                    <InvoiceProductTable />

                    <SectionedContent title="Client Details">
                        <InvoiceContactInformation />
                        <InvoiceAddress />
                        <InvoiceShippingMethods />
                    </SectionedContent>
                </Flex>

                <Flex direction={"column"} gap={6}>
                    <InvoiceSummary />
                    <Button onClick={() => console.log("clicked")}>Create Invoice</Button>
                </Flex>
            </Flex>
        </InvoiceProvider>
    )
}

export default CreateInvoice