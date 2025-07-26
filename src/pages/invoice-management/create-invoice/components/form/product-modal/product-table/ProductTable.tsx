import { ColumnDef } from '@tanstack/react-table'
import useIntersectionObserver from 'hooks/intersection-observer/useIntersectionObserver'
import useProducts from 'hooks/products/useProducts'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import arLocale from 'locales/invoice-management/ar.json'
import enLocale from 'locales/invoice-management/en.json'
import Table from 'pages/invoice-management/components/table-v2/TableV2'
import React from 'react'
import ProductRow from './components/ProductRow'

export default function ProductTable({ debouncedSearchTerm, cart, setCart }) {
    const { t } = useLocaleResources('invoice-management', { en: enLocale, ar: arLocale })
    const { data, isFetching, hasNextPage, fetchNextPage, isFetchingNextPage } = useProducts(debouncedSearchTerm)
    const products = data?.pages?.flatMap(page => page.data.data.data) || []

    const columns: ColumnDef<any>[] = [
        { accessorKey: '', header: t('ProductTable.columns.product') },
        { accessorKey: '', header: t('ProductTable.columns.variants') },
        { accessorKey: 'quantity', header: t('ProductTable.columns.quantity') },
        { accessorKey: 'skuIDs', header: t('ProductTable.columns.unitPrice') }
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