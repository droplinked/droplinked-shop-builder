import AppBadge from 'components/redesign/badge/AppBadge'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import arLocale from 'locales/products/ar.json'
import enLocale from 'locales/products/en.json'
import React from 'react'

interface Props {
    status: string
    purchaseAvailable: boolean
}

export default function ProductStatusBadge({ status, purchaseAvailable }: Props) {
    const { t } = useLocaleResources('products', { en: enLocale, ar: arLocale })
    const normalizedStatus = String(status).toUpperCase()
    const badgeKey = purchaseAvailable ? normalizedStatus : 'PRIVATE'
    
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
    
    const badgeProps = statusMap[badgeKey] || statusMap['PRIVATE']

    if (!badgeProps) {
        return (
            <AppBadge
                text="Unknown"
                status="neutral"
                size="24"
            />
        )
    }

    return (
        <AppBadge
            text={badgeProps.label}
            status={badgeProps.status}
            size="24"
        />
    )
}