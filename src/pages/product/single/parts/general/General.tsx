import React from 'react'
import { VStack } from '@chakra-ui/react'
import ProductName from '../modules/name/ProductName'
import DescriptionProduct from '../modules/description/DescriptionProduct'
import ProductCollapse from '../modules/collapse/ProductCollapse'
import ProductImages from '../modules/images/ProductImages'
import AvailablePurchase from '../modules/available/AvailablePurchase'
import ProductPovProvider from '../modules/povProvider/ProductPovProvider'

function General() {
    return (
        <ProductCollapse show title='General Information' description='Provide product details and select your POD provider.'>
            <VStack spacing={10} align={"stretch"}>
                <ProductName />
                <DescriptionProduct />
                <ProductPovProvider />
                <ProductImages />
                <AvailablePurchase />
            </VStack>
        </ProductCollapse>
    )
}

export default General