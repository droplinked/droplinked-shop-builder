import { Text } from '@chakra-ui/react'
import { ColumnDef } from '@tanstack/react-table'
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
            cell: info => <Text>{info.row.original?.name}</Text>
        },
        {
            accessorKey: 'rates',
            header: "Rates",
            cell: info => <Text>{info.row.original?.zones?.length}</Text>
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