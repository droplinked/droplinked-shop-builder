import { Box, VStack } from '@chakra-ui/react'
import InputImagesGroup from 'pages/prodcut-pages/components/InputImageGroupe/Input-images-component'
import { productContext } from 'pages/product/single/context'
import React, { useContext } from 'react'
import introductionClass from '../../general/model'
import SkeletonProduct from '../skeleton/SkeletonProduct'
import ProductPageTitle from '../title/ProductPageTitle'

function ProductImages() {
    const { state: { media }, methods: { updateState } } = useContext(productContext)
    const { refactorImage, defactorImage } = introductionClass
    
    return (
        <VStack align={"stretch"}>
            <Box>
                <ProductPageTitle
                    title='Product Images'
                    description='You can upload static images, or generate some 3D views of your design'
                />
            </Box>
            <Box>
                <SkeletonProduct width={"30%"} height={"200px"}>
                    <InputImagesGroup setState={(images: any) => updateState("media", refactorImage(images))} state={defactorImage(media)} />
                </SkeletonProduct>
            </Box>
        </VStack>
    )
}

export default ProductImages