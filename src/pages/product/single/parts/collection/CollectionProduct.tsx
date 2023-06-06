import { VStack } from '@chakra-ui/react'
import React from 'react'
import ProductCollapse from '../modules/collapse/ProductCollapse'
import Collection from '../modules/Collection'

function CollectionProduct() {
    return (
        <ProductCollapse title='Product Collection' description='Organize the product into a collection to set exclusive discount or access.'>
            <VStack spacing={10} align={"stretch"}>
                <Collection />
            </VStack>
        </ProductCollapse>
    )
}

export default CollectionProduct