export interface InvoiceQueryParams {
    page: number;
    limit: number;
    search?: string;
    status?: "ACTIVE" | "CHECKED_OUT" | "PENDING"
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