export interface SubOptionId {
    title: string;
    key: string;
    value: {
        title: string;
        key: string;
        value: boolean | string;
    }[]
}

export interface SubscriptionPlan {
    _id: string;
    type: string;
    price: string;
    description: string;
    subOptionIds: SubOptionId[]
}

export type LegalUsageKey = "physical_product" | "digital_product" | "print_on_demand" | "drop"

export interface LegalUsage {
    all: string;
    key: LegalUsageKey;
    remaining: string;
    used: number;
    value: string;
}

export interface ShopSubscriptionData {
    _id: string;
    shopId: string;
    subscriptionId: {
        _id: string;
        description: string;
        price: string;
        type: string;
        subOptionIds: {
            key: string;
            value: boolean | string
        }[];
    };
    purchaseStatus: string;
    status: string;
    daysUntilExpiration: string;
    startsAt: string;
    expiresAt: string;
    legalUsage: LegalUsage[]
}

export interface SubscriptionCheckout {
    amount: number;
    subId: string
}

export interface SubscriptionPurchaseResult {
    amount: number
    transactionId: string;
    clientSecret: string;
    paymentIntentId: string;
}