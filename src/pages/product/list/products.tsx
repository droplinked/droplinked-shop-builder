import AppDataGrid from 'components/shared/datagrid/DataGrid'
import { useProfile } from 'hooks/useProfile/useProfile'
import { productServices } from 'lib/apis/product/productServices'
import React, { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import ProductListModel from './model'

function Products() {
    const { mutate, isLoading } = useMutation(() => productServices())
    const [States, setStates] = useState({
        rows: []
    })
    const { shop } = useProfile()

    // fetch data and refactor
    useEffect(() => {
        mutate(null, {
            onSuccess: (res) => {
                setStates(prev => ({ ...prev, rows: ProductListModel.refactorData(res.data.data) }))
            }
        })
    }, [mutate])

    return (
        <AppDataGrid
            filters={[
                {
                    title: "sort",
                    list: [
                        {
                            title: "asc",
                            onClick: () => { }
                        },
                        {
                            title: "desc",
                            onClick: () => { }
                        }
                    ]
                }
            ]}
            loading={isLoading}
            buttons={[
                {
                    caption: "Add Product",
                    to: `/${shop.name}/c/add-product`
                }
            ]}
            rows={States.rows}
        />
    )
}

export default Products