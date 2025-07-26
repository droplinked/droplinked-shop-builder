import { Badge, BadgeProps } from '@chakra-ui/react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import { InvoiceStatus } from 'services/invoice/interfaces'
import React from 'react'

function StatusBadge({ status }: { status: InvoiceStatus }) {
    const { t } = useLocaleResources('invoice-management');
    
    const statusMap: Record<InvoiceStatus, { label: string, styles: BadgeProps }> = {
        "CHECKED_OUT": {
            label: t('StatusBadge.status.checkedOut'),
            styles: {
                bg: '#092C22',
                color: '#2BCFA1',
                borderColor: '#2BCFA1',
            }
        },
        "PENDING": {
            label: t('common:pending'),
            styles: {
                bg: '#FF22441A',
                color: '#FF2244',
                borderColor: '#FF2244',
            }
        },
        "ACTIVE": {
            label: t('common:active'),
            styles: {
                bg: '#292929',
                color: '#fff',
                borderColor: '#616161',
            }
        }
    }

    const { label, styles } = statusMap[status]

    return (
        <Badge
            border="1px solid"
            borderRadius={24}
            paddingBlock={1}
            paddingInline={4}
            fontSize={14}
            fontWeight={400}
            textTransform="capitalize"
            {...styles}
        >
            {label}
        </Badge>
    )
}

export default StatusBadge