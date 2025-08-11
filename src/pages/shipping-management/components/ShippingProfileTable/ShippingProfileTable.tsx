import { Text } from '@chakra-ui/react'
import { ColumnDef } from '@tanstack/react-table'
import DotSeparatedList from 'components/redesign/dot-separated-list/DotSeparatedList'
import Table from 'components/redesign/table/Table'
import { ShippingProfile } from 'pages/shipping-management/types/shipping'
import React from 'react'
import { useQuery } from 'react-query'
import { getShippingProfiles } from 'services/shipping-management/services'
import ShippingProfileEmptyState from './ShippingProfileEmptyState'
import ShippingProfileTableActionMenu from './ShippingProfileTableActionMenu'

function ShippingProfileTable() {
    const { data: shippingProfiles, isLoading } = useQuery({
        queryKey: ['shipping-profiles'],
        queryFn: getShippingProfiles
    })

    const columns: ColumnDef<ShippingProfile>[] = [
        {
            accessorKey: 'profileName',
            header: "Profile Name",
            cell: info => <Text fontSize={16} fontWeight={500}>{info.row.original?.name}</Text>
        },
        {
            accessorKey: 'rates',
            header: "Rates",
            cell: info => {
                const { zones } = info.row.original
                const zonesCount = zones?.length
                const countriesCount = zones?.reduce((acc, zone) => acc + zone.countries.length, 0)

                return (
                    <DotSeparatedList fontSize={16}>
                        <Text>{countriesCount} {countriesCount === 1 ? 'Country' : 'Countries'}</Text>
                        <Text>{zonesCount} {zonesCount === 1 ? 'Zone' : 'Zones'}</Text>
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