import { Text } from '@chakra-ui/react'
import { ColumnDef } from '@tanstack/react-table'
import Table from 'components/redesign/table/Table'
import React from 'react'
import ShippingProfileEmptyState from './ShippingProfileEmptyState'
import ShippingProfileTableActionMenu from './ShippingProfileTableActionMenu'

interface Props {
    searchTerm: string
}

function ShippingProfileTable({ searchTerm }: Props) {
    const shippingProfiles = [
        // { id: 1, profileName: 'Standard Shipping', rates: 'Standard shipping profile' },
    ]

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: 'profileName',
            header: "Profile Name",
            cell: info => <Text>{info.row.original.profileName}</Text>
        },
        {
            accessorKey: 'rates',
            header: "Rates",
            cell: info => <Text>{info.row.original.rates}</Text>
        },
    ]

    if (shippingProfiles.length === 0) return <ShippingProfileEmptyState />

    return (
        <Table
            isLoading={false}
            columns={columns}
            data={shippingProfiles}
            renderActions={(shippingProfile: any) => <ShippingProfileTableActionMenu shippingProfile={shippingProfile} />}
        />
    )
}

export default ShippingProfileTable