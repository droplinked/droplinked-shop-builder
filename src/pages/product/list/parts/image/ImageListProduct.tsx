import React from 'react'
import { Box, HStack, Text } from '@chakra-ui/react';
import AppImage from 'components/common/image/AppImage';
import { useCustomNavigate } from 'functions/hooks/useCustomeNavigate/useCustomNavigate';
import ProductListModel from '../../model';

function ImageListProduct({ product }) {
    const { shopRoute } = useCustomNavigate()
    const { getMain } = ProductListModel
    const main = getMain(product)

    return (
        <a href={`${shopRoute}/products/${product._id}`} target="_blank">
            <HStack width={"250px"} color="#FFF">
                <Box width={"50px"}><AppImage src={main ? main : product?.thumb} /></Box>
                <Box width={"100%"}><Text>{product.title}</Text></Box>
            </HStack>
        </a>
    )
}

export default ImageListProduct