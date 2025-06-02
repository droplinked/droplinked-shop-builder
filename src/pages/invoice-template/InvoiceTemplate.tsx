import { Box, useMediaQuery } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Margin, usePDF } from 'react-to-pdf';
import InvoiceContent from './components/InvoiceContent';
import InvoiceFooter from './components/InvoiceFooter';
import InvoiceHeader from './components/InvoiceHeader';
import PageHeader from './components/PageHeader';
import './styles/styles.css';
import useAppToast from 'hooks/toast/useToast';
import { useQuery } from 'react-query';
import { downloadCreditChangeInvoice } from 'lib/apis/credit/services';
import { useNavigate, useParams } from 'react-router-dom';
import { InvoiceProvider } from './context/InvoiceContext';

export const InvoiceTemplate: React.FC = () => {
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

    // Prepare the invoice data for the context
    const invoiceData = data ? {
        // Client information
        clientName: data.clientName,
        clientEmail: data.clientEmail,
        clientAddress: data.clientAddress,
        clientPhone: data.clientPhone,

        // Company information
        companyWebsite: "droplinked.com",
        companyAddress: "Shopsadiq Ltd. Al Khatem Tower Floor 16, Abu Dhabi UAE",
        companyEmail: "support@droplinked.com",

        // Invoice details
        invoiceId: data.invoiceId,
        invoiceDate: data.invoiceDate,
        transactionId: data.transactionId,
        paymentMethod: data.paymentMethod,

        // Financial information
        itemName: data.itemName,
        itemDescription: data.itemDescription,
        subtotal: data.subtotal,
        tax: data.tax,
        total: data.total,
        currency: data.currency,
        type: data.transactionType
    } : {};

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
                <InvoiceProvider invoiceData={invoiceData}>
                    <div
                        className="invoice-container"
                        ref={targetRef}
                    >
                        <InvoiceHeader />
                        <InvoiceContent />
                        <InvoiceFooter />
                    </div>
                </InvoiceProvider>
            </Box>
        </Box >
    );
};

export default InvoiceTemplate;
