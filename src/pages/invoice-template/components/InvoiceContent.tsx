import React from 'react';
import InvoiceDetails from './InvoiceDetails';
import InvoiceItems from './InvoiceItems';

const InvoiceContent: React.FC = () => {
    return (
        <main className="invoice-content">
            <InvoiceDetails />
            <InvoiceItems />
        </main>
    );
};

export default InvoiceContent;
