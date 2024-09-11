import { Flex } from '@chakra-ui/react'
import { InvoiceQueryParams } from 'lib/apis/invoice/interfaces'
import { getInvoicesService } from 'lib/apis/invoice/invoiceServices'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import InvoiceFilters from './components/InvoiceFilters'
import InvoiceManagementHeader from './components/InvoiceManagementHeader'
import InvoiceTable from './components/table/InvoiceTable'

function InvoiceManagement() {
    const [invoiceFilters, setInvoiceFilters] = useState<InvoiceQueryParams>({ page: 1, limit: 15 })
    const updateInvoiceFilters = <K extends keyof InvoiceQueryParams>(key: K, value: InvoiceQueryParams[K]) =>
        setInvoiceFilters({ ...invoiceFilters, [key]: value })

    const { isFetching, isError, data, refetch } = useQuery({
        queryKey: ["invoiceList", invoiceFilters],
        queryFn: () => getInvoicesService(invoiceFilters),
        refetchOnWindowFocus: false
    })

    useEffect(() => {
        refetch()
    }, [refetch, invoiceFilters])

    return (
        <>
            <InvoiceManagementHeader />
            <Flex mt={9} direction={"column"} gap={6}>
                <InvoiceFilters updateInvoiceFilters={updateInvoiceFilters} />
                <InvoiceTable invoices={data?.data?.data || []} isLoading={isFetching} />
            </Flex>
        </>
    )
}

export default InvoiceManagement