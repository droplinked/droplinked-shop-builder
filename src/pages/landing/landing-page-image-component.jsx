import mainImage from "../../assest/image/landingPageImage copy.WebP"
import { Box, Image, AspectRatio, keyframes, usePrefersReducedMotion } from '@chakra-ui/react'


const keyframe_rightanimation = keyframes`
0% {
    transform: translateX(200px);
    opacity: 0;
}
100% {
  transform: translateX(0);
  opacity: 1;
}
`;


export default function LandingpageImage() {

    const prefersReducedMotion = usePrefersReducedMotion();

    const rightsideAnimation = prefersReducedMotion
        ? undefined
        : `${keyframe_rightanimation}  1s linear`;

    return (
        <>
            <Box w={{ base: "100%", md: "50%" }} animation={rightsideAnimation}>
                <AspectRatio ratio={1 / 1}>
                    <Box w='100%' h='100%' pos='relative'>
                        <Image
                            pos='absolute'
                            top='0px'
                            maxW='100%'
                            src={mainImage} alt="" />
                    </Box>
                </AspectRatio>
            </Box>
        </>
    )
}