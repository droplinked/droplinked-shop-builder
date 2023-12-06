import { VStack } from '@chakra-ui/react'
import AppDataGrid from 'components/common/datagrid/DataGrid'
import AppTable, { ITableRows } from 'components/common/table/AppTable'
import React from 'react'
import HeadCardDashboard from '../parts/headcard/HeadCardDashboard'
import BestSellingProduct from './parts/product/BestSellingProduct'
import BestSellingSale from './parts/sale/BestSellingSale'

function BestSelling() {
    const items: Array<ITableRows> =
        [1, 2, 2, 2, 2].map(el => ({
            _data: null,
            product: {
                value: <BestSellingProduct />,
            },
            sale: {
                value: <BestSellingSale />,
                props: {
                    width: "30%"
                }
            },
        }))

    return (
        <VStack align="stretch">
            <HeadCardDashboard link='' title='Best Selling Products' />
            <AppTable rows={items} />
        </VStack>
    )
}

export default BestSelling