export type InvoiceStatus = "ACTIVE" | "CHECKED_OUT" | "PENDING"

export interface Invoice {
    _id: string;
    status: string;
    type: string;
    shopID: string;
    paymentType: string;
    availableShipmentRates: any[];
    selectedShipmentRates: any[];
    selectedShipmentRateIDs: any[];
    shipmentInformation: any[];
    isInvoice: boolean;
    items: any[];
    groupedItems: any[];
    passedRules: any[];
    createdAt: string;
}

export interface InvoiceQueryParams {
    page: number;
    limit: number;
    search?: string;
    status?: InvoiceStatus
}

export interface CartAdditionalDetails {
    email: string;
    note: string;
}