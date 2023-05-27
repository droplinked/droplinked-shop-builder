import React from 'react'
import { Box, VStack } from '@chakra-ui/react'
import Collection from '../modules/Collection'
import ProductPageTitle from '../modules/title/ProductPageTitle'
import ProductName from '../modules/name/ProductName'
import DescriptionProduct from '../modules/description/DescriptionProduct'
import ProductImages from '../modules/images/ProductImages'
import ShippingProduct from '../modules/shipping/ShippingProduct'
import AppCard from 'components/common/card/AppCard'

function General() {
    return (
        <AppCard mini>
            <VStack spacing={10} align={"stretch"}>
                <ProductPageTitle
                    head
                    title='General Information'
                    description='Add product details, categorize them into collection(s), select the shipping method'
                />
                <ProductName />
                <DescriptionProduct />
                <ProductImages />
                <Collection />
                <Box paddingTop={30}><ShippingProduct /></Box>
            </VStack>
        </AppCard>
    )
}

export default General