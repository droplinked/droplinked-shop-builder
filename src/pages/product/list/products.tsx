import AppDataGrid from 'components/common/datagrid/DataGrid'
import { useProfile } from 'functions/hooks/useProfile/useProfile'
import { IproductList } from 'lib/apis/product/interfaces'
import { productServices } from 'lib/apis/product/productServices'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useMutation } from 'react-query'
import { useParams, useSearchParams } from 'react-router-dom'
import ProductListModel from './model'
import ProductEmpty from './parts/empty/ProductEmpty'

function Products() {
    const { mutate, isLoading, data } = useMutation((params: IproductList) => productServices(params))
    const [searchParams] = useSearchParams()
    const page = useMemo(() => parseInt(searchParams.get("page")), [searchParams]) || 1
    const products = useMemo(() => data?.data?.data, [data])
    const [States, setStates] = useState({
        search: null,
        filters: {
            collection: false
        }
    })
    const { shop } = useProfile()

    useEffect(() => mutate({ limit: 3, page: page }), [mutate, page])

    const setSearch = useCallback((keyword: string) => setStates(prev => ({ ...prev, search: keyword })), [])

    // Handle search and without search
    const rows = useMemo(() => {
        return data ? ProductListModel.refactorData({
            data: products?.data,
            fetch: mutate,
            search: States.search
        }) : []
    }, [States.search, products])

    return (
        <AppDataGrid
            loading={isLoading}
            buttons={[
                {
                    caption: "Add Product",
                    to: `/${shop?.name}/c/products/create`
                }
            ]}
            rows={rows}
            filters={[
                {
                    title: "Sort",
                    list: [
                        {
                            title: "Collection",
                            onClick: () => setStates(prev => ({ ...prev, filters: { ...prev.filters, collection: !prev.filters.collection } }))
                        }
                    ]
                }
            ]}
            search={{ onChange: (e) => setSearch(e.target.value) }}
            empty={<ProductEmpty />}
            pagination={{
                lastPage: products?.totalPages ? parseInt(products?.totalPages) : 1,
                current: page,
                nextPage: products?.hasNextPage || false,
                prevPage: products?.hasPreviousPage || false
            }}
        />
    )
}

export default Products