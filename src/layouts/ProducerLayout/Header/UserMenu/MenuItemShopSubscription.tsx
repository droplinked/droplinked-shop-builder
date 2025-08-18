import { Flex, Text } from '@chakra-ui/react'
import { BuildingMd } from 'assets/icons/System/Building/BuildingMd'
import { LeafMd } from 'assets/icons/System/Leaf/LeafMd'
import { Star2Md } from 'assets/icons/System/Star2/Star2Md'
import { SuitcaseMd } from 'assets/icons/System/SuitCase/SuitcaseMd'
import AppButton from 'components/redesign/button/AppButton'
import useAppStore from 'stores/app/appStore'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import EnLocale from 'locales/subscription/en.json'
import ArLocale from 'locales/subscription/ar.json'

function MenuItemShopSubscription() {
    const navigate = useNavigate()
    const { shop } = useAppStore()
    const { t } = useLocaleResources('subscription', {
        en: EnLocale,
        ar: ArLocale
    })

    // Get subscription information
    const subscriptionType = shop?.subscription?.subscriptionId?.type || 'STARTER'
    const daysLeft = shop?.subscription?.daysUntilExpiration || 0

    // Map for plan icons and titles
    const planInfo = {
        'STARTER': {
            icon: <LeafMd color='#FFF' />,
            title: t('PlanCard.starter.title')
        },
        'BUSINESS': {
            icon: <SuitcaseMd color='#FFF' />,
            title: t('PlanCard.pro.title')
        },
        'BUSINESS_PRO': {
            icon: <Star2Md color='#FFF' />,
            title: t('PlanCard.premium.title')
        },
        'ENTERPRISE': {
            icon: <BuildingMd color='#FFF' />,
            title: t('PlanCard.enterprise.title')
        }
    }

    // Get current plan info
    const currentPlan = planInfo[subscriptionType] || planInfo['STARTER']

    // Check if subscription has expired
    const isExpired = daysLeft === 0

    const formatDuration = (days: number) => {
        if (days < 30) {
            // Less than a month: show days
            return `${days} ${days === 1 ? t("common.day") : t("common.days")}`
        } else if (days < 365) {
            // Less than a year: show months
            const months = Math.floor(days / 30)            
                return `${months} ${
                    months === 1 ? t("common.month") : t("common.months")
                }`     
        } else {
            // More than a year: show year
            const years = Math.floor(days / 365)
            return `${years} ${
                years === 1 ? t("common.year") : t("common.years")
            }`
        }
    }

    // Determine button text based on days left
    const buttonText = isExpired || subscriptionType === 'STARTER'
        ? t("Plans.cta.upgrade")
        : `${formatDuration(daysLeft)} ${t("common.left")}`

    return (
        <Flex
            className='menuItem'
            align='center'
            gap={3}
            marginInline={4}
        >
            {currentPlan.icon}
            <Text flex={1} fontSize={14} color="text.white">{currentPlan.title}</Text>
            <AppButton
                variant={isExpired ? 'normal' : 'secondary'}
                size='sm'
                padding='8px 12px'
                onClick={() => navigate('/analytics/plans')}
            >
                {buttonText}
            </AppButton>
        </Flex>
    )
}

export default MenuItemShopSubscription