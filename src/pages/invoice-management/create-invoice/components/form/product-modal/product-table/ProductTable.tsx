import { ColumnDef } from '@tanstack/react-table'
import useIntersectionObserver from 'functions/hooks/intersection-observer/useIntersectionObserver'
import useProducts from 'functions/hooks/useProducts/useProducts'
import Table from 'pages/invoice-management/components/table-v2/TableV2'
import React from 'react'
import ProductRow from './components/ProductRow'

export default function ProductTable({ debouncedSearchTerm, cart, setCart }) {
    const { data, isFetching, hasNextPage, fetchNextPage, isFetchingNextPage } = useProducts(debouncedSearchTerm)
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