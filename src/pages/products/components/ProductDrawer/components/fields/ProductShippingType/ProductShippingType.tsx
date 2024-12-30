import AppIcons from 'assest/icon/Appicons'
import BlueButton from 'components/redesign/button/BlueButton'
import { useShippingTypes } from 'pages/products/hooks/useShippingTypes'
import React, { useState } from 'react'
import LoadingPlaceholder from '../../common/LoadingPlaceholder'
import ProductFieldWrapper from '../../common/ProductFieldWrapper'
import CustomShippingForm from './CustomShippingForm'
import ShippingTypeSelector from './ShippingTypeSelector'

function ProductShippingType() {
    const [isFormVisible, setFormVisibility] = useState(false)
    const { hasCustomShippingPermission, shippingTypes, shippingTypesQuery } = useShippingTypes()

    const rightContent = (
        <BlueButton
            sx={{ path: { stroke: "#179EF8" } }}
            onClick={() => hasCustomShippingPermission && setFormVisibility(true)}
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
            {shippingTypesQuery.isFetching
                ? <LoadingPlaceholder numberOfSkeletons={3} />
                : <ShippingTypeSelector shippingTypes={shippingTypes} />
            }

            {isFormVisible &&
                <CustomShippingForm onDiscard={() => setFormVisibility(false)} />
            }
        </ProductFieldWrapper>
    )
}

export default ProductShippingType