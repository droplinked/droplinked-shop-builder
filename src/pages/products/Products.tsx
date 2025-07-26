import PageGrid from 'components/redesign/page-grid/PageGrid'
import useProducts from 'hooks/products/useProducts'
import useDebounce from 'hooks/useDebounce/useDebounce'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import arLocale from 'locales/products/ar.json'
import enLocale from 'locales/products/en.json'
import React, { useState } from 'react'
import PageHeader from './components/PageHeader'
import ProductTable from './components/ProductTable/ProductTable'

function Products() {
    const [searchTerm, setSearchTerm] = useState("")
    const debouncedSearchTerm = useDebounce(searchTerm)
    const { data, isFetching, hasNextPage, fetchNextPage, isFetchingNextPage } = useProducts(debouncedSearchTerm)
    useLocaleResources('products', { en: enLocale, ar: arLocale })

    // Derived data
    const products = data?.pages?.flatMap(page => page.data.data.data) || []
    const isActionEnabled = !(products.length === 0 && !searchTerm)

    return (
        <PageGrid.Root>
            <PageHeader isActionEnabled={isActionEnabled} />

            {(isActionEnabled || isFetching) && (
                <PageGrid.Actions
                    search={{
                        value: searchTerm,
                        onChange: (e) => setSearchTerm(e.target.value),
                        disabled: !isActionEnabled
                    }}
                />
            )}

            <PageGrid.Content>
                <ProductTable
                    products={products}
                    isFetching={isFetching}
                    hasNextPage={hasNextPage}
                    fetchNextPage={fetchNextPage}
                    isFetchingNextPage={isFetchingNextPage}
                />
            </PageGrid.Content>
        </PageGrid.Root>
    )
}

export default Products