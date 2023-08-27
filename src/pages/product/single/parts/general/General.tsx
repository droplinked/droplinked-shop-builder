import React, { useContext } from 'react'
import { VStack } from '@chakra-ui/react'
import ProductName from '../modules/name/ProductName'
import DescriptionProduct from '../modules/description/DescriptionProduct'
import ProductCollapse from '../modules/collapse/ProductCollapse'
import ProductImages from '../modules/images/ProductImages'
import AvailablePurchase from '../modules/available/AvailablePurchase'
import ProductPovProvider from '../modules/povProvider/ProductPovProvider'
import { productContext } from '../../context'
import ProductType from '../modules/productType/ProductType'
import ProductModel from '../../model'

function General() {
    const { state: { prodviderID } } = useContext(productContext)

    return (
        <ProductCollapse show title='General Information' description='Provide product details and select your POD provider.'>
            <VStack spacing={10} align={"stretch"}>
                <ProductName />
                <DescriptionProduct />
                <ProductPovProvider />
                <ProductImages />
                <AvailablePurchase />
                {ProductModel.isPrintful(prodviderID) && <ProductType />}
            </VStack>
        </ProductCollapse>
    )
}

export default General