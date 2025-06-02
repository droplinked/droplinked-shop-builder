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
    items,
    subtotal,
    tax,
    taxRate,
    total,
    currency,
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
                items={items}
                subtotal={subtotal}
                tax={tax}
                taxRate={taxRate}
                total={total}
                currency={currency}
            />
        </main>
    );
};

export default InvoiceContent;
