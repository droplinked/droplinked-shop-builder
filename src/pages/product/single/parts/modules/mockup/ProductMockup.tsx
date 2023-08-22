import { Box, Flex, useDisclosure, VStack } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import AppUploadImage from 'components/common/upload/image/AppUploadImage'
import AppErrors from 'lib/utils/statics/errors/errors'
import { productContext } from 'pages/product/single/context'
import React, { useContext, useEffect } from 'react'
import introductionClass from '../../general/model'
import InputImagesGroup from '../images/parts/Input-images-component/InputImageGroupe/Input-images-component'
import SkeletonProduct from '../skeleton/SkeletonProduct'
import ProductPageTitle from '../title/ProductPageTitle'
import ProductIframe from './parts/iframe/ProductIframe'

function ProductMockup() {
    const { state: { media, thumb }, methods: { updateState }, store: { state: { variants } } } = useContext(productContext)
    const { refactorImage, defactorImage } = introductionClass
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <VStack align={"stretch"}>
                <Flex justifyContent={"space-between"} alignItems="center">
                    <ProductPageTitle
                        title='Mockups'
                        isReuired
                        description='Upload mockups of the POD product or use the 3D model to create it.'
                    />
                    {variants?.graphic_url && <BasicButton sizes='medium' onClick={onOpen}>Create 3D Model</BasicButton>}
                </Flex>
                <Box>
                    <SkeletonProduct width={"30%"} height={"200px"}>
                        <AppUploadImage
                            size='original'
                            toast={AppErrors.store.upload("Mockup")}
                            onSuccess={(images: any) => !thumb.length && images?.small && updateState("thumb", images?.small)}
                            onChange={(images: any) => updateState("media", refactorImage(images))}
                            onDelete={(images: any) => !images.length && updateState("thumb", "")}
                            values={defactorImage(media)} />
                    </SkeletonProduct>
                </Box>
            </VStack>
            {isOpen && <ProductIframe open={isOpen} close={onClose} />}
        </>
    )
}

export default ProductMockup