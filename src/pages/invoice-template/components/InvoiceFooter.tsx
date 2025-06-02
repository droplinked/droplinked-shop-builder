import React from 'react';
import { InvoiceFooterProps } from '../utils/interface';

const InvoiceFooter: React.FC<InvoiceFooterProps> = ({
    companyWebsite,
    companyPhone,
    companyEmail,
}) => {
    return (
        <footer className="invoice-footer">
            <div className="footer-content">
                <span>www.{companyWebsite}</span>
                <span>{companyPhone}</span>
                <span>{companyEmail}</span>
            </div>
        </footer>
    );
};

export default InvoiceFooter;
