import { Box, Image, Flex, keyframes, usePrefersReducedMotion } from "@chakra-ui/react"
import { useState, useEffect } from "react"

import leftIcon from "../../../assest/icon/leftflask.png"
import rightIcon from "../../../assest/icon/righIcon.png"

const keyframe_imageAnimation = keyframes`
0% {
    opacity: 0;
}
100% {
  opacity: 1;
}
`;


export default function Carousel({ imagesArray }) {

    const prefersReducedMotion = usePrefersReducedMotion();

    // array of all images 
    const [images, setImages] = useState(null)
    // main image
    const [mainImage, setMainImage] = useState(0)
    // start point of images in botom side
    const [startpoint, setStartpoint] = useState(0)

    const imageAnimation = prefersReducedMotion
        ? undefined
        : `${keyframe_imageAnimation}  0.5s linear`;

    useEffect(() => {
        if (imagesArray.length > 0) {
            // initial images state
            let imagesGallery = imagesArray.map(image => image.url)
            setImages(imagesGallery);
        }
    }, [imagesArray])


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
                        {images && images.map((image, i) => {
                            //select image with same index with mainImage
                            if (i == mainImage) {
                                return (<Image
                                    src={image}
                                    animation={imageAnimation}
                                    borderRadius='16px'
                                    overflow='hidden'
                                    mb='15px'
                                />)
                            }
                        })}
                    </Box>
                    {/* main image */}
                    {/* bottom side */}
                    <Flex h='60px' justifyContent='space-between' alignItems='center'>
                        <CarouselBtn icon={leftIcon} click={previous} />
                        {(images) &&
                            // show images from start point until 4 maximum
                            images.map((image, i) => {
                                if (i >= startpoint && i < startpoint + 4) {
                                    return <Image
                                        key={i}
                                        w='50px'
                                        h='50px'
                                        borderRadius='8px'
                                        cursor='pointer'
                                        onClick={() => { setMainImage(i) }}
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