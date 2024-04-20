import { Box, Flex, Image } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import MainCard from '../../parts/card/MainCard';

function PartnersSlider() {
    const data = [
        {
            title: 'Unstoppable Domains',
            url: 'https://shop.unstoppabledomains.com/',
            icon: '/assets/images/homepage/uns.svg'
        },
        {
            title: 'Casper Punks',
            url: 'https://shop.casperpunks.io/',
            icon: '/assets/images/homepage/casper.svg'
        },
        {
            title: 'Skale',
            url: 'https://droplinked.io/skale',
            icon: '/assets/images/homepage/skale.svg'
        },
        {
            title: 'Polygon',
            url: 'https://droplinked.io/polygon',
            icon: '/assets/images/homepage/polygan.svg'
        }
    ]

    var settings = {
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        swipeToSlide: true,
        autoplay: true,
        autoplaySpeed: 2500,
        arrows: false
    }

    return (
        <Flex justify={"center"} width={"100%"}>
            <Box width={{ base: "100%", lg: "80%" }}>
                <Slider {...settings}>
                    {
                        data.map((el, key) => (
                            <MainCard transition="1s" padding={{ base: "24px", lg: "40px" }} key={key}>
                                <Image width={{ base: "36px", md: "64px" }} paddingBottom="10px" src={el.icon} alt={el.title} />
                                <AppTypography height={{ base: "42px", sm: "30px", md: "40px", lg: "72px" }} fontSize={{ base: "14px", sm: "16px", lg: "24px" }} fontWeight='bold' color="#f5f5f5">{el.title}</AppTypography>
                                <a href={el.url} target="_blank"><AppTypography backgroundColor="#292929" color="#C2C2C2" textAlign="center" borderRadius="8px" lineHeight="40px" height="40px" fontSize={{ base: '14px', md: '16px' }} fontWeight='normal'>View Store</AppTypography></a>
                            </MainCard>
                        ))
                    }
                </Slider>
            </Box>
        </Flex>
    );
}

export default PartnersSlider