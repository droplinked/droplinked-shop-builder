import AppDataGrid from 'components/common/datagrid/DataGrid'
import { useProfile } from 'functions/hooks/useProfile/useProfile'
import { productServices } from 'lib/apis/product/productServices'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useMutation } from 'react-query'
import ProductListModel from './model'
import ProductEmpty from './parts/empty/ProductEmpty'

function Products() {
    const { mutate, isLoading, data } = useMutation(() => productServices())
    const [States, setStates] = useState({
        search: null
    })
    const { shop } = useProfile()

    useEffect(() => mutate(), [mutate])

    const setSearch = useCallback((keyword: string) => setStates(prev => ({ ...prev, search: keyword })), [])

    // Handle search and without search
    const rows = useMemo(() => {
        return data ? ProductListModel.refactorData({
            data: data.data.data,
            fetch: mutate,
            search: States.search
        }) : []
    }, [States.search, data])

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
            search={{ onChange: (e) => setSearch(e.target.value) }}
            empty={<ProductEmpty />}
        />
    )
}

export default Products