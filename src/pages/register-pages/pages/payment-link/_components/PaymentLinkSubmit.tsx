import BasicButton, { IBasicButton } from 'components/common/BasicButton/BasicButton'
import useAppToast from 'functions/hooks/toast/useToast'
import { updateProductLinkOptionsService } from 'lib/apis/product/productServices'
import useAppStore from 'lib/stores/app/appStore'
import React, { useContext, useState } from 'react'
import { PaymentLinkContext } from '../context/paymentLink.context'

interface Props extends IBasicButton {

}

function PaymentLinkSubmit({ ...props }: Props) {
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
        <BasicButton alignSelf={"flex-end"} isLoading={isLoading} isDisabled={isLoading} {...props} onClick={handleSubmit}>Save</BasicButton>
    )
}

export default PaymentLinkSubmit