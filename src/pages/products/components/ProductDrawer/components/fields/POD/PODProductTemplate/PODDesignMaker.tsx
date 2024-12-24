import AppIcons from 'assest/icon/Appicons'
import BlueButton from 'components/redesign/button/BlueButton'
import { useFormikContext } from 'formik'
import { ProductFormValues } from 'pages/products/utils/types'
import React from 'react'

function PODDesignMaker() {
    const { values: { printful_template_id } } = useFormikContext<ProductFormValues>()

    return (
        <>
            <BlueButton w="full" gap={2} border="1px solid #292929" borderRadius={8} padding="12px 16px" fontSize={16}>
                <AppIcons.BlueBrush />
                {printful_template_id ? "Edit Design" : "Design Maker"}
            </BlueButton>
        </>
    )
}

export default PODDesignMaker