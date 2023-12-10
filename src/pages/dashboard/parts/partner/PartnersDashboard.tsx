import { VStack } from '@chakra-ui/react'
import AppTable, { ITableRows } from 'components/common/table/AppTable'
import { shopSellerService } from 'lib/apis/shop/shopServices'
import React, { useEffect, useMemo } from 'react'
import { useMutation } from 'react-query'
import HeadCardDashboard from '../parts/headcard/HeadCardDashboard'
import PartnersSelling from './parts/products/PartnersSelling'

function PartnersDashboard() {
    const { mutate, data } = useMutation(() => shopSellerService())

    useEffect(() => mutate(), [])

    const items: Array<ITableRows> = useMemo(() => {
        const list = data?.data?.data

        return list ? list.map(el => ({
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
        })) : []
    }, [data])

    return (
        <VStack align="stretch">
            <HeadCardDashboard link='' title='Best Affiliate Partner' />
            <AppTable rows={items} />
        </VStack>
    )
}

export default PartnersDashboard