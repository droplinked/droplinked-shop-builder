import React from 'react';
import { InvoiceDetailsProps } from '../utils/interface';

const InvoiceDetails: React.FC<InvoiceDetailsProps> = ({
    invoiceId,
    invoiceDate,
    transactionId,
    paymentMethod,
    cardLastDigits,
    subscriptionPeriod,
    nextBillingDate,
}) => {
    return (
        <div className="invoice-details">
            <div className="details-row">
                <div className="detail-item">
                    <span className="label">Invoice ID</span>
                    <span className="value">{invoiceId}</span>
                </div>
                <div className="detail-item">
                    <span className="label">Invoice date</span>
                    <span className="value">{invoiceDate}</span>
                </div>
                <div className="detail-item">
                    <span className="label">Transaction ID</span>
                    <span className="value">{transactionId}</span>
                </div>
            </div>
            <div className="details-row">
                <div className="detail-item">
                    <span className="label">Payment Method</span>
                    <span className="value">{paymentMethod} <span>•</span> Ending with {cardLastDigits}</span>
                </div>
                <div className="detail-item">
                    <span className="label">Subscription Period</span>
                    <span className="value">{subscriptionPeriod}</span>
                </div>
                <div className="detail-item">
                    <span className="label">Next Billing Date</span>
                    <span className="value">{nextBillingDate}</span>
                </div>
            </div>
        </div>
    );
};

export default InvoiceDetails;
