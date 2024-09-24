import { Address } from "pages/invoice-management/create-invoice/helpers/helpers"

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
    email?: string;
    checkoutAddressID?: Address;
}

export interface InvoiceQueryParams {
    page: number;
    limit: number;
    search?: string;
    status?: InvoiceStatus
}

export interface DeleteInvoiceProduct {
    cartId: string;
    itemId: string;
}

export interface CartAdditionalDetails {
    email: string;
    note: string;
}

export interface CartShippingMethod {
    groupId: string;
    shipmentId: string;
}