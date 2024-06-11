export interface SubscriptionPlan {
    _id: string;
    type: string;
    price: string;
    description: string;
    subOptionIds: {
        title: string;
        key: string;
        value: {
            title: string;
            key: string;
            value: boolean | string;
        }[]
    }[]
}

export interface LegalUsage {
    all: string;
    key: string;
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
    startsAt: Date;
    expiresAt: Date;
    legalUsage: LegalUsage[]
}