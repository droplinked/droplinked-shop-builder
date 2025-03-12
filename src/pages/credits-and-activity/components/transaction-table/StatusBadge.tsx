import AppBadge from 'components/redesign/badge/AppBadge'
import React from 'react'

interface Props {
    status: string
}

export default function StatusBadge({ status }: Props) {
    const badgeProps = statusMap[status]

    return (
        <AppBadge
            text={badgeProps.label}
            status={badgeProps.status}
            size="24"
        />
    )
}

const statusMap: Record<string, { label: string, status: "success" | "neutral" | "error" | "pending" }> = {
    "SUCCESS": {
        status: "success",
        label: 'Success'
    },
    "PENDING": {
        status: "pending",
        label: 'Pending'
    },
    "FAILED": {
        status: "error",
        label: 'Failed'
    },
    "CANCELLED": {
        status: "neutral",
        label: 'Cancelled'
    }
} 