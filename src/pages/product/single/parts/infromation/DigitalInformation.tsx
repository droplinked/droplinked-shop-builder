import { VStack } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { productContext } from '../../context'
import ProductCollapse from '../modules/collapse/ProductCollapse'
import NftImage from '../modules/nftImage/NftImage'
import SaleInfromation from '../modules/saleInfromation/SaleInfromation'

function DigitalInformation() {
    const { state: { product_type } } = useContext(productContext)

    return (
        <>
            {product_type === "DIGITAL" && (
                <ProductCollapse
                    title='Product Variants'
                    description="Add the variants, and set a cover image to preview the product."
                >
                    <VStack spacing="60px" align={"stretch"}>
                        <SaleInfromation />
                        <NftImage />
                    </VStack>
                </ProductCollapse>
            )}
        </>
    )
}

export default DigitalInformation