import React from 'react'
import { Box, HStack, Text } from '@chakra-ui/react';
import AppImage from 'components/shared/image/AppImage';
import { Link } from 'react-router-dom';
import { useProfile } from 'hooks/useProfile/useProfile';

function ImageListProduct({ product }) {
    const { shop } = useProfile()

    return (
        <Link to={`/${shop.name}/c/product/${product._id}`}>
            <HStack width={"250px"} color="#FFF">
                <Box width={"50px"}><AppImage src={product.media && product.media[0].url} /></Box>
                <Box><Text>{product.title}</Text></Box>
            </HStack>
        </Link>
    )
}

export default ImageListProduct