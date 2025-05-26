import BasicButton from 'components/common/BasicButton/BasicButton'
import useAppToast from 'hooks/toast/useToast'
import { updateProductLinkOptionsService } from 'services/product/productServices'
import useAppStore from 'stores/app/appStore'
import React, { useContext, useState } from 'react'
import { PaymentLinkContext } from '../context/PaymentLinkContext'

function PaymentLinkSubmit() {
    const { paymentLinkData } = useContext(PaymentLinkContext)
    const [isLoading, setLoading] = useState(false)
    const { showToast } = useAppToast()
    const { updateState, shop } = useAppStore()

    const handleSubmit = async () => {
        try {
            setLoading(true)
            await updateProductLinkOptionsService(paymentLinkData)
            updateState({ key: 'shop', params: { ...shop, productLinkOptions: paymentLinkData } })
            showToast({ message: "Payment link options saved successfully", type: 'success' })
        }
        catch (error) {
            showToast({ message: "Failed to save payment link options", type: 'error' })
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <BasicButton alignSelf={"flex-end"} isLoading={isLoading} isDisabled={isLoading} onClick={handleSubmit}>Save</BasicButton>
    )
}

export default PaymentLinkSubmit