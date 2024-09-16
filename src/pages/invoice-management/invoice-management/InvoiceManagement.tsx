import { Flex } from '@chakra-ui/react'
import { useProfile } from 'functions/hooks/useProfile/useProfile'
import { InvoiceQueryParams } from 'lib/apis/invoice/interfaces'
import { getInvoicesService } from 'lib/apis/invoice/invoiceServices'
import React, { useState } from 'react'
import { useInfiniteQuery } from 'react-query'
import InvoiceFilters from './components/InvoiceFilters'
import InvoiceManagementHeader from './components/InvoiceManagementHeader'
import InvoiceTable from './components/table/InvoiceTable'

export const INVOICES_QUERY_KEY = "invoiceList"

function InvoiceManagement() {
    const [invoiceFilters, setInvoiceFilters] = useState<InvoiceQueryParams>({ page: 1, limit: 15 })
    const { shop } = useProfile()
    const { data, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: [INVOICES_QUERY_KEY, { ...invoiceFilters, shopId: shop._id }],
        queryFn: ({ pageParam = 1 }) => getInvoicesService({ ...invoiceFilters, page: pageParam }),
        getNextPageParam: (lastPage) => lastPage.data.nextPage,
        refetchOnWindowFocus: false
    })

    const invoices = data?.pages.flatMap(page => page.data.data) || []

    return (
        <>
            <InvoiceManagementHeader />
            <Flex mt={9} direction={"column"} gap={6}>
                <InvoiceFilters updateInvoiceFilters={setInvoiceFilters} />
                <InvoiceTable
                    invoices={invoices}
                    isLoading={isFetching}
                    dataLength={invoices.length}
                    hasMore={hasNextPage}
                    next={fetchNextPage}
                />
            </Flex>
        </>
    )
}

export default InvoiceManagement