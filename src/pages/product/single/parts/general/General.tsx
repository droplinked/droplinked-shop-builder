import React from 'react'
import { VStack } from '@chakra-ui/react'
import ProductName from '../modules/name/ProductName'
import DescriptionProduct from '../modules/description/DescriptionProduct'
import ProductTypes from '../modules/type/ProductTypes'
import ProductCollapse from '../modules/collapse/ProductCollapse'
import ProductImages from '../modules/images/ProductImages'
import AvailablePurchase from '../modules/available/AvailablePurchase'

function General() {
    return (
        <ProductCollapse show title='General Information' description='Provide product details.'>
            <VStack spacing={10} align={"stretch"}>
                <ProductName />
                <DescriptionProduct />
                <ProductTypes />
                <ProductImages />
                <AvailablePurchase />
            </VStack>
        </ProductCollapse>
    )
}

export default General