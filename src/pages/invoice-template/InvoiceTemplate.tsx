import { Box } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Margin, usePDF } from 'react-to-pdf';
import InvoiceContent from './components/InvoiceContent';
import InvoiceFooter from './components/InvoiceFooter';
import InvoiceHeader from './components/InvoiceHeader';
import PageHeader from './components/PageHeader';
import './styles/styles.css';
import { InvoiceTemplateProps } from './utils/interface';

export const InvoiceTemplate: React.FC<InvoiceTemplateProps> = ({
    // Client information
    clientName = "Nexora",
    clientEmail = "Nexora@gmail.com",
    clientAddress = "9029 Salt Lake, Mandalor",
    clientPhone = "(+254) 724-453-233",

    // Company information
    companyWebsite = "droplinked.com",
    companyAddress = "City, State, IN - 000 000",
    companyTaxId = "TAX ID 00XXXXX1234X0XX",
    companyPhone = "+91 00000 00000",
    companyEmail = "support@droplinked.com",

    // Invoice details
    invoiceId = "AB2324-01",
    invoiceDate = "01 Aug, 2023",
    transactionId = "e0327b0924cf37e0327b092",
    paymentMethod = "Credit Card",
    cardLastDigits = "1234",
    subscriptionPeriod = "5 August, 2024 – 5 August, 2025",
    nextBillingDate = "5 August, 2025",

    // Financial information
    items = [
        {
            name: "Pro Plan",
            description: "Pro Plan Renewal",
            cycle: "Annual",
            amount: "$20.00"
        },
        {
            name: "Pro Plan",
            description: "Pro Plan Renewal",
            cycle: "Annual",
            amount: "$20.00"
        },
        {
            name: "Pro Plan",
            description: "Pro Plan Renewal",
            cycle: "Annual",
            amount: "$20.00"
        },
        {
            name: "Pro Plan",
            description: "Pro Plan Renewal",
            cycle: "Annual",
            amount: "$20.00"
        },
        {
            name: "Pro Plan",
            description: "Pro Plan Renewal",
            cycle: "Annual",
            amount: "$20.00"
        }, {
            name: "Pro Plan",
            description: "Pro Plan Renewal",
            cycle: "Annual",
            amount: "$20.00"
        },
        {
            name: "Pro Plan",
            description: "Pro Plan Renewal",
            cycle: "Annual",
            amount: "$20.00"
        },
        {
            name: "Pro Plan",
            description: "Pro Plan Renewal",
            cycle: "Annual",
            amount: "$20.00"
        },
        {
            name: "Pro Plan",
            description: "Pro Plan Renewal",
            cycle: "Annual",
            amount: "$20.00"
        }, {
            name: "Pro Plan",
            description: "Pro Plan Renewal",
            cycle: "Annual",
            amount: "$20.00"
        }, {
            name: "Pro Plan",
            description: "Pro Plan Renewal",
            cycle: "Annual",
            amount: "$20.00"
        },
        {
            name: "Pro Plan",
            description: "Pro Plan Renewal",
            cycle: "Annual",
            amount: "$20.00"
        },
        {
            name: "Pro Plan",
            description: "Pro Plan Renewal",
            cycle: "Annual",
            amount: "$20.00"
        },
        {
            name: "Pro Plan",
            description: "Pro Plan Renewal",
            cycle: "Annual",
            amount: "$20.00"
        },
        {
            name: "Pro Plan",
            description: "Pro Plan Renewal",
            cycle: "Annual",
            amount: "$20.00"
        },
        {
            name: "Pro Plan",
            description: "Pro Plan Renewal",
            cycle: "Annual",
            amount: "$20.00"
        },
        {
            name: "Pro Plan",
            description: "Pro Plan Renewal",
            cycle: "Annual",
            amount: "$20.00"
        },
        {
            name: "Pro Plan",
            description: "Pro Plan Renewal",
            cycle: "Annual",
            amount: "$20.00"
        },
        {
            name: "Pro Plan",
            description: "Pro Plan Renewal",
            cycle: "Annual",
            amount: "$20.00"
        },
        {
            name: "Pro Plan",
            description: "Pro Plan Renewal",
            cycle: "Annual",
            amount: "$20.00"
        },
    ],
    subtotal = "$20.00",
    tax = "$1.00",
    taxRate = "10%",
    total = "$21.00",
    currency = "USD",
}) => {
    const [isDownloading, setIsDownloading] = useState(false);
    const { targetRef, toPDF } = usePDF({
        filename: 'invoice.pdf',
        page: {
            format: [150, 236],
            margin: Margin.SMALL
        },
        overrides: {
            pdf: {
                compress: true,
            },
        }
    });

    const handleDownload = async () => {
        setIsDownloading(true);
        try {
            await toPDF();
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <Box>
            <PageHeader onDownload={handleDownload} isLoading={isDownloading} />

            <div className="invoice-container" ref={targetRef}>
                <InvoiceHeader
                    clientName={clientName}
                    clientEmail={clientEmail}
                    clientAddress={clientAddress}
                    clientPhone={clientPhone}
                    companyWebsite={companyWebsite}
                    companyAddress={companyAddress}
                    companyTaxId={companyTaxId}
                />

                <InvoiceContent
                    invoiceId={invoiceId}
                    invoiceDate={invoiceDate}
                    transactionId={transactionId}
                    paymentMethod={paymentMethod}
                    cardLastDigits={cardLastDigits}
                    subscriptionPeriod={subscriptionPeriod}
                    nextBillingDate={nextBillingDate}
                    items={items}
                    subtotal={subtotal}
                    tax={tax}
                    taxRate={taxRate}
                    total={total}
                    currency={currency}
                />

                <InvoiceFooter
                    companyWebsite={companyWebsite}
                    companyPhone={companyPhone}
                    companyEmail={companyEmail}
                />
            </div>
        </Box>
    );
};

export default InvoiceTemplate;
