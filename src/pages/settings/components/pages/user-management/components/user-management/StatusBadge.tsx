import { Badge } from '@chakra-ui/react'
import React from 'react'

export default function StatusBadge({ status }: { status: string }) {
    const statusText = status === "PENDING" ? "Invitation Sent" : "Administrator"
    const invitationSentStyles = {
        bg: '#092C22',
        color: '#2BCFA1',
        borderColor: '#2BCFA1',
    }
    const administratorStyles = {
        bg: 'neutral.gray.800',
        color: 'neutral.white',
        borderColor: 'neutral.gray.600',
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
            {...status === "PENDING" ? { ...invitationSentStyles } : { ...administratorStyles }}
        >
            {statusText}
        </Badge>
    )
}
