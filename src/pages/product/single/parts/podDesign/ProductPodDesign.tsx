import { VStack } from '@chakra-ui/react'
import React, { useContext } from 'react'
import ProductCollapse from '../modules/collapse/ProductCollapse'
import ProductType from '../modules/productType/ProductType'
import { productContext } from '../../context'
import ProductMockup from '../modules/mockup/ProductMockup'
import ProductArtwork from '../modules/artwork/ProductArtwork'
import ProductMintToMerge from '../modules/mintToMerge/ProductMintToMerge'
import ProductModel from '../../model'

interface Iprops {
    open: boolean
}

function ProductPodDesign({ open }: Iprops) {
    const { state: { product_type, prodviderID } } = useContext(productContext)

    return (
        <>
            {product_type === "PRINT_ON_DEMAND" && (
                <ProductCollapse show={open} title='POD Design' description='Select a product, customize it with your artwork, and create product template.'>
                    <VStack spacing={10} align={"stretch"}>
                        {ProductModel.isPrintful(prodviderID) && <ProductType />}
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