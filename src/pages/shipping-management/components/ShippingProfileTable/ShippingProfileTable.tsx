import { Text } from '@chakra-ui/react'
import { ColumnDef } from '@tanstack/react-table'
import DotSeparatedList from 'components/redesign/dot-separated-list/DotSeparatedList'
import Table from 'components/redesign/table/Table'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import { SHIPPING_PROFILES_QUERY_KEY } from 'pages/shipping-management/constants/constants'
import { ShippingProfile } from 'pages/shipping-management/types/shipping'
import React from 'react'
import { useQuery } from 'react-query'
import { getShippingProfiles } from 'services/shipping-management/services'
import ShippingProfileEmptyState from './ShippingProfileEmptyState'
import ShippingProfileTableActionMenu from './ShippingProfileTableActionMenu'

function ShippingProfileTable() {
    const { t } = useLocaleResources("shipping-management")
    const { data: shippingProfiles, isLoading } = useQuery({
        queryKey: [SHIPPING_PROFILES_QUERY_KEY],
        queryFn: getShippingProfiles
    })

    const columns: ColumnDef<ShippingProfile>[] = [
        {
            accessorKey: 'profileName',
            header: t('ShippingProfileTable.columns.profileName'),
            cell: info => <Text fontSize={16} fontWeight={500}>{info.row.original?.name}</Text>
        },
        {
            accessorKey: 'rates',
            header: t('ShippingProfileTable.columns.rates'),
            cell: info => {
                const { zones } = info.row.original
                const zonesCount = zones?.length
                const countriesCount = zones?.reduce((acc, zone) => acc + zone.countries.length, 0)

                return (
                    <DotSeparatedList fontSize={16}>
                        <Text>{countriesCount} {countriesCount === 1 ? t('ShippingProfileTable.values.countrySingular') : t('ShippingProfileTable.values.countryPlural')}</Text>
                        <Text>{zonesCount} {zonesCount === 1 ? t('ShippingProfileTable.values.zoneSingular') : t('ShippingProfileTable.values.zonePlural')}</Text>
                    </DotSeparatedList>
                )
            }
        },
    ]

    if (shippingProfiles?.length === 0) return <ShippingProfileEmptyState />

    return (
        <Table
            isLoading={isLoading}
            columns={columns}
            data={shippingProfiles || []}
            renderActions={(shippingProfile: ShippingProfile) => <ShippingProfileTableActionMenu shippingProfile={shippingProfile} />}
        />
    )
}

export default ShippingProfileTable