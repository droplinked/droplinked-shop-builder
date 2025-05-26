import { SubscriptionPlan, IPrice } from 'services/subscription/interfaces'
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
    planCardStyles: {
        descriptionHeight: number,
        priceHeight: number
    }
}

type Action = {
    updateSelectedPlan: (plan: State['selectedPlan']) => void
    updatePlanDuration: (planDuration: State['preferredPlanDuration']) => void
    updatePlanCardStyles: <K extends keyof State['planCardStyles']>(key: K, value: State['planCardStyles'][K]) => void
}

const useSubscriptionPlanStore = create<State & Action>((set, get) => ({
    selectedPlan: null,
    selectedPlanPrice: calculatePlanPrice(null, planDurations[1]),
    preferredPlanDuration: planDurations[1],
    planCardStyles: {
        descriptionHeight: 48,
        priceHeight: 48
    },
    updateSelectedPlan: (plan) => {
        const { preferredPlanDuration } = get()
        const planPrice = calculatePlanPrice(plan, preferredPlanDuration)
        set({ selectedPlan: plan, selectedPlanPrice: planPrice })
    },
    updatePlanDuration: (preferredPlanDuration) => {
        const { selectedPlan } = get()
        const planPrice = calculatePlanPrice(selectedPlan, preferredPlanDuration)
        set({ preferredPlanDuration, selectedPlanPrice: planPrice })
    },
    updatePlanCardStyles(key, value) {
        set({ planCardStyles: { ...get().planCardStyles, [key]: value } })
    }
}))

export default useSubscriptionPlanStore

function calculatePlanPrice(plan: SubscriptionPlan | null, preferredPlanDuration: PlanDuration): number {
    if (!plan) return 0
    const { price } = plan

    if (typeof price[0] === 'string') {
        return 0
    }
    const targetPriceObj = (price as IPrice[]).find((priceOption) => priceOption.month === preferredPlanDuration.month)
    if (!targetPriceObj) return 0

    if (preferredPlanDuration.discount && targetPriceObj.discountPrice) {
        return +targetPriceObj.discountPrice
    }

    return +targetPriceObj.price
}