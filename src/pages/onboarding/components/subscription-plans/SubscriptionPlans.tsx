import { Grid } from "@chakra-ui/react"
import { ExternalarrowMd } from "assets/icons/Navigation/ExternalArrow/ExternalarrowMd"
import BlueButton from "components/redesign/button/BlueButton"
import PlanDurationRadioContainer from "components/redesign/plan-duration-radio/PlanDurationRadioContainer"
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import onboardingArLocale from 'locales/onboarding/ar.json'
import onboardingEnLocale from 'locales/onboarding/en.json'
import subscriptionArLocale from 'locales/subscription/ar.json'
import subscriptionEnLocale from 'locales/subscription/en.json'
import useOnboardingStore from "pages/onboarding/stores/useOnboardingStore"
import { PlanType } from "pages/onboarding/types/onboarding"
import Loading from "pages/subscription-plans/components/plan-cards/loading/Loading"
import React, { useState } from "react"
import { useMutation, useQuery } from "react-query"
import { SubscriptionPlan } from "services/subscription/interfaces"
import { getSubscriptionPlansService, subscriptionPlanStripePaymentService } from "services/subscription/subscriptionServices"
import useSubscriptionPlanStore from "stores/subscription-plan.ts/subscriptionPlanStore"
import ControlButtons from "../common/ControlButtons"
import OnboardingStepHeader from "../common/OnboardingStepHeader"
import PaymentModal from "../common/payment-modal/PaymentModal"
import SubscriptionPlanCard from "./SubscriptionPlanCard"
import { getContinueText, getFeaturesWithInheritance } from "./utils"

function SubscriptionPlans() {
    const [selectedPlan, setSelectedPlan] = useState<PlanType>("BUSINESS")
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
    const [clientSecret, setClientSecret] = useState<string>("")
    const { updateOnboardingState } = useOnboardingStore()
    const preferredPlanDuration = useSubscriptionPlanStore((state) => state.preferredPlanDuration)
    const updateSelectedPlan = useSubscriptionPlanStore((state) => state.updateSelectedPlan)
    const { t: tOnboarding } = useLocaleResources('onboarding', {
        en: onboardingEnLocale,
        ar: onboardingArLocale
    })
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

    const { mutateAsync: createPaymentIntent } = useMutation(subscriptionPlanStripePaymentService, {
        onSuccess: (response) => {
            setClientSecret(response.data.clientSecret)
            setIsPaymentModalOpen(true)
        },
    })

    const plans: SubscriptionPlan[] = data?.data || []

    const handleNext = async (): Promise<void> => {
        if (selectedPlan === "STARTER") {
            updateOnboardingState('currentStep', 'YOU_ARE_ALL_SET')
            return
        }

        try {
            const selectedPlanData = plans.find((plan) => plan.type === selectedPlan)

            await createPaymentIntent({
                month: preferredPlanDuration.month,
                subId: selectedPlanData._id,
                recurring: true,
            })
        } catch (error) {
            console.error(tOnboarding('subscriptionPlans.paymentError'), error)
        }
    }

    if (isFetching) return <Loading />

    return (
        <>
            <OnboardingStepHeader
                 heading={tOnboarding('subscriptionPlans.title')} 
                 description={tOnboarding('subscriptionPlans.subtitle')}
            />

            <BlueButton
                fontSize="16px"
                mt="-46px"
                justifyContent="flex-start"
                padding={0}
                onClick={() => window.open("/plans", "_blank")}
            >
                {tOnboarding('subscriptionPlans.viewAllPlans')} <ExternalarrowMd color="#179EF8" />
            </BlueButton>

            <PlanDurationRadioContainer />

            <Grid templateColumns="1fr" gap={6} p={4}>
                {plans.map((plan) => {
                    const planType = plan.type as PlanType

                    return (
                        <SubscriptionPlanCard
                            key={plan._id}
                            plan={plan}
                            features={getFeaturesWithInheritance(planType, tSubscription)}
                            isPopular={planType === "BUSINESS"}
                            isSelected={selectedPlan === plan.type}
                            onSelect={setSelectedPlan}
                            planDuration={preferredPlanDuration}
                        />
                    )
                })}
            </Grid>

            <ControlButtons 
                continueText={getContinueText(selectedPlan, tSubscription)} 
                onSubmit={handleNext} 
                onBack={() => updateOnboardingState('currentStep', 'PAYMENT_DETAILS')} 
                onSkip={() => updateOnboardingState('currentStep', 'YOU_ARE_ALL_SET')}
            />

            <PaymentModal
                plan={selectedPlan}
                isOpen={isPaymentModalOpen}
                onClose={() => setIsPaymentModalOpen(false)}
                clientSecret={clientSecret}
            />
        </>
    )
}

export default SubscriptionPlans
