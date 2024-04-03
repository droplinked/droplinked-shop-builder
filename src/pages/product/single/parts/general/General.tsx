import { VStack } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { productContext } from '../../context'
import AvailablePurchase from '../modules/available/AvailablePurchase'
import ProductCollapse from '../modules/collapse/ProductCollapse'
import DescriptionProduct from '../modules/description/DescriptionProduct'
import ProductImages from '../modules/images/ProductImages'
import ProductName from '../modules/name/ProductName'
import NetworkDigital from '../modules/network/NetworkDigital'
import PostPurchaseDataGatheringCheckbox from '../modules/postPurchaseDataGathering/PostPurchaseDataGatheringCheckbox'
import ProductPovProvider from '../modules/povProvider/ProductPovProvider'

interface Iprops {
    open?: boolean
}

function General({ open = true }: Iprops) {
    const { state: { product_type } } = useContext(productContext)

    return (
        <ProductCollapse show={open} title='General Information' description={product_type === "DIGITAL" ? "Provide product details and select a blockchain network for decentralizing your digital item." : "Provide product details"}>
            <VStack spacing="60px" align={"stretch"}>
                <ProductName />
                <DescriptionProduct />
                <ProductPovProvider />
                <ProductImages />
                <AvailablePurchase />
                <PostPurchaseDataGatheringCheckbox />
                <NetworkDigital />
            </VStack>
        </ProductCollapse>
    )
}

export default General