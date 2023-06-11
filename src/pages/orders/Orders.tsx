import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useMutation } from 'react-query'
import OrdersModel from './model'
import AppDataGrid from 'components/common/datagrid/DataGrid'
import { ordersServices } from 'lib/apis/orders/orderServices'
import AppEmptyPage from 'components/common/empty/AppEmptyPage'

function Orders() {
    const { mutate, isLoading,data } = useMutation(() => ordersServices())
    const [States, setStates] = useState({
        search: null
    })

    useEffect(() => mutate(), [mutate])

    const setSearch = useCallback((keyword: string) => setStates(prev => ({ ...prev, search: keyword })), [])

    // Handle search and without search
    const rows = useMemo(() => {
        return data ? OrdersModel.refactorData({
            data: data.data.data,
            search: States.search
        }) : []
    }, [States.search, data])


    return (
        <>
            <AppDataGrid
                loading={isLoading}
                rows={rows}
                search={{ onChange: (e) => setSearch(e.target.value) }}
                empty={<AppEmptyPage title="No orders available yet!" />}
            />
        </>
    )
}

export default Orders