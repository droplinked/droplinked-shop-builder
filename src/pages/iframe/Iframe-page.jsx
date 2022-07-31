import { useState } from "react"
import { Flex, AspectRatio,  Image, keyframes, usePrefersReducedMotion } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import right from "../../assest/icon/righIcon.png"
import left from "../../assest/icon/leftflask.png"

const imagesUrl = [
    "https://cdn.shopify.com/s/files/1/0610/2155/2803/products/CP-TShirt-Samurai-Front-500.jpg?v=1651769331",
    "https://cdn.shopify.com/s/files/1/0610/2155/2803/products/CP-TShirt-Samurai-Back-500.jpg?v=1651769331",
    "https://cdn.shopify.com/s/files/1/0610/2155/2803/products/CP-TShirt-1_1.jpg?v=1651767629",
    "https://cdn.shopify.com/s/files/1/0610/2155/2803/products/CP-TShirt-Geisha-Front-500.jpg?v=1651779259"
]

const keyframe_imageAnimation = keyframes`
0% {
    transform: scale(0.1,0.1);
    opacity: 0;
}
100% {
    transform: scale(1,1);
  opacity: 1;
}
`;

const Iframe = () => {
    const [currentImage, setCurrentImage] = useState(0)

    const prefersReducedMotion = usePrefersReducedMotion();
    let navigate = useNavigate();


    const imageAnimation = prefersReducedMotion
        ? undefined
        : `${keyframe_imageAnimation}  0.3s linear`;
    //


    const previous = () => {
        if (currentImage == 0){
            setCurrentImage(3)
        }else{
            setCurrentImage(p => p-1)
        }
    }

    const next = () => {
        if (currentImage == 3){
            setCurrentImage(0)
        }else{
            setCurrentImage(p => p+1)
        }
    }

    const clickOnImage = () => {
        navigate("/bedishop/merch/62d7b7aa4bb67e1c91d3ce59")
    }

    return (
        <Flex
            w='100%'
            h='100%'
            top='0'
            left='0'
            pos='fixed'
            zIndex='50'
            bgColor='#222'
            justifyContent='center'
            alignItems='center'
        >
            <Flex
                h='85%'
                w='7%'
                border='1px'
                cursor='pointer'
            >
                <Image m='auto' src={left} onClick={previous} />
            </Flex>

            {imagesUrl.map((image, i) => {
                if (i == currentImage) {
                    return (
                        <AspectRatio
                            ratio={1}
                            w={{ base: '85%', md: '600px' }}
                            h='auto'
                        >
                            <Image
                                src={image}
                                animation={imageAnimation}
                                borderRadius='8px'
                                onClick={clickOnImage}
                            />
                        </AspectRatio>
                    )
                }
            })}

            <Flex
                h='85%'
                w='7%'
                cursor='pointer'
            >
                <Image src={right} m='auto' onClick={next} />
            </Flex>

        </Flex>
    )
}

export default Iframe