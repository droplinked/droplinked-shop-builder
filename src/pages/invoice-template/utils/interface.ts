export interface InvoiceItem {
    name: string;
    description: string;
    cycle: string;
    amount: string;
}

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
    companyTaxId?: string;
    companyPhone?: string;
    companyEmail?: string;
}

export interface InvoiceDetails {
    invoiceId?: string;
    invoiceDate?: string;
    transactionId?: string;
    paymentMethod?: string;
    cardLastDigits?: string;
    subscriptionPeriod?: string;
    nextBillingDate?: string;
}

export interface FinancialInformation {
    items?: InvoiceItem[];
    subtotal?: string;
    tax?: string;
    taxRate?: string;
    total?: string;
    currency?: string;
}

// Main interfaces using composition
export interface InvoiceTemplateProps extends
    ClientInformation,
    CompanyInformation,
    InvoiceDetails,
    FinancialInformation {
    // ref
    ref?: React.Ref<HTMLDivElement>;
}

// Component specific interfaces
export interface InvoiceHeaderProps extends ClientInformation {
    companyWebsite?: string;
    companyAddress?: string;
    companyTaxId?: string;
}

export interface InvoiceDetailsProps extends InvoiceDetails { }

export interface InvoiceItemsProps extends FinancialInformation { }

export interface InvoiceFooterProps {
    companyWebsite?: string;
    companyPhone?: string;
    companyEmail?: string;
}

export interface InvoiceContentProps extends InvoiceDetails, FinancialInformation { }