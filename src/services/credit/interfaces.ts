export interface IGetCreditAnalytics {
    startDate: Date;
    endDate: Date;
    page?: number;
    limit?: number;
    type?: ITransactionType
    amountType?: "INCREASE" | "DECREASE";
}

export interface ITransactionType {
    type?: "ORDER" | "CREDIT_BALANCE" | "AFFILIATE_SHARE" | "SUBSCRIPTION_UPDATE" | "GAMIFICATION_REWARD" | "WITHDRAW" | "REFERRAL";
}

export interface IAvailableFilterTypesResponse {
    types: string[];
    amountTypes: string[];
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

export interface IDetailedTransaction {
    shopId: string;
    userId: object;
    amount: number;
    previousAmount: number;
    newAmount: number;
    status: "SUCCESS" | "FAILED" | "PENDING";
    amountType: string;
    type: string;
    stripePaymentIntentId: string;
    withdrawType: string;
    orderId: {};
    details: {};
    createdAt: Date;
    id: string;
    description?: string;
}
export interface IDetailedAnalyticData {
    data: IDetailedTransaction[];
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    nextPage: number;
    previousPage: number;
    limit: number;
    totalDocuments: number;
}

export interface PdfExportDataResponse {
    invoiceId: string;
    invoiceDate: string;
    transactionId: string;
    clientName: string;
    clientEmail: string;
    clientAddress: string;
    clientPhone: string;
    paymentMethod: string;
    shopName: string;
    shopDescription: string;
    shopLogo: string;
    transactionType: string;
    transactionAmount: string;
    transactionStatus: string;
    transactionDate: string;
    previousAmount: string;
    newAmount: string;
    subtotal: string;
    tax: string;
    total: string;
    currency: string;
    itemName: string;
    itemDescription: string;
    currentYear: number;
}