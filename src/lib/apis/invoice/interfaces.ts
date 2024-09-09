export type InvoiceStatus = "Paid" | "Pending" | "Overdue"

export interface Invoice {
    _id: string;
    client: string;
    created: string;
    due: string;
    amount: string;
    status: InvoiceStatus
}