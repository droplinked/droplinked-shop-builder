import { Badge } from '@chakra-ui/react'
import React from 'react'
import useLocaleResources from "hooks/useLocaleResources/useLocaleResources"

export default function StatusBadge({ status }: { status: "SUCCESS" | "FAILED" }) {
    const { t } = useLocaleResources("creditsAndActivity")
    const statusKey = status === "SUCCESS" ? "completed" : "failed"
    const statusText = t(`transactionTable.status.${statusKey}`)

    const completedStyle = {
        bg: '#092C22',
        color: '#2BCFA1',
        borderColor: '#2BCFA1',
    }
    const failedStyle = {
        bg: 'rgba(255, 34, 68, 0.05)',
        color: '#FF2244',
        borderColor: '#FF2244',
    }

    return (
        <Badge
            border={"1px solid"}
            borderRadius={24}
            paddingBlock={1}
            paddingInline={4}
            fontSize={14}
            fontWeight={400}
            textTransform={"capitalize"}
            {...status === "SUCCESS" ? { ...completedStyle } : { ...failedStyle }}
        >
            {statusText}
        </Badge>
    )
}
