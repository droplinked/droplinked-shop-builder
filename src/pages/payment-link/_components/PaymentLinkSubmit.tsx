import BasicButton from 'components/common/BasicButton/BasicButton'
import useAppToast from 'hooks/toast/useToast'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import { updateProductLinkOptionsService } from 'services/product/productServices'
import useAppStore from 'stores/app/appStore'
import React, { useContext, useState } from 'react'
import { PaymentLinkContext } from '../context/PaymentLinkContext'
import enLocale from 'locales/payment-link/en.json'
import arLocale from 'locales/payment-link/ar.json'

function PaymentLinkSubmit() {
    const { t } = useLocaleResources('payment-link' , {
        en: enLocale,
        ar: arLocale
      });
    const { paymentLinkData } = useContext(PaymentLinkContext)
    const [isLoading, setLoading] = useState(false)
    const { showToast } = useAppToast()
    const { updateState, shop } = useAppStore()

    const handleSubmit = async () => {
        try {
            setLoading(true)
            await updateProductLinkOptionsService(paymentLinkData)
            updateState({ key: 'shop', params: { ...shop, productLinkOptions: paymentLinkData } })
            showToast({ message: t('components.submit.successMessage'), type: 'success' })
        }
        catch (error) {
            showToast({ message: t('components.submit.errorMessage'), type: 'error' })
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <BasicButton alignSelf={"flex-end"} isLoading={isLoading} isDisabled={isLoading} onClick={handleSubmit}>{t('components.submit.save')}</BasicButton>
    )
}

export default PaymentLinkSubmit