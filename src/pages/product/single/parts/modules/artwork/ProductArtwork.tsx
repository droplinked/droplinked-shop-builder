import { Flex, VStack } from '@chakra-ui/react'
import FieldLabel from 'components/common/form/fieldLabel/FieldLabel'
import AppTypography from 'components/common/typography/AppTypography'
import { productContext } from 'pages/product/single/context'
import ProductModel from 'pages/product/single/model'
import React, { useContext, useMemo } from 'react'
import ProductPageTitle from '../title/ProductPageTitle'
import Artwork2d from './parts/2d/Artwork2d'
import ArtworkNormal from './parts/normal/ArtworkNormal'
import PropertiesPod from './parts/properties/PropertiesPod'

function ProductArtwork() {
    const { state: { positions, prodviderID, pod_blank_product_id }, store: { state: { print_positions } }, productID } = useContext(productContext)

    const title = useMemo(() => (
        <VStack align="stretch">
            <FieldLabel label="Product Template" isRequired />
            <AppTypography size='14px' color={"#C2C2C2"}>Utilize the Design Maker tool to create product mockups with artwork placement.</AppTypography>
        </VStack>
    ), [])

    return (
        <>
            {(ProductModel.isPrintful(prodviderID) && pod_blank_product_id) || (print_positions.length || (positions && productID)) ? (
                <>
                    {ProductModel.isPrintful(prodviderID) ? (
                        <VStack align="stretch" spacing={5}>
                            <Flex justifyContent="space-between" alignItems="center">
                                {title}
                                <Artwork2d />
                            </Flex>
                            <PropertiesPod />
                        </VStack>
                    ) : (
                        <VStack align="stretch" spacing={5}>
                            {title}
                            <ArtworkNormal />
                        </VStack>
                    )}
                </>
            ) : null}
        </>
    )
}

export default ProductArtwork