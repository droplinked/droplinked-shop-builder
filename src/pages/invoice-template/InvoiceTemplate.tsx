import { Box, Spinner, useMediaQuery } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Margin, usePDF } from 'react-to-pdf';
import InvoiceContent from './components/InvoiceContent';
import InvoiceFooter from './components/InvoiceFooter';
import InvoiceHeader from './components/InvoiceHeader';
import PageHeader from './components/PageHeader';
import './styles/styles.css';
import { InvoiceTemplateProps } from './utils/interface';
import useAppToast from 'hooks/toast/useToast';
import { useQuery } from 'react-query';
import { downloadCreditChangeInvoice } from 'lib/apis/credit/services';
import { useNavigate, useParams } from 'react-router-dom';

export const InvoiceTemplate: React.FC<InvoiceTemplateProps> = ({
    // Company information
    companyTaxId = "TAX ID 00XXXXX1234X0XX",
    companyPhone = "+91 00000 00000",
    cardLastDigits = "1234",
    subscriptionPeriod = "5 August, 2024 – 5 August, 2025",
    nextBillingDate = "5 August, 2025",
}) => {
    const navigate = useNavigate();
    const [isDownloading, setIsDownloading] = useState(false);
    const [isSmallerThan768] = useMediaQuery('(max-width: 768px)');
    const params = useParams()
    const { showToast } = useAppToast()
    const { data, isFetching } = useQuery({
        queryFn: () => downloadCreditChangeInvoice(params.txId),
        queryKey: ['invoice', params.txId],
        enabled: !!params.txId,
        select(data) {
            return data.data
        },
        onError() {
            showToast({ message: "Failed to fetch invoice data. Please try again.", type: "error" });
        },
    })
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

    useEffect(() => {
        if (!params.txId) {
            navigate('/');
        }
    }, [params.txId])

    if (isFetching) {
        return null
    }

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
                        clientName={data?.clientName}
                        clientEmail={data?.clientEmail}
                        clientAddress={data?.clientAddress}
                        clientPhone={data?.clientPhone}
                        companyWebsite="droplinked.com"
                        companyAddress="Shopsadiq Ltd. Al Khatem Tower Floor 16, Abu Dhabi UAE"
                    />

                    <InvoiceContent
                        invoiceId={data?.invoiceId}
                        invoiceDate={data?.invoiceDate}
                        transactionId={data?.transactionId}
                        paymentMethod={data?.paymentMethod}
                        cardLastDigits={cardLastDigits}
                        subscriptionPeriod={subscriptionPeriod}
                        nextBillingDate={nextBillingDate}
                        itemName={data.itemName}
                        itemDescription={data.itemDescription}
                        subtotal={data.subtotal}
                        tax={data.tax}
                        total={data.total}
                        currency={data.currency}
                        type={data.transactionType}
                    />

                    <InvoiceFooter
                        companyWebsite="droplinked.com"
                        companyPhone={companyPhone}
                        companyEmail="support@droplinked.com"
                    />
                </div>
            </Box>
        </Box >
    );
};

export default InvoiceTemplate;
