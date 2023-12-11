import { VStack } from '@chakra-ui/react'
import AppTable, { ITableRows } from 'components/common/table/AppTable'
import { shopDashboardService } from 'lib/apis/shop/shopServices'
import React, { useEffect, useMemo } from 'react'
import { useMutation } from 'react-query'
import DashboardEmpty from '../parts/empty/DashboardEmpty'
import HeadCardDashboard from '../parts/headcard/HeadCardDashboard'
import BestSellingLoading from './parts/loading/BestSellingLoading'
import BestSellingProduct from './parts/product/BestSellingProduct'
import BestSellingSale from './parts/sale/BestSellingSale'

function BestSelling() {
    const { mutate, data, isLoading } = useMutation(() => shopDashboardService())

    useEffect(() => mutate(), [])

    const items: Array<ITableRows> = useMemo(() => {
        return data?.data?.data ? data?.data?.data.map(el => ({
            _data: el,
            product: {
                value: <BestSellingProduct product={el} />,
            },
            sale: {
                value: <BestSellingSale product={el} />,
                props: {
                    width: "30%"
                }
            },
        })) : []
    }, [data])

    return (
        <VStack align="stretch">
            <HeadCardDashboard link='' title='Best Selling Products' />
            {isLoading ? <BestSellingLoading /> : <AppTable empty={<DashboardEmpty />} rows={items} />}
        </VStack>
    )
}

export default BestSelling