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
                <ProductCollapse title='Product Information' description="Write a message to your customers and attach the original file link.">
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