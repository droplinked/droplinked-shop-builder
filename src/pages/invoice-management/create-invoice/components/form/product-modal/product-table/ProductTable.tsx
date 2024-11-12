import { ColumnDef } from '@tanstack/react-table'
import useIntersectionObserver from 'functions/hooks/intersection-observer/useIntersectionObserver'
import { productServices } from 'lib/apis/product/productServices'
import Table from 'pages/invoice-management/components/table-v2/TableV2'
import React from 'react'
import { useInfiniteQuery } from 'react-query'
import ProductRow from './components/ProductRow'

export default function ProductTable({ debouncedSearchTerm, cart, setCart }) {
    const { data, isFetching, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ["products", debouncedSearchTerm],
        queryFn: ({ pageParam = 1 }) => productServices({ page: pageParam, limit: 15, filter: debouncedSearchTerm }),
        getNextPageParam: (lastPage) => lastPage.data.data.nextPage,
    })
    const products = data?.pages?.flatMap(page => page.data.data.data) || []

    const columns: ColumnDef<any>[] = [
        { accessorKey: '', header: 'Product' },
        { accessorKey: '', header: 'Variants' },
        { accessorKey: 'quantity', header: 'Quantity' },
        { accessorKey: 'skuIDs', header: 'Unit price' }
    ]

    const lastSKURef = useIntersectionObserver<HTMLTableRowElement>(() => {
        if (hasNextPage) fetchNextPage()
    }, [])

    return (
        <Table.Root
            columns={columns}
            hasActionColumn={true}
        >
            <Table.Head data={products} />
            <Table.Body isLoading={isFetching} infiniteScroll={{ isFetchingNextPage }}>
                {products.map((product, index, products) =>
                    <ProductRow key={index}
                        ref={index === products.length - 1 ? lastSKURef : null}
                        product={product}
                        cart={cart}
                        setCart={setCart}
                    />
                )}
            </Table.Body>
        </Table.Root>
    )
}