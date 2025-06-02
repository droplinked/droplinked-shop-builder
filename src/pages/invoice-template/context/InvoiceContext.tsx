import React, { createContext, useContext, ReactNode } from 'react';
import { InvoiceContextType, ClientInformation, CompanyInformation, FinancialInformation, InvoiceDetails } from '../utils/interface';

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

export const useInvoiceContext = () => {
    const context = useContext(InvoiceContext);
    if (!context) {
        throw new Error('useInvoiceContext must be used within an InvoiceProvider');
    }
    return context;
};

interface InvoiceProviderProps {
    children: ReactNode;
    invoiceData: any; // Now accepting raw API data
}

export const InvoiceProvider: React.FC<InvoiceProviderProps> = ({ children, invoiceData }) => {
    // Transform the raw data into the required format
    const transformedInvoiceData = invoiceData ? {
        // Client information
        clientName: invoiceData.clientName,
        clientEmail: invoiceData.clientEmail,
        clientAddress: invoiceData.clientAddress,
        clientPhone: invoiceData.clientPhone,

        // Company information
        companyWebsite: "droplinked.com",
        companyAddress: "Shopsadiq Ltd. Al Khatem Tower Floor 16, Abu Dhabi UAE",
        companyEmail: "support@droplinked.com",

        // Invoice details
        invoiceId: invoiceData.invoiceId,
        invoiceDate: invoiceData.invoiceDate,
        transactionId: invoiceData.transactionId,
        paymentMethod: invoiceData.paymentMethod,

        // Financial information
        itemName: invoiceData.itemName,
        itemDescription: invoiceData.itemDescription,
        subtotal: invoiceData.subtotal,
        tax: invoiceData.tax,
        total: invoiceData.total,
        currency: invoiceData.currency,
        type: invoiceData.transactionType
    } : {} as FinancialInformation & InvoiceDetails & ClientInformation & CompanyInformation;

    return (
        <InvoiceContext.Provider value={{ invoiceData: transformedInvoiceData }}>
            {children}
        </InvoiceContext.Provider>
    );
};
