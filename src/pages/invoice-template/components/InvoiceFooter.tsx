import React from 'react'
import { useInvoiceContext } from '../context/InvoiceContext'

const InvoiceFooter: React.FC = () => {
    const { invoiceData } = useInvoiceContext()
    const { companyWebsite, companyEmail } = invoiceData

    return (
        <footer className="invoice-footer">
            <div className="footer-content">
                <span>www.{companyWebsite}</span>
                <span></span>
                <span>{companyEmail}</span>
            </div>
        </footer>
    )
}

export default InvoiceFooter
