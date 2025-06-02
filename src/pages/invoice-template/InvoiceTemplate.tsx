import { Box, useMediaQuery } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Margin, usePDF } from 'react-to-pdf';
import InvoiceContent from './components/InvoiceContent';
import InvoiceFooter from './components/InvoiceFooter';
import InvoiceHeader from './components/InvoiceHeader';
import PageHeader from './components/PageHeader';
import './styles/styles.css';
import { InvoiceTemplateProps } from './utils/interface';
import useAppToast from 'hooks/toast/useToast';

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
    const [isSmallerThan768] = useMediaQuery('(max-width: 768px)');
    const { showToast } = useAppToast()
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
        try {
            setIsDownloading(true);

            // Use Promise to ensure state update completes
            await new Promise(resolve => setTimeout(resolve, 100));

            // Generate PDF
            await toPDF();
        } catch (error) {
            showToast({ message: "Failed to generate PDF. Please try again.", type: "error" });
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <Box>
            <PageHeader onDownload={handleDownload} isLoading={isDownloading} />

            <Box
                {...(!isDownloading && isSmallerThan768 && {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    overflow: "hidden"
                })}
                width="100%"
                paddingTop="20px"
                px={{ base: "10px", md: "0px" }}
                overflow={isDownloading ? "hidden" : "auto"}
            >
                <div
                    className="invoice-container"
                    ref={targetRef}
                >
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
        </Box >
    );
};

export default InvoiceTemplate;
