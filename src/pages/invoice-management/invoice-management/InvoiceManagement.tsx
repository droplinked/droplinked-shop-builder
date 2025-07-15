import { Flex } from '@chakra-ui/react'
import { useProfile } from 'hooks/useProfile/useProfile'
import { InvoiceQueryParams } from 'services/invoice/interfaces'
import { getInvoicesService } from 'services/invoice/invoiceServices'
import React, { useState } from 'react'
import { useInfiniteQuery } from 'react-query'
import InvoiceFilters from './components/InvoiceFilters'
import InvoiceManagementHeader from './components/InvoiceManagementHeader'
import InvoicesEmptyState from './components/InvoicesEmptyState'
import InvoiceTable from './components/table/InvoiceTable'

export const INVOICES_QUERY_KEY = "invoiceList"

function InvoiceManagement() {
    const [invoiceFilters, setInvoiceFilters] = useState<InvoiceQueryParams>({ page: 1, limit: 15 })
    const { shop } = useProfile()
    const { data, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: [INVOICES_QUERY_KEY, { ...invoiceFilters, shopId: shop._id }],
        queryFn: ({ pageParam = 1 }) => getInvoicesService({ ...invoiceFilters, page: pageParam }),
        getNextPageParam: (lastPage) => lastPage.data.nextPage,
    })

    const invoices = data?.pages.flatMap(page => page.data.data) || []
    const shouldShowEmptyView = !invoices.length && !invoiceFilters.search && !invoiceFilters.status && !isFetching

    return (
        <>
            <InvoiceManagementHeader />
            {shouldShowEmptyView ?
                <InvoicesEmptyState /> :
                <Flex mt={9} direction={"column"} gap={6}>
                    <InvoiceFilters updateInvoiceFilters={setInvoiceFilters} />
                    <InvoiceTable
                        invoices={invoices}
                        isLoading={isFetching}
                        dataLength={invoices.length}
                        hasMore={hasNextPage}
                        next={fetchNextPage}
                        isFetchingNextPage={isFetchingNextPage}
                    />
                </Flex>
            }
        </>
    )
}

export default InvoiceManagement