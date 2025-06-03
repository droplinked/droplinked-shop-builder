import { Box, useMediaQuery } from '@chakra-ui/react'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import React from 'react'
import InvoiceContent from './components/InvoiceContent'
import InvoiceFooter from './components/InvoiceFooter'
import InvoiceHeader from './components/InvoiceHeader'
import PageHeader from './components/PageHeader'
import { InvoiceProvider } from './context/InvoiceContext'
import useInvoiceData from './hooks/useInvoiceData'
import './styles/styles.css'

export const InvoiceTemplate: React.FC = () => {
    const [isSmallerThan768] = useMediaQuery('(max-width: 768px)')
    const { data, isFetching, isDownloading, targetRef, handleDownload } = useInvoiceData()

    return (
        <>
            <PageHeader
                onDownload={handleDownload}
                isDownloading={isDownloading}
                isFetching={isFetching}
            />

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
                {isFetching
                    ? <AppSkeleton width="595px" height="800px" isLoaded={false} mx="auto" my="10px" />
                    : (
                        <InvoiceProvider invoiceData={data}>
                            <div ref={targetRef} className="invoice-container">
                                <InvoiceHeader />
                                <InvoiceContent />
                                <InvoiceFooter />
                            </div>
                        </InvoiceProvider>
                    )
                }
            </Box>
        </>
    )
}

export default InvoiceTemplate