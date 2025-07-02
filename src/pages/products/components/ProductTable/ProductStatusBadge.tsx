import AppBadge from 'components/redesign/badge/AppBadge'
import React from 'react'

interface Props {
    status: string
    purchaseAvailable: boolean
}

export default function ProductStatusBadge({ status, purchaseAvailable }: Props) {
    const normalizedStatus = String(status).toUpperCase()
    const badgeKey = purchaseAvailable ? normalizedStatus : 'PRIVATE'
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

const statusMap: Record<string, { label: string, status: "success" | "neutral" | "error" }> = {
    "PUBLISHED": {
        status: "success",
        label: 'Public'
    },
    "DRAFTED": {
        status: "neutral",
        label: 'Draft'
    },
    "PRIVATE": {
        status: "error",
        label: 'Private'
    }
}