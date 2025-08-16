import BasicButton from 'components/common/BasicButton/BasicButton'
import useAppToast from 'hooks/toast/useToast'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import { updateProductLinkOptionsService } from 'services/product/productServices'
import useAppStore from 'stores/app/appStore'
import UpgradePlanModalContainer from 'components/modals/upgrade-plan-modal/UpgradePlanModalContainer'
import useUpgradeHandler from 'hooks/subscription/useUpgradeHandler'
import React, { useContext, useState } from 'react'
import { PaymentLinkContext } from '../context/PaymentLinkContext'
import enLocale from 'locales/payment-link/en.json'
import arLocale from 'locales/payment-link/ar.json'

function PaymentLinkSubmit() {
    const { handleFeatureAccess, isUpgradeModalOpen, closeUpgradeModal } = useUpgradeHandler();
    const { t } = useLocaleResources('payment-link' , {
        en: enLocale,
        ar: arLocale
      });
    const { paymentLinkData } = useContext(PaymentLinkContext)
    const [isLoading, setLoading] = useState(false)
    const { showToast } = useAppToast()
    const { updateState, shop } = useAppStore()

    const handleSubmit = async () => {
        handleFeatureAccess(async () => {
            try {
                setLoading(true)
                await updateProductLinkOptionsService(paymentLinkData)
                updateState({ key: 'shop', params: { ...shop, productLinkOptions: paymentLinkData } })
                showToast({ message: t('PaymentLinkSubmit.successMessage'), type: 'success' })
            }
            catch (error) {
                showToast({ message: t('PaymentLinkSubmit.errorMessage'), type: 'error' })
            }
            finally {
                setLoading(false)
            }
        })
    }

    return (
        <>
            <BasicButton alignSelf={"flex-end"} isLoading={isLoading} isDisabled={isLoading} onClick={handleSubmit}>{t('common:save')}</BasicButton>
            
            <UpgradePlanModalContainer
                isOpen={isUpgradeModalOpen}
                onClose={closeUpgradeModal}
                initialActiveTab={'enterprise'}
            />
        </>
    )
}

export default PaymentLinkSubmit