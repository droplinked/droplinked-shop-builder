import { Box, VStack } from '@chakra-ui/react'
import AppSelectBox from 'components/common/form/select/AppSelectBox'
import { productContext } from 'pages/product/single/context'
import React, { useCallback, useContext, useMemo } from 'react'
import ProductTypeModel from '../../model'
import ProductTypeDetail from './parts/details/ProductTypeDetail'

function ProductTypeNormal() {
    const { state: { pod_blank_product_id, publish_product }, productID, methods: { updateState }, loading, store: { state: { product_types } } } = useContext(productContext)

    const items = useMemo(() => product_types.length ? product_types.map((el: any) => ({
        caption: el.title,
        value: el._id
    })) : [], [product_types])

    return (
        <VStack align="stretch">
            <Box position={"relative"}>
                <AppSelectBox
                    label="Product Type"
                    name="product_type"
                    isDisabled={Boolean(productID) && publish_product}
                    items={items}
                    isRequired
                    loading={loading}
                    value={pod_blank_product_id}
                    onChange={(e) => ProductTypeModel.updateProductType({ updateState, value: e.target.value })}
                />
            </Box>
            <ProductTypeDetail />
        </VStack>
    )
}

export default ProductTypeNormal