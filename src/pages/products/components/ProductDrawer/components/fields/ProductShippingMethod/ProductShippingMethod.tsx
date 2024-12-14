import AppIcons from 'assest/icon/Appicons'
import BlueButton from 'components/redesign/button/BlueButton'
import useShippingMethods from 'pages/products/hooks/useShippingMethods'
import React, { useState } from 'react'
import ProductFieldWrapper from '../../common/ProductFieldWrapper'
import CustomShippingForm from './CustomShippingForm'
import ShippingMethodSelector from './ShippingMethodSelector'

function ProductShippingMethod() {
    const [showCustomShippingForm, setShowCustomShippingForm] = useState(false)
    const { hasCustomShippingPermission, shippingMethods } = useShippingMethods()

    const rightContent = (
        <BlueButton
            sx={{ path: { stroke: "#179EF8" } }}
            onClick={() => hasCustomShippingPermission && setShowCustomShippingForm(true)}
        >
            <AppIcons.BlackPlus />
            Custom Shipping
        </BlueButton>
    )

    return (
        <ProductFieldWrapper
            label='Shipping Method'
            description='Choose how to ship this product to customers.'
            isRequired
            {...hasCustomShippingPermission && { rightContent }}
        >
            <ShippingMethodSelector shippingMethods={shippingMethods} />

            {showCustomShippingForm &&
                <CustomShippingForm handleDiscard={() => setShowCustomShippingForm(false)} />
            }
        </ProductFieldWrapper>
    )
}

export default ProductShippingMethod