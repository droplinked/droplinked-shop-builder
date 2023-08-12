import AppDataGrid from 'components/common/datagrid/DataGrid'
import { useProfile } from 'functions/hooks/useProfile/useProfile'
import { IproductList } from 'lib/apis/product/interfaces'
import { productServices } from 'lib/apis/product/productServices'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useMutation } from 'react-query'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import ProductListModel from './model'
import ProductEmpty from './parts/empty/ProductEmpty'
import { capitalizeFirstLetter } from 'lib/utils/heper/helpers'
import useHookStore from 'functions/hooks/store/useHookStore'

function Products() {
    const { data: { collection } } = useHookStore()
    const { mutate, isLoading, data } = useMutation((params: IproductList) => productServices(params))
    const [searchParams] = useSearchParams()
    const page = useMemo(() => parseInt(searchParams.get("page")), [searchParams]) || 1
    const products = useMemo(() => data?.data?.data, [data])
    const location = useLocation()
    const navigate = useNavigate()
    const [States, setStates] = useState({
        search: null,
    })
    const { shop } = useProfile()

    const fetch = useCallback(() => {
        const filter = searchParams.get("filter")
        mutate({ limit: 10, page: page, ...filter && { filter } })
    }, [page, searchParams])

    useEffect(() => fetch(), [mutate, page, searchParams])

    const setSearch = useCallback((keyword: string) => setStates(prev => ({ ...prev, search: keyword })), [])

    // Handle search and without search
    const rows = useMemo(() => {
        return data ? ProductListModel.refactorData({
            data: products?.data,
            fetch,
            search: States.search
        }) : []
    }, [States.search, products, fetch])

    const updateFilters = useCallback((key: string, value: string) => {
        const filter = `${key}:${value}`
        if (searchParams.get("filter") === filter) {
            searchParams.delete("filter")
        } else {
            searchParams.set("filter", filter)
            searchParams.set("page", "1")
        }
        navigate(`${location.pathname}?${searchParams.toString()}`)
    }, [searchParams, location])

    return (
        <AppDataGrid
            loading={isLoading}
            buttons={[
                {
                    caption: "Add Product",
                    to: `/${shop?.name}/c/products/types`
                }
            ]}
            rows={rows}
            filters={[
                {
                    title: "Collections",
                    list: collection.data ? collection.data.map(el => (
                        {
                            title: el?.title,
                            onClick: () => updateFilters("productCollectionID", el?._id),
                            isActive: searchParams.get("filter") === `productCollectionID:${el?._id}`
                        }
                    )) : []
                },
                {
                    title: "Status",
                    list: ["PUBLISHED", "DRAFTED"].map(el => ({
                        title: capitalizeFirstLetter(el),
                        onClick: () => updateFilters("publish_status", el),
                        isActive: searchParams.get("filter") === `publish_status:${el}`
                    }
                    ))
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