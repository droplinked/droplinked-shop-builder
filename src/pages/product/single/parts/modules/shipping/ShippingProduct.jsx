import React, { useContext } from 'react'
import { VStack } from '@chakra-ui/react'
import Shipping from './parts/shipping'
import { productContext } from 'pages/product/single/context'
import ProductCollapse from '../collapse/ProductCollapse'

function ShippingProduct() {
    const { state: { product_type } } = useContext(productContext)

    return (
        <>
            {product_type === "NORMAL" && <ProductCollapse title='Shipping' description='Select a shipping method to deliver your product.'>
                <VStack spacing={10} align={"stretch"}>
                    <Shipping />
                </VStack>
            </ProductCollapse>
            }
        </>
    )
}

export default ShippingProduct