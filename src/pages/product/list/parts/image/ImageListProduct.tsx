import React from 'react'
import { Box, HStack, Text } from '@chakra-ui/react';
import AppImage from 'components/shared/image/AppImage';
import { useProfile } from 'hooks/useProfile/useProfile';
import { useCustomNavigate } from 'hooks/useCustomeNavigate/useCustomNavigate';

function ImageListProduct({ product }) {
    const { shop } = useProfile()
    const { redirectToIo } = useCustomNavigate()

    return (
        <a href={redirectToIo({ productID: product._id })}>
            <HStack width={"250px"} color="#FFF">
                <Box width={"50px"}><AppImage src={product.media && product.media[0].url} /></Box>
                <Box><Text>{product.title}</Text></Box>
            </HStack>
        </a>
    )
}

export default ImageListProduct