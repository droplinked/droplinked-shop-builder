import { SubscriptionPlan } from 'lib/apis/subscription/interfaces'
import { create } from 'zustand'

type PlanDuration = { month: number, label: string, discount?: number }
export const planDurations: PlanDuration[] = [
    { month: 1, label: "Monthly" },
    { month: 12, label: "Annually", discount: 10 },
    { month: 60, label: "5-Year", discount: 25 },
]

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
    selectedPlanPrice: calculatePlanPrice(null, planDurations[1]),
    preferredPlanDuration: planDurations[1],
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

function calculatePlanPrice(plan: SubscriptionPlan | null, preferredPlanDuration: PlanDuration): number {
    if (!plan) return 0
    const { price } = plan
    const targetPriceObj = price.find((priceOption) => priceOption.month === preferredPlanDuration.month)
    if (preferredPlanDuration.discount)
        return +targetPriceObj.discountPrice

    return +targetPriceObj.price
}