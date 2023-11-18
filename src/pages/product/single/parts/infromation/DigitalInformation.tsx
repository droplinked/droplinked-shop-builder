import React, { useContext } from 'react'
import { VStack } from '@chakra-ui/react'
import ProductCollapse from '../modules/collapse/ProductCollapse'
import { productContext } from '../../context'
import SaleInfromation from '../modules/saleInfromation/SaleInfromation'
import NftImage from '../modules/nftImage/NftImage'
import CommissionDigital from '../modules/commissionDigital/CommissionDigital'


function DigitalInformation() {
    const { state: { product_type } } = useContext(productContext)

    return (
        <>
            {product_type === "DIGITAL" && (
                <ProductCollapse title='Product Variants' description="Add the variants, and set a cover image to preview the product.">
                    <VStack spacing="60px" align={"stretch"}>
                        <SaleInfromation />
                        <NftImage />
                        <CommissionDigital />
                    </VStack>
                </ProductCollapse>
            )}
        </>
    )
}

export default DigitalInformation