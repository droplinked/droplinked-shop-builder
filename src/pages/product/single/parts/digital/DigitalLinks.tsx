import { VStack } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { productContext } from '../../context'
import ProductCollapse from '../modules/collapse/ProductCollapse'
import MessageDigital from '../modules/messageDigital/MessageDigital'
import OrginalFile from '../modules/orginalFile/OrginalFile'

function DigitalLinks() {
    const { state: { product_type } } = useContext(productContext)

    return (
        <>
            {product_type === "DIGITAL" && (
                <ProductCollapse title='Delivery Message' description='Add an email message and the original file URL for the customer to receive post-purchase.'>
                    <VStack spacing="60px" align={"stretch"}>
                        <MessageDigital />
                        <OrginalFile />
                    </VStack>
                </ProductCollapse>
            )}
        </>
    )
}

export default DigitalLinks