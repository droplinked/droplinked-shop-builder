import AppInput from 'components/shared/form/textbox/AppInput'
import { productContext } from 'pages/product/single/context'
import React, { useContext } from 'react'

function ProductName() {
    const { state: { title }, methods: { updateState }, loading } = useContext(productContext)

    return (
        <AppInput
            label="Product Name"
            name="productName"
            isRequired
            loading={loading}
            placeholder="Default"
            value={title}
            onChange={(e) => updateState("title", e.target.value)}
        />
    )
}

export default ProductName