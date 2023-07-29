import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useMutation } from 'react-query'
import OrdersModel from './model'
import AppDataGrid from 'components/common/datagrid/DataGrid'
import { ordersServices } from 'lib/apis/orders/orderServices'
import AppEmptyPage from 'components/common/empty/AppEmptyPage'
import { useSearchParams } from 'react-router-dom'
import { IordersServices } from 'lib/apis/orders/interfaces'

function Orders() {
    const { mutate, isLoading, data } = useMutation((params: IordersServices) => ordersServices(params))
    const [States, setStates] = useState({
        search: null
    })

    const [searchParams] = useSearchParams()
    const page = useMemo(() => parseInt(searchParams.get("page")), [searchParams]) || 1

    const fetch = useCallback(() => {
        mutate({ page })
    }, [page, searchParams])

    useEffect(() => fetch(), [mutate, page])

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