import { Flex, useDisclosure } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import PlanFeatures from './PlanFeatures'
import PlansContainer from './PlansContainer'
import SubscriptionPlanCheckoutModal from 'pages/subscription-plans/_components/plans/_components/checkout/SubscriptionPlanCheckoutModal'
import useSubscriptionPlanPurchaseStore from 'pages/subscription-plans/_components/plans/store/planPurchaseStore'
import { useQuery } from 'react-query'
import { getSubscriptionPlansService } from 'lib/apis/subscription/subscriptionServices'
import { useProfile } from 'hooks/useProfile/useProfile'

export default function UpgradePlan() {
    const { profile } = useProfile()
    const updateSelectedPlan = useSubscriptionPlanPurchaseStore((state) => state.updateSelectedPlan)
    const { isOpen, onClose, onOpen } = useDisclosure()
    const { isFetching, data } = useQuery({
        queryKey: ["subscription-plans"],
        queryFn: () => getSubscriptionPlansService()
    })

    useEffect(() => {
        if (isFetching === false && data?.data) {
            const premiumPlan = data.data.find((item) => item.type === "BUSINESS_PRO")
            updateSelectedPlan(premiumPlan)
        }
        return () => {
            updateSelectedPlan(null)
        }
    }, [isFetching, data])

    return (
        <Flex
            borderRadius={"8px"}
            justifyContent={"space-between"}
            alignItems={"start"}
            bg={"#1C1C1C"}
            position="relative"
            zIndex={1}
            overflow="hidden"
        >
            <PlanFeatures onOpen={onOpen} isFetching={isFetching} />
            <PlansContainer onOpen={onOpen} isFetching={isFetching} />
            <SubscriptionPlanCheckoutModal
                close={onClose}
                isOpen={isOpen}
                isFromPlansPage={false}
                isLoggedInViaGoogle={false}
                hasProfile={profile}
            />
        </Flex>

    )
}
