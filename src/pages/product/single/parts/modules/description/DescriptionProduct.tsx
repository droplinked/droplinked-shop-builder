import { VStack } from '@chakra-ui/react'
import AppTextarea from 'components/shared/form/textarea/AppTextarea'
import AppErrors from 'lib/utils/statics/errors/errors'
import { productContext } from 'pages/product/single/context'
import React, { useContext } from 'react'

function DescriptionProduct() {
    const { state: { description }, methods: { updateState }, loading } = useContext(productContext)

    return (
        <AppTextarea
            label="Description"
            isRequired
            name="description"
            error={description.length > 250 && AppErrors.product.product_description_too_long}
            minHeight={200}
            placeholder="Default"
            loading={loading}
            value={description}
            onChange={(e) => updateState("description", e.target.value)}
        />
    )
}

export default DescriptionProduct