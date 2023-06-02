import { Box, Flex, VStack } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import AppImage from 'components/common/image/AppImage'
import AppTypography from 'components/common/typography/AppTypography'
import { productContext } from 'pages/product/single/context'
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import InputImagesGroup from '../images/parts/Input-images-component/InputImageGroupe/Input-images-component'
import SkeletonProduct from '../skeleton/SkeletonProduct'
import ProductPageTitle from '../title/ProductPageTitle'

function ProductArtwork() {
    const { state: { artwork }, methods: { updateState } } = useContext(productContext)
    const [FileSize, setFileSize] = useState("")

    useEffect(() => artwork && getSizeImage(artwork), [artwork])

    const getSizeImage = useCallback((artwork: string) => {
        fetch(artwork)
            .then(response => response.blob())
            .then(blob => {
                let fileSizeInBytes = blob.size;
                let fileSizeInKilobytes = fileSizeInBytes / 1024;
                setFileSize(fileSizeInKilobytes.toFixed(2));
            });
    }, [])

    return (
        <VStack align={"stretch"}>
            <Flex justifyContent={"space-between"} alignItems="center">
                <ProductPageTitle
                    title='Artwork'
                    isReuired
                    description='Upload your design to print on the product. (Max artwork size 355.6x406.4 mm)'
                />
                {artwork && <BasicButton variant='outline' sizes='medium' onClick={() => updateState("artwork", null)}>Edit Artwork</BasicButton>}
            </Flex>
            <Box>
                {artwork ? (
                    <Flex justifyContent={"space-between"} alignItems="center">
                        <AppImage src={artwork} width="47px" height="47px" />
                        <AppTypography size='14px'>{FileSize} KB</AppTypography>
                    </Flex>
                ) : (
                    <SkeletonProduct width={"30%"} height={"200px"}>
                        <InputImagesGroup vertical setState={(images: any) => updateState("artwork", images[0])} state={[]} />
                    </SkeletonProduct>
                )}
            </Box>
        </VStack>
    )
}

export default ProductArtwork