import React from 'react';
import { useInvoiceContext } from '../context/InvoiceContext';

const InvoiceDetails: React.FC = () => {
    const { invoiceData } = useInvoiceContext();
    const { invoiceId, invoiceDate, transactionId, paymentMethod } = invoiceData;

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
                    <span className="value">{paymentMethod}</span>
                </div>
            </div>
        </div>
    );
};

export default InvoiceDetails;
