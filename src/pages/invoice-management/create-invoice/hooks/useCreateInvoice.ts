import useAppToast from 'functions/hooks/toast/useToast'
import { useState } from 'react'

const useCreateInvoice = () => {
    const [isLoading, setLoading] = useState(false)
    const { showToast } = useAppToast()

    const createInvoice = async (invoiceData) => {
        try {

        }
        catch (err) {

        }
        finally {
            setLoading(false)
        }
    }

    return { createInvoice, isLoading }
}

export default useCreateInvoice