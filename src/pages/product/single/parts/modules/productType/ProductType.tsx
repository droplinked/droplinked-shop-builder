import { VStack } from '@chakra-ui/react'
import { productContext } from 'pages/product/single/context'
import ProductModel from 'pages/product/single/model'
import React, { useContext } from 'react'
import ProductTypeNormal from './parts/normal/ProductTypeNormal'
import ProductCategory from '../category/ProductCategory'

function ProductType() {
    const { state: { prodviderID } } = useContext(productContext)

    return (
        <VStack align="stretch">
            {ProductModel.isPrintful(prodviderID) ? <ProductCategory /> : <ProductTypeNormal />}
        </VStack>
    )
}

export default ProductType