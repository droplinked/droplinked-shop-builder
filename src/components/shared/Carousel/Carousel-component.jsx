import { Box, Image, Flex } from "@chakra-ui/react"
import { useState, useEffect } from "react"

import leftIcon from "../../../assest/icon/leftflask.png"
import rightIcon from "../../../assest/icon/righIcon.png"

export default function Carousel({ imagesArray }) {

    // array of all images 
    const [images, setImages] = useState(null)
    // main image
    const [mainImage, setMainImage] = useState(null)
    // start point of images in botom side
    const [startpoint, setStartpoint] = useState(0)

    // init main image in firts render
    useEffect(() => {
        if (imagesArray.length > 0) {
            setMainImage(imagesArray[0].url)
        }
    }, [imagesArray])

    useEffect(() => {
        // recalculate images after changing start point or imageArray props
        if (imagesArray.length > 0) {
            // get 4 first images
            let imagesGallery = imagesArray.filter((image, i) => {
                if (i >= startpoint && i < startpoint + 4) {
                    return image
                }
            });
            // map images to array
            imagesGallery = imagesGallery.map(image => image.url)
            setImages(imagesGallery);
        }
    }, [startpoint, imagesArray])



    const next = () => {
        if (startpoint + 4 < imagesArray.length) {
            setStartpoint(p => p + 1)
        }
    }

    const previous = () => {
        if (startpoint > 0) {
            setStartpoint(p => p - 1)
        }
    }

    return (
        <Box w="100%" h="100%">
            {(imagesArray.length > 0) &&
                <>
                    {/* main image */}
                    <Box h='calc(100% - 60px)'>
                        <Image
                            src={mainImage}
                            borderRadius='16px'
                            overflow='hidden'
                            mb='15px'
                        />
                    </Box>
                    {/* main image */}
                    {/* bottom side */}
                    <Flex h='60px' justifyContent='space-between' alignItems='center'>
                        <CarouselBtn icon={leftIcon} click={previous} />
                        {(images) &&
                            images.map((image, i) => {
                                if (i < 4) {
                                    return <Image
                                        key={i}
                                        w='50px'
                                        h='50px'
                                        borderRadius='8px'
                                        cursor='pointer'
                                        onClick={() => { setMainImage(image) }}
                                        src={image}
                                        alt=""
                                    />
                                }
                            })}
                        <CarouselBtn icon={rightIcon} click={next} />
                    </Flex>
                    {/* bottom side */}
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