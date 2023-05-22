import React, { useCallback, useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import OrdersModel from './model'
import AppDataGrid from 'common/datagrid/DataGrid'
import { ordersServices } from 'lib/apis/orders/orderServices'
import AppEmptyPage from 'common/empty/AppEmptyPage'

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
                empty={<AppEmptyPage title="No orders available yet!" />}
            />
        </>
    )
}

export default Orders