import { Flex } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import InvoiceFilters from './components/InvoiceFilters'
import InvoiceManagementHeader from './components/InvoiceManagementHeader'
import InvoiceTable from './components/InvoiceTable'

function InvoiceManagement() {
    const [invoiceFilters, setInvoiceFilters] = useState({})
    const { isFetching, isError, data } = useQuery({
        queryKey: ["invoiceList", invoiceFilters],
        queryFn: () => { },
        refetchOnWindowFocus: false
    })

    return (
        <>
            <InvoiceManagementHeader />
            <Flex mt={9} direction={"column"} gap={6}>
                <InvoiceFilters onChange={setInvoiceFilters} />
                <InvoiceTable invoices={[]} />
            </Flex>
        </>
    )
}

export default InvoiceManagement