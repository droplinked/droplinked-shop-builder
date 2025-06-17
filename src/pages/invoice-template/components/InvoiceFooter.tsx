import React from 'react'
import { useInvoiceContext } from '../context/InvoiceContext'

const InvoiceFooter: React.FC = () => {
    const { invoiceData } = useInvoiceContext()
    const { companyWebsite, companyEmail } = invoiceData

    return (
        <footer className="invoice-footer">
            <div className="footer-content">
                <a href={`https://${companyWebsite}`}>
                    {companyWebsite}
                </a>
                <span></span>
                <a href={`mailto:${companyEmail}`}>{companyEmail}</a>
            </div>
        </footer>
    )
}

export default InvoiceFooter
