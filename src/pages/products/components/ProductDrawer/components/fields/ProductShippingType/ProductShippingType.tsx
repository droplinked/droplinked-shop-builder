import AppIcons from 'assets/icon/Appicons'
import BlueButton from 'components/redesign/button/BlueButton'
import FormFieldWrapper from 'components/redesign/form-field-wrapper/FormFieldWrapper'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import { useShippingTypes } from 'pages/products/hooks/useShippingTypes'
import React, { useState } from 'react'
import LoadingPlaceholder from '../../common/LoadingPlaceholder'
import CustomShippingForm from './CustomShippingForm'
import ShippingTypeSelector from './ShippingTypeSelector'

function ProductShippingType() {
    const { t } = useLocaleResources('products')
    const [isFormVisible, setFormVisibility] = useState(false)
    const { hasCustomShippingPermission, shippingTypes, shippingTypesQuery } = useShippingTypes()

    const rightContent = (
                    <BlueButton
                sx={{ path: { stroke: "#179EF8" } }}
                onClick={() => hasCustomShippingPermission && setFormVisibility(true)}
            >
                <AppIcons.BlackPlus />
                {t('ProductShippingType.customShipping')}
            </BlueButton>
    )

    return (
        <FormFieldWrapper
            label={t('ProductShippingType.label')}
            description={t('ProductShippingType.description')}
            isRequired
            {...hasCustomShippingPermission && { rightContent }}
        >
            {shippingTypesQuery.isFetching
                ? <LoadingPlaceholder numberOfSkeletons={3} />
                : <ShippingTypeSelector shippingTypes={shippingTypes} />
            }

            {isFormVisible && <CustomShippingForm onDiscard={() => setFormVisibility(false)} />}
        </FormFieldWrapper>
    )
}

export default ProductShippingType