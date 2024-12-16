import AppIcons from 'assest/icon/Appicons'
import BlueButton from 'components/redesign/button/BlueButton'
import React, { useState } from 'react'
import ProductFieldWrapper from '../../common/ProductFieldWrapper'
import VariantForm from './VariantForm'

function ProductVariants() {
    const [showVariantForm, setShowVariantForm] = useState(false)

    return (
        <ProductFieldWrapper
            label='Variants'
            description='Add different versions of this product (e.g., size, color).'
            isRequired
        >
            {showVariantForm ?
                <VariantForm />
                :
                <BlueButton
                    w="full"
                    gap={2}
                    border="1px solid #292929"
                    borderRadius={8}
                    padding="12px 16px"
                    fontSize={16}
                    sx={{ path: { stroke: "#179EF8" } }}
                    onClick={() => setShowVariantForm(true)}
                >
                    <AppIcons.BlackPlus />
                    Add Varaints
                </BlueButton>
            }
        </ProductFieldWrapper>
    )
}

export default ProductVariants