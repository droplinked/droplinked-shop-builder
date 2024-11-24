import { Box, HStack } from '@chakra-ui/react';
import AppImage from 'components/common/image/AppImage';
import AppTypography from 'components/common/typography/AppTypography';
import { useCustomNavigate } from 'functions/hooks/useCustomeNavigate/useCustomNavigate';
import React from 'react';
import ProductListModel from '../../model';

function ImageListProduct({ product }) {
    const { shopRoute } = useCustomNavigate()
    const { getProductMainImage } = ProductListModel
    const main = getProductMainImage(product)

    return (
        <a href={`${shopRoute}/products/${product._id}`} target="_blank">
            <HStack width={"250px"} color="#FFF">
                <Box width={"50px"}><AppImage src={main} /></Box>
                <Box width={"100%"}><AppTypography fontSize="12px">{product.title}</AppTypography></Box>
            </HStack>
        </a>
    )
}

export default ImageListProduct