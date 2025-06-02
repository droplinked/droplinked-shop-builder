import React from 'react';
import { useInvoiceContext } from '../context/InvoiceContext';

const InvoiceItems: React.FC = () => {
    const { invoiceData } = useInvoiceContext();
    const {
        itemDescription,
        itemName,
        subtotal,
        tax,
        total,
        currency,
        transactionType
    } = invoiceData;

    return (
        <div className="invoice-items">
            <table className="items-table">
                <thead>
                    <tr>
                        <th className="item-detail">Item Detail</th>
                        <th className="item-cycle">Type</th>
                        <th className="item-amount">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="item-detail">
                            <p className="item-name">{itemName}</p>
                            <p className="item-description">{itemDescription}</p>
                        </td>
                        <td className="item-cycle">{transactionType}</td>
                        <td className="item-amount">{total}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr className="subtotal-row">
                        <td colSpan={2} className="summary-label">Subtotal</td>
                        <td className="summary-value">{total}</td>
                    </tr>
                    <tr>
                        <td colSpan={2} className="summary-label">Tax</td>
                        <td className="summary-value">{tax}</td>
                    </tr>
                    <tr className="total-row">
                        <td colSpan={2} className="summary-label">Total</td>
                        <td className="total-amount" style={{ whiteSpace: 'nowrap' }}>
                            {subtotal}<span className="currency">{currency}</span>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default InvoiceItems;
