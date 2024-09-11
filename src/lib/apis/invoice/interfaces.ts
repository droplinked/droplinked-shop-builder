export type InvoiceStatus = "ACTIVE" | "CHECKED_OUT" | "PENDING"

export interface Invoice {
    _id: string;
    client: string;
    created: string;
    amount: string;
    status: InvoiceStatus
}

export interface InvoiceQueryParams {
    page: number;
    limit: number;
    search?: string;
    status?: InvoiceStatus
}