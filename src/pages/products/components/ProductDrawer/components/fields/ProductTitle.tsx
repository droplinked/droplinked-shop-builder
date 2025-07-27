import AppInput from 'components/redesign/input/AppInput'
import ProTrialModal from 'components/modals/pro-plan-upgrade-modal/ProPlanUpgradeModal'
import useProductForm from 'pages/products/hooks/useProductForm'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import ImproveWithAi from '../common/ImproveWithAi'
import { useImproveAI } from 'pages/products/hooks/useImproveAI'

function ProductTitle() {
    const { t } = useLocaleResources('products');
    const { values: { product_type, title }, errors, setFieldValue } = useProductForm()
    const improveAI = useImproveAI({ type: 'title' });
    const { isImproveLoading, isProTrialModalOpen, handleCloseProTrialModal } = improveAI

    const label = product_type === "EVENT" ? t('ProductTitle.eventName') : t('ProductTitle.productName')

    return (
        <>
            <AppInput
                label={label}
                description={t('ProductTitle.description')}
                inputProps={{
                    placeholder: t('ProductTitle.placeholder'),
                    value: title,
                    isRequired: true,
                    fontSize: 16,
                    onChange: (e) => setFieldValue("title", e.target.value),
                }}
                inputContainerProps={{
                    padding: "8px 8px 8px 16px",
                }}
                rightElement={
                    <ImproveWithAi
                        isDisabled={!title}
                        {...improveAI}
                    />
                }
                message={errors.title}
                maxCharacters={100}
                {...errors.title && { state: "error" }}
                {...isImproveLoading && { showAnimatedLoading: true }}
            />
            
            <ProTrialModal
                isOpen={isProTrialModalOpen}
                onClose={handleCloseProTrialModal}
            />
        </>
    )
}
 
export default ProductTitle