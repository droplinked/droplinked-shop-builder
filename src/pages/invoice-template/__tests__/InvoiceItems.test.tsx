import React from 'react'
import { render, screen } from '@testing-library/react'
import InvoiceItems from '../components/InvoiceItems'
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

describe('InvoiceItems', () => {
    it('renders invoice items and summary', () => {
        render(
            <InvoiceProvider invoiceData={mockInvoiceData}>
                <InvoiceItems />
            </InvoiceProvider>
        )
        expect(screen.getByText('Item Detail')).toBeInTheDocument()
        expect(screen.getByText('Type')).toBeInTheDocument()
        expect(screen.getByText('Amount')).toBeInTheDocument()
        expect(screen.getByText('Test Item')).toBeInTheDocument()
        expect(screen.getByText('Test Description')).toBeInTheDocument()
        expect(screen.getByText('ORDER')).toBeInTheDocument()
        const hundreds = screen.getAllByText('100', { exact: false })
        expect(hundreds.length).toBeGreaterThanOrEqual(2)
        expect(screen.getByText('Subtotal')).toBeInTheDocument()
        expect(screen.getByText('90')).toBeInTheDocument()
        expect(screen.getByText('Tax')).toBeInTheDocument()
        expect(screen.getByText('10')).toBeInTheDocument()
        expect(screen.getByText('Total')).toBeInTheDocument()
        expect(screen.getByText('USD')).toBeInTheDocument()
    })
})
