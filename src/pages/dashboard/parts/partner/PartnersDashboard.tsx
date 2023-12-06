import { VStack } from '@chakra-ui/react'
import AppTable, { ITableRows } from 'components/common/table/AppTable'
import React from 'react'
import HeadCardDashboard from '../parts/headcard/HeadCardDashboard'
import PartnersSelling from './parts/products/PartnersSelling'

function PartnersDashboard() {
    const items: Array<ITableRows> =
        [1, 2, 2, 2, 2].map(el => ({
            _data: null,
            name: {
                value: 'Sample',
                props: {
                    width: "19%"
                }
            },
            orders: {
                value: 'Sample',
                props: {
                    width: "19%"
                }
            },
            profit: {
                value: 'Sample',
                caption: 'Your Profit',
                props: {
                    width: "19%"
                }
            },
            involvement: {
                value: 'Sample',
                props: {
                    width: "19%"
                }
            },
            selling: {
                value: <PartnersSelling />,
                caption: 'Best Selling Products'
            },
        }))

    return (
        <VStack align="stretch">
            <HeadCardDashboard link='' title='Best Affiliate Partner' />
            <AppTable rows={items} />
        </VStack>
    )
}

export default PartnersDashboard