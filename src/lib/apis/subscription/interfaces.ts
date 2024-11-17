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
    price: any[],
    description: string;
    subOptionIds: SubOptionId[]
}

export type LegalUsageKey = "physical_product" | "digital_product" | "print_on_demand" | "drop" | "event"

export interface LegalUsage {
    all: string;
    key: LegalUsageKey;
    remaining: number | string;
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
    monthLength: number;
    paidAmount: number;
    status: string;
    daysUntilExpiration: string;
    startsAt: string;
    expiresAt: string;
    legalUsage: LegalUsage[]
}

export interface SubscriptionCheckout {
    month: number;
    subId: string;
    recurring: boolean
}

export interface SubscriptionCryptoCheckout {
    chain: string;
    token: string;
    checkoutData: SubscriptionCheckout
}

export interface SubscriptionStripePaymentResult {
    amount: number
    transactionId: string;
    clientSecret: string;
    paymentIntentId: string;
}

interface PaymentMethodToken {
    icon: string;
    isNative: boolean;
    isCustom: boolean;
    name: string;
    type: string;
    _id: string;
}

export interface SubscriptionPlanPaymentMethod {
    _id: string;
    type: string;
    tokens?: PaymentMethodToken[]
}

export interface We3TransactionData {
    deploy_hash: string;
    cryptoAmount?: number;
    subscriptionId: string;
    recurring: boolean;
    walletAddress: string;
}