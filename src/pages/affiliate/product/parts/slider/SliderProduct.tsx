import { Box, Flex, Image, VStack } from '@chakra-ui/react'
import AppImage from 'components/common/image/AppImage'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { ShopProductContext } from '../../context';

function SliderProduct() {
    const { product } = useContext(ShopProductContext)
    const [BigImage, setBigImage] = useState()

    useEffect(() => {
        if(product.media) setBigImage(product.media[0].url)
    }, [product])    

    return (
        <Flex gap={2} align={"stretch"} position={"relative"} >
            <Box width={"15%"} height={"100%"} position="absolute" padding={2}>
                <Swiper spaceBetween={5} style={{width:"100%", height:"100%"}} slidesPerView={6} direction="vertical">
                    {product.media.map((el:any, key:number) => (
                        <SwiperSlide key={key}>
                            <AppImage src={el.url} borderRadius="8px" cursor={"pointer"} opacity={BigImage === el ? 1 : .7} onClick={() => setBigImage(el.url)} width="100%" />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Box>
            <Box><Image src={BigImage} borderRadius="8px" width={"auto !important"} height="100%" /></Box>
        </Flex >
    )
}

export default SliderProduct