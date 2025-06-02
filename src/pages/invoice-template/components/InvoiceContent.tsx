import React from 'react';
import InvoiceDetails from './InvoiceDetails';
import InvoiceItems from './InvoiceItems';
import { InvoiceContentProps } from '../utils/interface';

const InvoiceContent: React.FC<InvoiceContentProps> = ({
    invoiceId,
    invoiceDate,
    transactionId,
    paymentMethod,
    cardLastDigits,
    subscriptionPeriod,
    nextBillingDate,
    itemName,
    itemDescription,
    subtotal,
    tax,
    taxRate,
    total,
    currency,
    type
}) => {
    return (
        <main className="invoice-content">
            <InvoiceDetails
                invoiceId={invoiceId}
                invoiceDate={invoiceDate}
                transactionId={transactionId}
                paymentMethod={paymentMethod}
                cardLastDigits={cardLastDigits}
                subscriptionPeriod={subscriptionPeriod}
                nextBillingDate={nextBillingDate}
            />

            <InvoiceItems
                itemName={itemName}
                itemDescription={itemDescription}
                subtotal={subtotal}
                tax={tax}
                taxRate={taxRate}
                total={total}
                currency={currency}
                type={type}
            />
        </main>
    );
};

export default InvoiceContent;
