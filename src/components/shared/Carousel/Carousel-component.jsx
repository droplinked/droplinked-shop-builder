import { Box, Image, Flex } from "@chakra-ui/react"
import { icon } from "@fortawesome/fontawesome-svg-core"
import { useState, useEffect } from "react"

import leftIcon from "../../../assest/icon/leftflask.png"
import rightIcon from "../../../assest/icon/righIcon.png"

export default function Carousel({ imagesArray }) {

    const [images, setImages] = useState(null)
    const [mainImage, setMainImage] = useState(null)

    useEffect(() => {
        if (imagesArray.length > 0) {
            setMainImage(imagesArray[0].url)
            let imagesGallery = imagesArray.map((img, i) => {
                if (i < 4) return i
            })
            setImages(imagesGallery);
        }
    }, [imagesArray])

    return (
        <Box w="100%" h="100%">
            {(imagesArray.length > 0) &&
                <>
                    <Box h='calc(100% - 60px)'>
                        <Image
                            src={mainImage}
                            borderRadius='16px'
                            overflow='hidden'
                            mb='15px'
                        />
                    </Box>
                    <Flex h='60px' justifyContent='space-between' alignItems='center'>
                        <CarouselBtn icon={leftIcon} click={() => { }} />
                        {(images) &&
                            images.map((number, i) => {
                                if (i < 4) {
                                    return <Image
                                        key={i}
                                        w='50px'
                                        h='50px'
                                        borderRadius='8px'
                                        cursor='pointer'
                                        onClick={() => { setMainImage(imagesArray[number].url) }}
                                        src={imagesArray[number].url}
                                        alt=""
                                    />
                                }
                            })}
                        <CarouselBtn icon={rightIcon} click={() => { }} />
                    </Flex>
                </>
            }
        </Box>
    )
}


function CarouselBtn({ icon, click }) {

    return (
        <Flex
            bgColor='#353536'
            borderRadius='25px'
            w='35px'
            h='35px'
            alignItems='center'
            justifyContent='center'
            cursor='pointer'
        >
            <Image
                src={icon}
                w='20px'
                h='20px'
                onClick={click}
            />
        </Flex>
    )
}