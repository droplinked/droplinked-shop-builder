import { SubscriptionPlan } from 'lib/apis/subscription/interfaces'
import { create } from 'zustand'

type PlanDuration = "monthly" | "yearly"

type State = {
    selectedPlan: SubscriptionPlan | null,
    selectedPlanPrice: number
    preferredPlanDuration: PlanDuration
}

type Action = {
    updateSelectedPlan: (plan: State['selectedPlan']) => void
    updatePlanDuration: (planDuration: State['preferredPlanDuration']) => void
}

const useSubscriptionPlanPurchaseStore = create<State & Action>((set, get) => ({
    selectedPlan: null,
    selectedPlanPrice: 0,
    preferredPlanDuration: "yearly",
    updateSelectedPlan: (plan) => {
        const { preferredPlanDuration } = get()
        const planPrice = calculatePlanPrice(plan, preferredPlanDuration)
        set({ selectedPlan: plan, selectedPlanPrice: planPrice })
    },
    updatePlanDuration: (preferredPlanDuration) => {
        const { selectedPlan } = get()
        const planPrice = calculatePlanPrice(selectedPlan, preferredPlanDuration)
        set({ preferredPlanDuration, selectedPlanPrice: planPrice })
    }
}))

export default useSubscriptionPlanPurchaseStore

export const calculatePlanPrice = (plan: SubscriptionPlan | null, duration: PlanDuration): number => {
    if (!plan) return 0
    const basePrice = Number(plan.price)
    const finalPrice = duration === "monthly" ? basePrice : basePrice * 0.9
    return parseFloat(finalPrice.toFixed(2))
}