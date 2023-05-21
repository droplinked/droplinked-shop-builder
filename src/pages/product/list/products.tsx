import AppDataGrid from 'components/shared/datagrid/DataGrid'
import { useProfile } from 'hooks/useProfile/useProfile'
import { productServices } from 'lib/apis/product/productServices'
import React, { useCallback, useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import ProductListModel from './model'
import ProductEmpty from './parts/empty/ProductEmpty'

function Products() {
    const { mutate, isLoading } = useMutation(() => productServices())
    const [States, setStates] = useState({
        rows: []
    })
    const { shop } = useProfile()

    // fetch data and refactor
    const fetch = useCallback(() => {
        mutate(null, {
            onSuccess: (res) => {
                setStates(prev => ({
                    ...prev, rows: ProductListModel.refactorData({
                        data: res.data.data,
                        fetch
                    })
                }))
            }
        })
    }, [])

    useEffect(() => fetch(), [mutate])

    return (
        <AppDataGrid
            loading={isLoading}
            buttons={[
                {
                    caption: "Add Product",
                    to: `/${shop?.name}/c/products/create`
                }
            ]}
            rows={States.rows}
            empty={<ProductEmpty />}
        />
    )
}

export default Products