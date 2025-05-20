import { Flex, Text } from '@chakra-ui/react'
import { BuildingMd } from 'assets/icons/System/Building/BuildingMd'
import { LeafMd } from 'assets/icons/System/Leaf/LeafMd'
import { Star2Md } from 'assets/icons/System/Star2/Star2Md'
import { SuitcaseMd } from 'assets/icons/System/SuitCase/SuitcaseMd'
import AppButton from 'components/redesign/button/AppButton'
import useAppStore from 'lib/stores/app/appStore'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function MenuItemShopSubscription() {
    const navigate = useNavigate()
    const { shop } = useAppStore()

    // Get subscription information
    const subscriptionType = shop?.subscription?.subscriptionId?.type || 'STARTER'
    const daysLeft = shop?.subscription?.daysUntilExpiration || 0

    // Map for plan icons and titles
    const planInfo = {
        'STARTER': {
            icon: <LeafMd color='#FFF' />,
            title: 'Starter'
        },
        'BUSINESS': {
            icon: <SuitcaseMd color='#FFF' />,
            title: 'Pro'
        },
        'BUSINESS_PRO': {
            icon: <Star2Md color='#FFF' />,
            title: 'Premium'
        },
        'ENTERPRISE': {
            icon: <BuildingMd color='#FFF' />,
            title: 'Enterprise'
        }
    }

    // Get current plan info
    const currentPlan = planInfo[subscriptionType] || planInfo['STARTER']

    // Check if subscription has expired
    const isExpired = daysLeft === 0

    // Determine button text based on days left
    const buttonText = isExpired ? 'Upgrade' : (daysLeft === 1 ? '1 day left' : `${daysLeft} days left`)

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