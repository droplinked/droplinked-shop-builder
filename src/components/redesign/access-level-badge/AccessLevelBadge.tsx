import AppIcons from 'assets/icon/Appicons'
import React from 'react'
import AppLabel from '../label/AppLabel'

/**
 * AccessLevelBadge Component - Displays subscription plan access level
 * 
 * Shows a badge with appropriate styling and icon based on the subscription
 * level (Pro, Premium, or Enterprise) with optional "Feature" text.
 * 
 * @param {object} props - Component props
 * @param {('Pro'|'Premium'|'Enterprise')} props.level - The subscription level to display
 * @param {boolean} [props.justLevel] - Whether to show only the level name without "Feature" text
 */
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