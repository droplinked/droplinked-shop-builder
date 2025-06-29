import AppBadge from 'components/redesign/badge/AppBadge'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'

interface Props {
    status: string
    purchaseAvailable: boolean
}

export default function ProductStatusBadge({ status, purchaseAvailable }: Props) {
    const { t } = useLocaleResources('products');
    const badgeKey = purchaseAvailable ? status : 'PRIVATE'
    
    const statusMap: Record<string, { label: string, status: "success" | "neutral" | "error" }> = {
        "PUBLISHED": {
            status: "success",
            label: t('productTable.status.public')
        },
        "DRAFTED": {
            status: "neutral",
            label: t('productTable.status.draft')
        },
        "PRIVATE": {
            status: "error",
            label: t('productTable.status.private')
        }
    }
    
    const badgeProps = statusMap[badgeKey]

    return (
        <AppBadge
            text={badgeProps.label}
            status={badgeProps.status}
            size="24"
        />
    )
}