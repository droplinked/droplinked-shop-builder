import React from 'react'
import { Box, HStack, Text } from '@chakra-ui/react';
import AppImage from 'components/common/image/AppImage';
import { useCustomNavigate } from 'functions/hooks/useCustomeNavigate/useCustomNavigate';

function ImageListProduct({ product }) {
    const { shopRoute } = useCustomNavigate()

    return (
        <a href={`${shopRoute}/products/${product._id}`} target="_blank">
            <HStack width={"250px"} color="#FFF">
                <Box width={"50px"}><AppImage src={product?.thumb || product?.media && product?.media.length && product.media.find(el => el.isMain === 'true').url} /></Box>
                <Box width={"100%"}><Text>{product.title}</Text></Box>
            </HStack>
        </a>
    )
}

export default ImageListProduct