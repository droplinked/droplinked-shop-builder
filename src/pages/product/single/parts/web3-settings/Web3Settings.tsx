import { Flex } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { productContext } from '../../context'
import ProductCollapse from '../modules/collapse/ProductCollapse'
import CommissionDigital from '../modules/commissionDigital/CommissionDigital'
import DigitalProductRoyalty from '../modules/digitalProductRoyalty/DigitalProductRoyalty'
import NetworkDigital from '../modules/network/NetworkDigital'

function Web3Settings() {
    const { state: { product_type } } = useContext(productContext)

    return (
        <>
            {product_type === "DIGITAL" && (
                <ProductCollapse
                    title='Web 3 settings'
                    description='Add the variants, and set a cover image to preview the product.'
                >
                    <Flex direction={"column"} gap={9}>
                        <NetworkDigital />
                        <CommissionDigital />
                        <DigitalProductRoyalty />
                    </Flex>
                </ProductCollapse>
            )}
        </>
    )
}

export default Web3Settings