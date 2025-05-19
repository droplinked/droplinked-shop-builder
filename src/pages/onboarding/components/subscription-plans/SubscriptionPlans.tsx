import { Grid } from "@chakra-ui/react"
import { ExternalarrowMd } from "assets/icons/Navigation/ExternalArrow/ExternalarrowMd"
import BlueButton from "components/redesign/button/BlueButton"
import PlanDurationRadioContainer from "components/redesign/plan-duration-radio/PlanDurationRadioContainer"
import { SubscriptionPlan } from "lib/apis/subscription/interfaces"
import {getSubscriptionPlansService, subscriptionPlanStripePaymentService,} from "lib/apis/subscription/subscriptionServices"
import useSubscriptionPlanStore from "stores/subscription-plan.ts/subscriptionPlanStore"
import { OnboardingStepProps, PlanType } from "pages/onboarding/types/onboarding"
import Loading from "pages/subscription-plans/_components/plans/_components/loading/Loading"
import React, { useEffect, useState } from "react"
import { useMutation, useQuery } from "react-query"
import ControlButtons from "../common/ControlButtons"
import OnboardingStepHeader from "../common/OnboardingStepHeader"
import PaymentModal from "../common/payment-modal/PaymentModal"
import SubscriptionPlanCard from "./SubscriptionPlanCard"
import { getContinueText, getFeaturesWithInheritance } from "./utils"

function SubscriptionPlans({ onBack, onNext }: OnboardingStepProps) {
    const [selectedPlan, setSelectedPlan] = useState<PlanType>("BUSINESS")
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
    const [clientSecret, setClientSecret] = useState<string>("")
    const preferredPlanDuration = useSubscriptionPlanStore((state) => state.preferredPlanDuration)
    const updateSelectedPlan = useSubscriptionPlanStore((state) => state.updateSelectedPlan)

    const { isFetching, data } = useQuery({
        queryKey: ["subscription-plans"],
        queryFn: () => getSubscriptionPlansService(),
    })

    // Update store when plans are fetched
    useEffect(() => {
        if (data?.data) {
            const selectedPlanData = data.data.find((plan) => plan.type === selectedPlan)
            if (selectedPlanData) {
                updateSelectedPlan(selectedPlanData)
            }
        }
    }, [data?.data, selectedPlan, updateSelectedPlan])

    const { mutateAsync: createPaymentIntent } = useMutation(subscriptionPlanStripePaymentService, {
        onSuccess: (response) => {
            setClientSecret(response.data.clientSecret)
            setIsPaymentModalOpen(true)
        },
    })

    const plans: SubscriptionPlan[] = data?.data || []

    const handleNext = async (): Promise<void> => {
        if (selectedPlan === "ENTERPRISE" || selectedPlan === "STARTER") {
            onNext()
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
            console.error("Failed to create payment intent:", error)
        }
    }

    const handleCloseModal = (): void => {
        setIsPaymentModalOpen(false)
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

            <ControlButtons onBack={onBack} onSubmit={handleNext} continueText={getContinueText(selectedPlan)} />

            <PaymentModal
                plan={selectedPlan}
                isOpen={isPaymentModalOpen}
                onClose={handleCloseModal}
                clientSecret={clientSecret}
            />
        </>
    )
}

export default SubscriptionPlans
