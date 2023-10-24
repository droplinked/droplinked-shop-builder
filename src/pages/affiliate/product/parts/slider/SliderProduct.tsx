import { Box, Flex, Image } from '@chakra-ui/react'
import React, { useContext, useEffect } from 'react'
import "swiper/css";
import { ShopProductContext } from '../../context';

function SliderProduct() {
    const { product, states: { slider }, updateState } = useContext(ShopProductContext)

    useEffect(() => {
        if (product.media) updateState('slider', product.media[0].url)
    }, [product])

    return (
        <Flex gap={2} align={"stretch"} position={"relative"} >
            <Box><Image src={slider} borderRadius="8px" width={"auto !important"} height="100%" /></Box>
        </Flex >
    )
}

export default SliderProduct