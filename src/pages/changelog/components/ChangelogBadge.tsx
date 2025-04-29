import { Badge, BadgeProps } from '@chakra-ui/react'
import { TrashSm } from 'assets/icons/Action/Trash/TrashSm'
import { BugSm } from 'assets/icons/Sign/Bug/BugSm'
import { PlusterSm } from 'assets/icons/Sign/Pluster/PlusterSm'
import { PuzzleSm } from 'assets/icons/System/Puzzle/PuzzleSm'
import { Star2Sm } from 'assets/icons/System/Star2/Star2Sm'
import React, { ReactNode } from 'react'

interface Props {
    label: string
}

const badgeStyles: Record<string, { icon: ReactNode | null, badgeProps: BadgeProps }> = {
    Integration: {
        icon: <PuzzleSm color='#c5a3ff' />,
        badgeProps: { borderColor: "label.secondary", bgColor: "label.secondary", color: "text.secondary" }
    },
    'New Feature': {
        icon: <Star2Sm color='#2bcfa1' />,
        badgeProps: { borderColor: "label.primary", bgColor: "label.primary", color: "text.primary" }
    },
    Deprecation: {
        icon: <TrashSm color='#ff2244' />,
        badgeProps: { borderColor: "label.error", bgColor: "label.error", color: "text.error" }
    },
    Improvement: {
        icon: <PlusterSm color='#179ef8' />,
        badgeProps: { borderColor: "label.link", bgColor: "label.link", color: "text.link" }
    },
    Bugfix: {
        icon: <BugSm color='#ffd951' />,
        badgeProps: { borderColor: "label.warning", bgColor: "label.warning", color: "system.warning" }
    }
}

function ChangelogBadge({ label }: Props) {
    const { icon, badgeProps } = badgeStyles[label] || {
        icon: null,
        badgeProps: { colorScheme: 'gray' }
    }

    return (
        <Badge
            display="flex"
            alignItems="center"
            gap="6px"
            border="1px solid"
            borderRadius={4}
            padding="4px 8px"
            fontSize={14}
            fontWeight={400}
            textTransform="capitalize"
            {...badgeProps}
        >
            {icon}
            {label}
        </Badge>
    )
}

export default ChangelogBadge