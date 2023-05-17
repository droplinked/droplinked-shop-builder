import React, { useCallback, useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import OrdersModel from './model'
import AppDataGrid from 'components/shared/datagrid/DataGrid'
import { ordersServices } from 'lib/apis/orders/orderServices'

function Orders() {
    const { mutate, isLoading } = useMutation(() => ordersServices())
    const [States, setStates] = useState({
        rows: []
    })

    // fetch data and refactor
    const fetch = useCallback(() => {
        mutate(null, {
            onSuccess: (res) => {
                setStates(prev => ({
                    ...prev, rows: OrdersModel.refactorData({
                        data: res.data.data
                    })
                }))
            }
        })
    }, [])

    useEffect(() => fetch(), [mutate])

    return (
        <>
            <AppDataGrid
                loading={isLoading}
                rows={States.rows}
            />
        </>
    )
}

export default Orders