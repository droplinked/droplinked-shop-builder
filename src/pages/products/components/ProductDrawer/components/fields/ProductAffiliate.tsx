import { useFormikContext } from 'formik'
import { ProductFormValues } from 'pages/products/utils/formSchema'
import React from 'react'
import SwitchBox from '../common/SwitchBox'

function ProductAffiliate() {
    const { values: { canBeAffiliated }, errors, setFieldValue } = useFormikContext<ProductFormValues>()

    return (
        <SwitchBox
            title='Affiliate Market'
            description='Enable this to allow co-sellers to import and sell this product.'
            isChecked={canBeAffiliated}
            onToggle={(e) => setFieldValue("canBeAffiliated", e.target.checked)}
        />
    )
}

export default ProductAffiliate