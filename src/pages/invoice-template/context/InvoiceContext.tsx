import React, { createContext, useContext, ReactNode } from 'react';
import { InvoiceContextType, PdfExportDataResponse } from '../utils/interface';

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
    invoiceData: PdfExportDataResponse;
}

export const InvoiceProvider: React.FC<InvoiceProviderProps> = ({ children, invoiceData }) => {
    const enhancedInvoiceData = {
        ...invoiceData,
        // Add company info fields
        companyWebsite: "droplinked.com",
        companyAddress: "Shopsadiq Ltd. Al Khatem Tower Floor 16, Abu Dhabi UAE",
        companyEmail: "support@droplinked.com",
    };

    return (
        <InvoiceContext.Provider value={{ invoiceData: enhancedInvoiceData }}>
            {children}
        </InvoiceContext.Provider>
    );
};
