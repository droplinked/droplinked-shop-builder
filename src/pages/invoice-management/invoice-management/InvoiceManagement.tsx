import { Flex } from '@chakra-ui/react'
import { InvoiceQueryParams } from 'lib/apis/invoice/interfaces'
import { getInvoicesService } from 'lib/apis/invoice/invoiceServices'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import InvoiceFilters from './components/InvoiceFilters'
import InvoiceManagementHeader from './components/InvoiceManagementHeader'
import InvoiceTable from './components/table/InvoiceTable'

export const INVOICES_QUERY_KEY = "invoiceList"

function InvoiceManagement() {
    const [invoiceFilters, setInvoiceFilters] = useState<InvoiceQueryParams>({ page: 1, limit: 15 })
    const { isFetching, data } = useQuery({
        queryKey: [INVOICES_QUERY_KEY, invoiceFilters],
        queryFn: () => getInvoicesService(invoiceFilters),
        refetchOnWindowFocus: false
    })

    const updateInvoiceFilters = <K extends keyof InvoiceQueryParams>(key: K, value: InvoiceQueryParams[K]) =>
        setInvoiceFilters({ ...invoiceFilters, [key]: value })

    const invoices = data?.data?.data || []

    return (
        <>
            <InvoiceManagementHeader />
            <Flex mt={9} direction={"column"} gap={6}>
                <InvoiceFilters updateInvoiceFilters={updateInvoiceFilters} />
                <InvoiceTable invoices={invoices} isLoading={isFetching} />
            </Flex>
        </>
    )
}

export default InvoiceManagement