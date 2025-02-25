import { Badge } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import React, { JSX } from 'react'

export interface AccessLevelBadgeProps {
    level: 'Pro' | 'Premium' | 'Enterprise'
    justLevel?: boolean
}

function AccessLevelBadge({ level, justLevel }: AccessLevelBadgeProps) {
    // TODO: Replace Pro and Enterprise with respective icons
    const iconMap: Record<string, JSX.Element> = {
        "Pro": <AppIcons.PremiumPlanGreenStarIcon />,
        "Premium": <AppIcons.PremiumPlanGreenStarIcon />,
        "Enterprise": <AppIcons.PremiumPlanGreenStarIcon />
    }

    return (
        <Badge
            display="flex"
            alignItems="center"
            gap="6px"
            borderRadius={4}
            padding="4px 8px"
            bgColor="rgba(43, 207, 161, 0.10)"
            color="#2BCFA1"
            fontSize={14}
            fontWeight={400}
            textTransform="capitalize"
        >
            {iconMap[level]}
            {level} {!justLevel && "Feature"}
        </Badge>
    )
}

export default AccessLevelBadge