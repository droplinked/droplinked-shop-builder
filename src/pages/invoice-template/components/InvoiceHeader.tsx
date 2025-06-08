import React from 'react'
import DroplinkedLogo from 'assets/brand-identity/DroplinkedLogo'
import DroplinkedTypography from 'assets/brand-identity/DroplinkedTypography'
import { useInvoiceContext } from '../context/InvoiceContext'

const InvoiceHeader: React.FC = () => {
    const { invoiceData } = useInvoiceContext()
    const {
        clientName,
        clientEmail,
        clientAddress,
        clientPhone,
        companyWebsite,
        companyAddress
    } = invoiceData

    return (
        <header className="invoice-header">
            <div className="company-info">
                <h1>Invoice</h1>
                <div className="billing-info">
                    <h3>Billed to</h3>
                    <div className="client-details">
                        <p className="client-name">{clientName}</p>
                        <p>{clientEmail}</p>
                        <p>{clientAddress}</p>
                        <p>{clientPhone}</p>
                    </div>
                </div>
            </div>
            <div className="company-logo">
                <div className="logo-container">
                    <DroplinkedLogo className='logo-img' />
                </div>
                <div className="company-details">
                    <DroplinkedTypography width={"85px"} height="16px" color='#2bcfa1' />
                    <div className="company-contact">
                        <p>{companyWebsite}</p>
                        <p>{companyAddress}</p>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default InvoiceHeader
