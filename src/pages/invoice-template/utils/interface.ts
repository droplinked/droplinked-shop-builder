// Base interfaces for common properties
export interface ClientInformation {
    clientName?: string;
    clientEmail?: string;
    clientAddress?: string;
    clientPhone?: string;
}

export interface CompanyInformation {
    companyWebsite?: string;
    companyAddress?: string;
    companyEmail?: string;
}

export interface InvoiceDetails {
    invoiceId?: string;
    invoiceDate?: string;
    transactionId?: string;
    paymentMethod?: string;
}

export interface FinancialInformation {
    itemName?: string;
    itemDescription?: string;
    subtotal?: string;
    tax?: string;
    total?: string;
    currency?: string;
    type?: string;
}

// Context interface
export interface InvoiceContextType {
    invoiceData: FinancialInformation & InvoiceDetails & ClientInformation & CompanyInformation;
}