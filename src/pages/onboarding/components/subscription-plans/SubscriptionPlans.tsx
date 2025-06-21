import { Grid } from "@chakra-ui/react"
import { ExternalarrowMd } from "assets/icons/Navigation/ExternalArrow/ExternalarrowMd"
import BlueButton from "components/redesign/button/BlueButton"
import PlanDurationRadioContainer from "components/redesign/plan-duration-radio/PlanDurationRadioContainer"
import { SubscriptionPlan } from "lib/apis/subscription/interfaces"
import { getSubscriptionPlansService } from "lib/apis/subscription/subscriptionServices"
import { PlanType } from "pages/onboarding/types/onboarding"
import useSubscriptionPlanStore from "stores/subscription-plan.ts/subscriptionPlanStore"
import Loading from "pages/subscription-plans/components/plan-cards/loading/Loading"
import React, { useEffect, useState } from "react"
import { useQuery } from "react-query"
import ControlButtons from "../common/ControlButtons"
import OnboardingStepHeader from "../common/OnboardingStepHeader"
import PaymentModal from "../common/payment-modal/PaymentModal"
import SubscriptionPlanCard from "./SubscriptionPlanCard"
import { getContinueText, getFeaturesWithInheritance } from "./utils"
import useOnboardingStore from "pages/onboarding/stores/useOnboardingStore"

function SubscriptionPlans() {
    const [selectedPlan, setSelectedPlan] = useState<PlanType>("BUSINESS")
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
    const { updateOnboardingState } = useOnboardingStore()
    const preferredPlanDuration = useSubscriptionPlanStore((state) => state.preferredPlanDuration)
    const updateSelectedPlan = useSubscriptionPlanStore((state) => state.updateSelectedPlan)

    const { isFetching, data } = useQuery({
        queryKey: ["subscription-plans"],
        queryFn: () => getSubscriptionPlansService(),
        onSuccess: (data) => {
            const selectedPlanData = data.data.find((plan) => plan.type === selectedPlan)
            if (selectedPlanData) {
                updateSelectedPlan(selectedPlanData)
            }
        }
    })

    const plans: SubscriptionPlan[] = data?.data || []

    const handleNext = async (): Promise<void> => {
        if (selectedPlan === "STARTER") {
            updateOnboardingState('currentStep', 'YOU_ARE_ALL_SET')
            return
        }

        // Open payment modal - PaymentForm will handle the payment logic
        setIsPaymentModalOpen(true)
    }

    if (isFetching) return <Loading />

    return (
        <>
            <OnboardingStepHeader heading="Plans" description="Choose from the different package options below." />

            <BlueButton
                fontSize="16px"
                mt="-46px"
                justifyContent="flex-start"
                padding={0}
                onClick={() => window.open("/plans", "_blank")}
            >
                View all plans and compare <ExternalarrowMd color="#179EF8" />
            </BlueButton>

            <PlanDurationRadioContainer />

            <Grid templateColumns="1fr" gap={6} p={4}>
                {plans.map((plan) => {
                    const planType = plan.type as PlanType

                    return (
                        <SubscriptionPlanCard
                            key={plan._id}
                            plan={plan}
                            features={getFeaturesWithInheritance(planType)}
                            isPopular={planType === "BUSINESS"}
                            isSelected={selectedPlan === plan.type}
                            onSelect={setSelectedPlan}
                            planDuration={preferredPlanDuration}
                        />
                    )
                })}
            </Grid>

            <ControlButtons 
                continueText={getContinueText(selectedPlan)} 
                onSubmit={handleNext} 
                onBack={() => updateOnboardingState('currentStep', 'PAYMENT_DETAILS')} 
            />

            <PaymentModal
                plan={selectedPlan}
                isOpen={isPaymentModalOpen}
                onClose={() => setIsPaymentModalOpen(false)}
            />
        </>
    )
}

export default SubscriptionPlans
