import { Badge, BadgeProps } from '@chakra-ui/react'
import React from 'react'

const statusMap: Record<string, BadgeProps> = {
    "Public": {
        bg: '#092C22',
        color: '#2BCFA1',
        borderColor: '#2BCFA1'
    },
    "Draft": {
        bg: '#292929',
        color: '#fff',
        borderColor: '#616161',
    }
}

function ProductStatusBadge({ status }: { status: string }) {
    const badgeProps = statusMap[status]

    return (
        <Badge
            border="1px solid"
            borderRadius={24}
            paddingBlock="2px"
            paddingInline={3}
            fontSize={14}
            fontWeight={400}
            textTransform="capitalize"
            {...badgeProps}
        >
            {status}
        </Badge>
    )
}

export default ProductStatusBadge