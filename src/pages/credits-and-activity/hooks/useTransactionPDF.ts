import useAppToast from 'hooks/toast/useToast'
import { downloadCreditChangeInvoice } from 'lib/apis/credit/services'
import { useState } from 'react'
import { useQuery } from 'react-query'

interface Props {
    transactionId: string
    componentRef: React.RefObject<HTMLElement>
}

const useTransactionPDF = ({ transactionId, componentRef }: Props) => {
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
    const { showToast } = useAppToast()

    const generatePDF = async (data: any) => {
        if (!componentRef.current || !data) return

        setIsGeneratingPDF(true)
        try {
            //TODO: Implement PDF generation
        }
        catch (err) {
            showToast({ type: 'error', message: 'PDF generation failed' })
        }
        finally {
            setIsGeneratingPDF(false)
        }
    }

    const { data, isLoading, error } = useQuery({
        queryFn: () => downloadCreditChangeInvoice(transactionId),
        enabled: !!transactionId,
        onSuccess: (fetchedData) => generatePDF(fetchedData)
    })

    return { isLoading: isLoading || isGeneratingPDF }
}

export default useTransactionPDF