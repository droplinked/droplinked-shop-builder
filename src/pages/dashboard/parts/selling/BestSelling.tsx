import { VStack } from '@chakra-ui/react'
import { ITableRows } from 'components/common/table/AppTable'
import { getBestSelledProducts } from 'lib/apis/dashboard/dashboardServices'
import { IbestProducts } from 'lib/apis/dashboard/interfaces'
import dashboardPageContext from 'pages/dashboard/context'
import React, { useContext, useEffect, useMemo } from 'react'
import { useMutation } from 'react-query'
import HeadCardDashboard from '../parts/headcard/HeadCardDashboard'
import DashboardTable from '../parts/table/DashboardTable'
import BestSellingLoading from './parts/loading/BestSellingLoading'
import BestSellingProduct from './parts/product/BestSellingProduct'
import BestSellingSale from './parts/sale/BestSellingSale'

function BestSelling() {
    const { states: { dateRange: { from, to } } } = useContext(dashboardPageContext)
    const { mutate, data, isLoading } = useMutation((params: IbestProducts) => getBestSelledProducts(params))
    useEffect(() => mutate({ from, to }), [from, to])

    const items: Array<ITableRows> = useMemo(() => {
        return data?.data?.data ? data?.data?.data.map(el => ({
            _data: el,
            product: {
                value: <BestSellingProduct product={el} />,
                props: {
                    width: "100%"
                }
            },
            sale: {
                value: <BestSellingSale product={el} />,
                props: {
                    width: "auto",
                    style: { paddingRight: "0" }
                }
            },
        })) : []
    }, [data])

    return (
        <VStack align="stretch">
            <HeadCardDashboard title='Best Selling Products' />
            {isLoading ? <BestSellingLoading /> : <DashboardTable items={items} />}
        </VStack>
    )
}

export default BestSelling