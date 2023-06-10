import React from 'react'
import { VStack } from '@chakra-ui/react'
import ProductName from '../modules/name/ProductName'
import DescriptionProduct from '../modules/description/DescriptionProduct'
import ProductTypes from '../modules/type/ProductTypes'
import ProductCollapse from '../modules/collapse/ProductCollapse'
import ProductImages from '../modules/images/ProductImages'

function General() {
    return (
        <ProductCollapse show title='General information' description='Provide product details.'>
            <VStack spacing={10} align={"stretch"}>
                <ProductName />
                <DescriptionProduct />
                <ProductTypes />
                <ProductImages />
            </VStack>
        </ProductCollapse>
    )
}

export default General