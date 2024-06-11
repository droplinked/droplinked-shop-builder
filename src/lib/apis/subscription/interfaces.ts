export interface SubscriptionPlan {
    _id: string;
    type: string;
    subOptionIds: {
        title?: string;
        key: string;
        value: boolean | string | Record<string, any>;
    }[];
    price: string;
}

export interface ShopSubscriptionData {
    _id: string;
    shopId: string;
    subscriptionId: {
        _id: string;
        type: string;
        subOptionIds: {
            key: string;
            value: boolean | string
        }[];
        price: string;
    };
    purchaseStatus: string;
    startsAt: Date;
    status: string;
    daysUntilExpiration: string;
}