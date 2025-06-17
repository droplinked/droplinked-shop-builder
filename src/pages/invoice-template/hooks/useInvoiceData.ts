import useAppToast from 'hooks/toast/useToast'
import { downloadCreditChangeInvoice } from 'services/credit/services'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { Margin, usePDF } from 'react-to-pdf'

export const useInvoiceData = () => {
    const navigate = useNavigate()
    const [isDownloading, setIsDownloading] = useState(false)
    const params = useParams()
    const { showToast } = useAppToast()

    const { data, isFetching } = useQuery({
        queryFn: () => downloadCreditChangeInvoice(params.txId),
        queryKey: ['invoice', params.txId],
        enabled: !!params.txId,
        retry: false,
        select(data) {
            return data.data
        },
        onError() {
            showToast({
                message: "Invoice not found with this ID",
                type: "error"
            })
            navigate("/")
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
    })

    const handleDownload = async () => {
        try {
            setIsDownloading(true)

            // Use Promise to ensure state update completes
            await new Promise(resolve => setTimeout(resolve, 100))

            // Generate PDF
            await toPDF()
        } catch (error) {
            showToast({ message: "Failed to generate PDF. Please try again.", type: "error" })
        } finally {
            setIsDownloading(false)
        }
    }

    return {
        data,
        isFetching,
        isDownloading,
        targetRef,
        handleDownload
    }
}

export default useInvoiceData
