import { VStack } from '@chakra-ui/react'
import React from 'react'
import ProductCollapse from '../modules/collapse/ProductCollapse'
import ProductCategories from '../modules/tags/ProductCategories'

function CategoryProduct() {
    return (
        <ProductCollapse title='Product Category' isRequired={false} description='Product Category'>
            <VStack spacing="60px" align={"stretch"}>
                <ProductCategories />
            </VStack>
        </ProductCollapse>
    )
}

export default CategoryProduct