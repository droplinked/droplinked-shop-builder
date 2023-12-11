import { VStack } from '@chakra-ui/react'
import AppTable, { ITableRows } from 'components/common/table/AppTable'
import { shopSellerService } from 'lib/apis/shop/shopServices'
import React, { useEffect, useMemo } from 'react'
import { useMutation } from 'react-query'
import DashboardEmpty from '../parts/empty/DashboardEmpty'
import HeadCardDashboard from '../parts/headcard/HeadCardDashboard'
import PartnersLoading from './parts/loading/PartnersLoading'
import PartnersSelling from './parts/products/PartnersSelling'

function PartnersDashboard() {
    const { mutate, data, isLoading } = useMutation(() => shopSellerService())

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
                value: el?.ordersCount,
                props: {
                    width: "19%"
                }
            },
            profit: {
                value: el?.totalAmount.toFixed(2),
                caption: 'Your Profit',
                props: {
                    width: "19%"
                }
            },
            involvement: {
                value: el?.involvement,
                props: {
                    width: "19%"
                }
            },
            selling: {
                value: <PartnersSelling product={el?.products} />,
                caption: 'Best Selling Products'
            },
        })) : []
    }, [data])

    return (
        <VStack align="stretch">
            <HeadCardDashboard link='' title='Best Affiliate Partner' />
            {isLoading ? <PartnersLoading /> : <AppTable empty={<DashboardEmpty />} rows={items} />}
        </VStack>
    )
}

export default PartnersDashboard