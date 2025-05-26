import AppBadge from 'components/redesign/badge/AppBadge'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'

interface Props {
    status: string
}

export default function StatusBadge({ status }: Props) {
    const { t } = useLocaleResources("creditsAndActivity")
    const badgeProps = getStatusProps(status, t)

    return (
        <AppBadge
            text={badgeProps.label}
            status={badgeProps.status}
            size="24"
        />
    )
}

const getStatusProps = (status: string, t: (key: string) => string) => {
    const statusMapping: Record<string, { label: string, status: "success" | "neutral" | "error" | "pending" }> = {
        "SUCCESS": {
            status: "success",
            label: t("transactionTable.status.success")
        },
        "PENDING": {
            status: "pending",
            label: t("transactionTable.status.pending")
        },
        "FAILED": {
            status: "error",
            label: t("transactionTable.status.failed")
        },
        "CANCELLED": {
            status: "neutral",
            label: t("transactionTable.status.cancelled")
        }
    }

    return statusMapping[status] || statusMapping["PENDING"]
}