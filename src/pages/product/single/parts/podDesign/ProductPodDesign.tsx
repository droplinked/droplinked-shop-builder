import { VStack } from '@chakra-ui/react'
import React, { useContext } from 'react'
import ProductCollapse from '../modules/collapse/ProductCollapse'
import ProductArtwork from '../modules/artwork/ProductImages'
import ProductType from '../modules/productType/ProductType'
import ProductMintToMerge from '../modules/mintToMerge/ProductMintToMerge'
import { productContext } from '../../context'
import ProductMockup from '../modules/mockup/ProductMockup'

function ProductPodDesign() {
    const { state: { product_type } } = useContext(productContext)

    return (
        <>
            {product_type === "PRINT_ON_DEMAND" && (
                <ProductCollapse title='POD Design' description='Set product type, customize artwork and mockup, select product variations.'>
                    <VStack spacing={10} align={"stretch"}>
                        <ProductType />
                        <ProductArtwork />
                        <ProductMockup />
                        <ProductMintToMerge />
                    </VStack>
                </ProductCollapse>
            )}
        </>
    )
}

export default ProductPodDesign