import { Badge, BadgeProps } from '@chakra-ui/react'
import { InvoiceStatus } from 'lib/apis/invoice/interfaces'
import React from 'react'

const statusMap: Record<InvoiceStatus, { label: string, styles: BadgeProps }> = {
    "CHECKED_OUT": {
        label: "Checked Out",
        styles: {
            bg: '#092C22',
            color: '#2BCFA1',
            borderColor: '#2BCFA1',
        }
    },
    "PENDING": {
        label: "Pending",
        styles: {
            bg: '#292929',
            color: '#fff',
            borderColor: '#616161',
        }
    },
    "ACTIVE": {
        label: "Active",
        styles: {
            bg: '#FF22441A',
            color: '#FF2244',
            borderColor: '#FF2244',
        }
    }
}

function StatusBadge({ status }: { status: InvoiceStatus }) {
    const { label, styles } = statusMap[status]

    return (
        <Badge
            border={"1px solid"}
            borderRadius={24}
            paddingBlock={1}
            paddingInline={4}
            fontSize={14}
            fontWeight={400}
            textTransform={"capitalize"}
            {...styles}
        >
            {label}
        </Badge>
    )
}

export default StatusBadge