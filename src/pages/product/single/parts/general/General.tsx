import React, { useContext } from 'react'
import { VStack } from '@chakra-ui/react'
import ProductName from '../modules/name/ProductName'
import DescriptionProduct from '../modules/description/DescriptionProduct'
import ProductCollapse from '../modules/collapse/ProductCollapse'
import ProductImages from '../modules/images/ProductImages'
import AvailablePurchase from '../modules/available/AvailablePurchase'
import ProductPovProvider from '../modules/povProvider/ProductPovProvider'
import NetworkDigital from '../modules/network/NetworkDigital'
import { productContext } from '../../context'
import PrepurchaseDataGathering from '../modules/prepurchaseDataGathering/PrepurchaseDataGathering'

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
                <PrepurchaseDataGathering />
                <NetworkDigital />
            </VStack>
        </ProductCollapse>
    )
}

export default General