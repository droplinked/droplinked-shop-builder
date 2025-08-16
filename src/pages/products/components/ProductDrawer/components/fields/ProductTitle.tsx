import UpgradePlanModalContainer from 'components/modals/upgrade-plan-modal/UpgradePlanModalContainer'
import AppInput from 'components/redesign/input/AppInput'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import { useImproveAI } from 'pages/products/hooks/useImproveAI'
import useProductForm from 'pages/products/hooks/useProductForm'
import React from 'react'
import ImproveWithAi from '../common/ImproveWithAi'

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
            
            <UpgradePlanModalContainer
                isOpen={isProTrialModalOpen}
                onClose={handleCloseProTrialModal}
            />
        </>
    )
}
 
export default ProductTitle