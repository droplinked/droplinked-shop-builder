import AppBadge from 'components/redesign/badge/AppBadge';
import { IDetailedTransaction } from 'services/credit/interfaces';
import React from 'react';

export default function StatusBadge({ status }: { status: IDetailedTransaction["status"] }) {
    const statusMapping = {
        "SUCCESS": { badgeStatus: "success" as const, text: "Completed" },
        "FAILED": { badgeStatus: "error" as const, text: "Failed" },
        "PENDING": { badgeStatus: "pending" as const, text: "Pending" }
    }

    // Use the mapped status if available, otherwise default to neutral with the status as text
    const { badgeStatus, text } = statusMapping[status] || {
        badgeStatus: "neutral" as const,
        text: status?.charAt(0) + status?.slice(1).toLowerCase()
    }

    return (
        <AppBadge
            text={text}
            status={badgeStatus}
            fontSize={14}
            paddingBlock={1}
            paddingInline={4}
        />
    )
}
