import React from 'react'
import { Box, HStack, Text } from '@chakra-ui/react';
import AppImage from 'components/common/image/AppImage';
import { useProfile } from 'functions/hooks/useProfile/useProfile';
import { useCustomNavigate } from 'functions/hooks/useCustomeNavigate/useCustomNavigate';

function ImageListProduct({ product }) {
    const { shop } = useProfile()
    const { shopRoute } = useCustomNavigate()

    return (
        <a href={`${shopRoute}/products/${product._id}`} target="_blank">
            <HStack width={"250px"} color="#FFF">
                <Box width={"50px"}><AppImage src={product?.thumb || product?.media && product?.media.length && product.media[0].url} /></Box>
                <Box><Text>{product.title}</Text></Box>
            </HStack>
        </a>
    )
}

export default ImageListProduct