import { Grid, useDisclosure } from "@chakra-ui/react"
import PaymentModal from "components/modals/payment-modal/PaymentModal"
import InteractiveText from "components/redesign/interactive-text/InteractiveText"
import PlanDurationRadioContainer from "components/redesign/plan-duration-radio/PlanDurationRadioContainer"
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import subscriptionArLocale from 'locales/subscription/ar.json'
import subscriptionEnLocale from 'locales/subscription/en.json'
import useOnboardingStore from "pages/onboarding/stores/useOnboardingStore"
import { PlanType } from "pages/onboarding/types/onboarding"
import Loading from "pages/subscription-plans/components/plan-cards/loading/Loading"
import React, { useState } from "react"
import { useQuery } from "react-query"
import { SubscriptionPlan } from "services/subscription/interfaces"
import { getSubscriptionPlansService } from "services/subscription/subscriptionServices"
import useSubscriptionPlanStore from "stores/subscription-plan.ts/subscriptionPlanStore"
import { getContinueText, getFeaturesWithInheritance } from "../../utils/subscriptionPlan"
import ControlButtons from "../common/ControlButtons"
import OnboardingStepHeader from "../common/OnboardingStepHeader"
import SubscriptionPlanCard from "./SubscriptionPlanCard"

function SubscriptionPlans() {
    const [selectedPlan, setSelectedPlan] = useState<PlanType>("BUSINESS")
    const { isOpen: isPaymentModalOpen, onOpen: openPaymentModal, onClose: closePaymentModal } = useDisclosure()
    const { updateOnboardingState } = useOnboardingStore()
    const updateSelectedPlan = useSubscriptionPlanStore((state) => state.updateSelectedPlan)
    const { t: tOnboarding } = useLocaleResources('onboarding')
    const { t: tSubscription } = useLocaleResources('subscription', {
        en: subscriptionEnLocale,
        ar: subscriptionArLocale
    })

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
        openPaymentModal()
    }

    if (isFetching) return <Loading />

    return (
        <>
            <OnboardingStepHeader
                heading={tOnboarding('SubscriptionPlans.title')}
                description={tOnboarding('SubscriptionPlans.subtitle')}
            />

            <InteractiveText
                fontSize="16px"
                mt="-46px"
                justifyContent="flex-start"
                padding={0}
                onClick={() => window.open("/plans", "_blank", "noopener noreferrer")}
                hasExternalIcon
            >
                {tOnboarding('SubscriptionPlans.viewAllPlans')}
            </InteractiveText>

            <PlanDurationRadioContainer />

            <Grid templateColumns="1fr" gap={6} p={4}>
                {plans.map((plan) => {
                    const planType = plan.type as PlanType

                    return (
                        <SubscriptionPlanCard
                            key={plan._id}
                            plan={plan}
                            features={getFeaturesWithInheritance(planType, tSubscription, tOnboarding)}
                            isPopular={planType === "BUSINESS"}
                            isSelected={selectedPlan === plan.type}
                            onSelect={setSelectedPlan}
                        />
                    )
                })}
            </Grid>

            <ControlButtons
                continueText={getContinueText(selectedPlan, tSubscription)}
                onSubmit={handleNext}
                onBack={() => updateOnboardingState('currentStep', 'PAYMENT_DETAILS')}
            />

            <PaymentModal
                plan={selectedPlan}
                isOpen={isPaymentModalOpen}
                onClose={closePaymentModal}
                onSuccess={() => updateOnboardingState('currentStep', 'YOU_ARE_ALL_SET')}
                successMessage="Payment successful! Your subscription has been activated and you're all set!"
            />
        </>
    )
}

export default SubscriptionPlans