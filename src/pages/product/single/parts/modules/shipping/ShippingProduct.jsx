import React from 'react'
import { VStack } from '@chakra-ui/react'
import Shipping from './parts/shipping'
import ProductPageTitle from '../title/ProductPageTitle'

function ShippingProduct() {
    return (
        <VStack spacing={10} align={"stretch"}>
            <ProductPageTitle
                head
                isReuired
                title='Shipping'
                description='Select and set the way you want to deliver your products to your customers'
            />
            <Shipping />
        </VStack>
    )
}

export default ShippingProduct