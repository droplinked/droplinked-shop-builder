import { VStack } from '@chakra-ui/react'
import { ITableRows } from 'components/common/table/AppTable'
import { shopSellerService } from 'lib/apis/shop/shopServices'
import React, { useEffect, useMemo } from 'react'
import { useMutation } from 'react-query'
import HeadCardDashboard from '../parts/headcard/HeadCardDashboard'
import DashboardTable from '../parts/table/DashboardTable'
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
                    width: "20%"
                }
            },
            orders: {
                value: el?.ordersCount,
                props: {
                    width: "20%"
                }
            },
            profit: {
                value: el?.totalAmount.toFixed(2),
                caption: 'Your Profit',
                props: {
                    width: "20%"
                }
            },
            involvement: {
                value: el?.involvement,
                props: {
                    width: "20%"
                }
            },
            selling: {
                value: <PartnersSelling product={el?.products} />,
                caption: 'Best Selling Products',
                props: {
                    width: "20%"
                }
            },
        })) : []
    }, [data])

    return (
        <VStack align="stretch">
            <HeadCardDashboard title='Best Affiliate Partner' />
            {isLoading ? <PartnersLoading /> : <DashboardTable items={items} />}
        </VStack>
    )
}

export default PartnersDashboard