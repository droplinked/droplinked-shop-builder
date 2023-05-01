import { Box, Flex, Image, VStack } from '@chakra-ui/react'
import { faker } from '@faker-js/faker'
import AppImage from 'components/shared/image/AppImage'
import React, { useMemo, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

function SliderProduct() {
    const [BigImage, setBigImage] = useState(faker.image.nature())

    const thumb = useMemo(() => {
        return [
            faker.image.image(),
            faker.image.image(),
            faker.image.image(),
            faker.image.image(),
            faker.image.image(),
            faker.image.image(),
            faker.image.image(),
        ]
    }, [])

    return (
        <Flex gap={2} align={"stretch"} position={"relative"} >
            <Box width={"15%"} height={"100%"} position="absolute" padding={2}>
                <Swiper spaceBetween={5} style={{width:"100%", height:"100%"}} slidesPerView={6} direction="vertical">
                    {thumb.map((el, key) => (
                        <SwiperSlide key={key}>
                            <AppImage src={el} borderRadius="8px" cursor={"pointer"} opacity={BigImage === el ? 1 : .7} onClick={() => setBigImage(el)} width="100%" />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Box>
            <Box><Image src={BigImage} borderRadius="8px" width={"auto !important"} height="100%" /></Box>
        </Flex >
    )
}

export default SliderProduct