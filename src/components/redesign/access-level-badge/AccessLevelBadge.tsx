import AppIcons from 'assets/icon/Appicons'
import React from 'react'
import AppLabel from '../label/AppLabel'

export interface AccessLevelBadgeProps {
    level: 'Pro' | 'Premium' | 'Enterprise'
    justLevel?: boolean
}

function AccessLevelBadge({ level, justLevel }: AccessLevelBadgeProps) {
    // TODO: Replace Pro and Enterprise with respective icons
    const iconMap: Record<string, React.FunctionComponent<React.SVGProps<SVGSVGElement>>> = {
        "Pro": AppIcons.PremiumPlanGreenStarIcon,
        "Premium": AppIcons.PremiumPlanGreenStarIcon,
        "Enterprise": AppIcons.PremiumPlanGreenStarIcon
    }

    return (
        <AppLabel
            text={`${level} ${!justLevel ? "Feature" : ""}`}
            variant="muted"
            status="success"
            size="28"
            leftIcon={iconMap[level]}
        />
    )
}

export default AccessLevelBadge