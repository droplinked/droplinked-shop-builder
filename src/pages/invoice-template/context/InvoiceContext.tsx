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
    invoiceData: FinancialInformation & InvoiceDetails & ClientInformation & CompanyInformation;
}

export const InvoiceProvider: React.FC<InvoiceProviderProps> = ({ children, invoiceData }) => {
    return (
        <InvoiceContext.Provider value={{ invoiceData }}>
            {children}
        </InvoiceContext.Provider>
    );
};
