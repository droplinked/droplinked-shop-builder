import { Box, VStack } from '@chakra-ui/react'
import AppErrors from 'lib/utils/statics/errors/errors'
import { productContext } from 'pages/product/single/context'
import React, { useContext, useEffect } from 'react'
import introductionClass from '../../general/model'
import SkeletonProduct from '../skeleton/SkeletonProduct'
import ProductPageTitle from '../title/ProductPageTitle'
import InputImagesGroup from './parts/Input-images-component/InputImageGroupe/Input-images-component'

function ProductImages() {
    const { state: { media, product_type, thumb }, methods: { updateState } } = useContext(productContext)
    const { refactorImage, defactorImage } = introductionClass

    return (
        <>
            {["DIGITAL", "NORMAL"].includes(product_type) && (
                <VStack align={"stretch"}>
                    <ProductPageTitle
                        title={product_type === "NORMAL" ? 'Product Images' : 'Product Preview'}
                        isReuired
                        description={product_type === "NORMAL" ? 'Upload static images of your product.' : 'Upload images of the digital product.'}
                    />
                    <Box>
                        <SkeletonProduct width={"30%"} height={"200px"}>
                            <InputImagesGroup
                                message={AppErrors.store.upload("The product image")}
                                onSuccess={(images: any) => !thumb.length && images?.small && updateState("thumb", images?.small)}
                                setState={(images: any) => updateState("media", refactorImage(images))}
                                state={defactorImage(media)} />
                        </SkeletonProduct>
                    </Box>
                </VStack>
            )}
        </>
    )
}

export default ProductImages