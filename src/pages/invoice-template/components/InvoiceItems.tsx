import React from 'react';
import { InvoiceItemsProps } from '../utils/interface';

const InvoiceItems: React.FC<InvoiceItemsProps> = ({
    items = [],
    subtotal,
    tax,
    taxRate,
    total,
    currency,
}) => {
    return (
        <div className="invoice-items">
            <table className="items-table">
                <thead>
                    <tr>
                        <th className="item-detail">Item Detail</th>
                        <th className="item-cycle">Cycle</th>
                        <th className="item-amount">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index}>
                            <td className="item-detail">
                                <p className="item-name">{item.name}</p>
                                <p className="item-description">{item.description}</p>
                            </td>
                            <td className="item-cycle">{item.cycle}</td>
                            <td className="item-amount">{item.amount}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr className="subtotal-row">
                        <td colSpan={2} className="summary-label">Subtotal</td>
                        <td className="summary-value">{subtotal}</td>
                    </tr>
                    <tr>
                        <td colSpan={2} className="summary-label">Tax ({taxRate})</td>
                        <td className="summary-value">{tax}</td>
                    </tr>
                    <tr className="total-row">
                        <td colSpan={2} className="summary-label">Total</td>
                        <td className="total-amount" style={{ whiteSpace: 'nowrap' }}>
                            {total}<span className="currency">{currency}</span>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default InvoiceItems;
