import { Flex, useDisclosure } from '@chakra-ui/react'
import { getSubscriptionPlansService } from 'lib/apis/subscription/subscriptionServices'
import useSubscriptionPlanPurchaseStore from 'lib/stores/subscription-plan.ts/subscriptionPlanStore'
import SubscriptionPlanCheckoutModal from 'pages/subscription-plans/_components/plans/_components/checkout/SubscriptionPlanCheckoutModal'
import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import PlanFeatures from './PlanFeatures'
import PlansContainer from './PlansContainer'

export default function UpgradePlan() {
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
            bg={"neutral.gray.1000"}
            position="relative"
            zIndex={1}
            overflow="hidden"
        >
            <PlanFeatures onOpen={onOpen} isFetching={isFetching} />
            <PlansContainer onOpen={onOpen} isFetching={isFetching} />
            <SubscriptionPlanCheckoutModal close={onClose} isOpen={isOpen} />
        </Flex>
    )
}
