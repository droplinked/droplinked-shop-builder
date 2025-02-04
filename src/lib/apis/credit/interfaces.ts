export interface IGetCreditAnalytics {
    startDate: Date;
    endDate: Date;
    page?: number;
    limit?: number;
    type?: "ORDER" | "CREDIT_BALANCE" | "AFFILIATE_SHARE" | "SUBSCRIPTION_UPDATE" | "GAMIFICATION_REWARD" | "WITHDRAW" | "REFERRAL";
    amountType?: "INCREASE" | "DECREASE";
}

export interface IBreakDown {
    amount: number;
    count: number;
    reason: string;
}

export interface IAdditionsAndRemovals {
    breakdown: IBreakDown[];
    count: number,
    total: number,
}

export interface ICreditAnalyticsData {
    additions: IAdditionsAndRemovals;
    netChange: number;
    periodEnd: Date;
    periodStart: Date;
    removals: IAdditionsAndRemovals;
    totalCreditAdded: number;
    totalCreditRemoved: number;
} 