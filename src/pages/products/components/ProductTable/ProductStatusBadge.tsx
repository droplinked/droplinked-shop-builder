import { Badge, BadgeProps } from '@chakra-ui/react'
import React from 'react'

interface Props {
    status: string
    purchaseAvailable: boolean
}

export default function ProductStatusBadge({ status, purchaseAvailable }: Props) {
    const badgeKey = purchaseAvailable ? status : 'PRIVATE'
    const badgeProps = statusMap[badgeKey]

    return (
        <Badge
            border="1px solid"
            borderRadius={24}
            padding="2px 12px"
            fontSize={14}
            fontWeight={400}
            textTransform="capitalize"
            {...badgeProps}
        >
            {badgeProps?.label}
        </Badge>
    )
}

const statusMap: Record<string, BadgeProps & { label: string }> = {
    "PUBLISHED": {
        bg: 'rgba(43, 207, 161, 0.10)',
        color: '#2BCFA1',
        borderColor: '#2BCFA1',
        label: 'Public'
    },
    "DRAFT": {
        bg: '#292929',
        color: '#fff',
        borderColor: '#616161',
        label: 'Draft'
    },
    "PRIVATE": {
        bg: 'rgba(255, 34, 68, 0.05)',
        color: '#F24',
        borderColor: '#F24',
        label: 'Private'
    }
}