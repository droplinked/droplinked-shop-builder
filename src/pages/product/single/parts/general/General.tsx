import React from 'react'
import { VStack } from '@chakra-ui/react'
import ProductName from '../modules/name/ProductName'
import DescriptionProduct from '../modules/description/DescriptionProduct'
import ProductTypes from '../modules/type/ProductTypes'
import ProductCollapse from '../modules/collapse/ProductCollapse'

function General() {
    return (
        <ProductCollapse title='General information' description='Provide product details.'>
            <VStack spacing={10} align={"stretch"}>
                <ProductName />
                <DescriptionProduct />
                <ProductTypes />
            </VStack>
        </ProductCollapse>
    )
}

export default General