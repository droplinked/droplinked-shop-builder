import React from 'react'
import { render, screen } from '@testing-library/react'
import InvoiceContent from '../components/InvoiceContent'
import { InvoiceProvider } from '../context/InvoiceContext'

const mockInvoiceData = {
    invoiceId: 'INV-001',
    invoiceDate: '2025-06-07',
    transactionId: 'TX-123',
    clientName: 'John Doe',
    clientEmail: 'john@example.com',
    clientAddress: '123 Main St',
    clientPhone: '1234567890',
    paymentMethod: 'Credit Card',
    shopName: 'Test Shop',
    shopDescription: 'A test shop',
    shopLogo: '',
    transactionType: 'ORDER',
    transactionAmount: '100',
    transactionStatus: 'SUCCESS',
    transactionDate: '2025-06-07',
    previousAmount: '0',
    newAmount: '100',
    subtotal: '90',
    tax: '10',
    total: '100',
    currency: 'USD',
    itemName: 'Test Item',
    itemDescription: 'Test Description',
    currentYear: 2025,
    companyWebsite: 'droplinked.com',
    companyAddress: 'Test Address',
    companyEmail: 'support@droplinked.com',
}

describe('InvoiceContent', () => {
    it('renders InvoiceDetails and InvoiceItems', () => {
        render(
            <InvoiceProvider invoiceData={mockInvoiceData}>
                <InvoiceContent />
            </InvoiceProvider>
        )
        expect(screen.getByText('Invoice ID')).toBeInTheDocument()
        expect(screen.getByText('Item Detail')).toBeInTheDocument()
    })
})
