import {
  Box,
  Image,
  Flex,
  keyframes,
  usePrefersReducedMotion,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

import leftIcon from "../../../assest/icon/leftflask.png";
import rightIcon from "../../../assest/icon/righIcon.png";
import fullsizeIcon from "../../../assest/icon/fillsize.svg";
import FullsizeImage from "./FullsizeImage-component";

const keyframe_imageAnimation = keyframes`
0% {
    opacity: 0;
}
100% {
  opacity: 1;
}
`;

// Carousel component get array of object that contain url and build a image carousel of these images
// imagesArray format = [{...,url:"imageUrl"} , { } ,....]

export default function Carousel({ videoUrl, imagesArray, lock }) {
  const prefersReducedMotion = usePrefersReducedMotion();

  // array of all images
  const [images, setImages] = useState(null);
  // main image
  const [mainImage, setMainImage] = useState(0);
  // start point of images in botom side
  const [startpoint, setStartpoint] = useState(0);
  //fullsize image
  const [fullsizeImage, setFullsizeImage] = useState(null);

  const imageAnimation = prefersReducedMotion
    ? undefined
    : `${keyframe_imageAnimation}  0.5s linear`;

  useEffect(() => {
    if (imagesArray.length > 0) {
      //initial image state with array of urls : [" " , " " ,...]
      let imagesGallery = imagesArray.map((image) => image.url);
      setImages(imagesGallery);
    }
  }, [imagesArray]);

  // Increase start point
  const next = () => {
    if (startpoint + 4 < imagesArray.length) {
      setStartpoint((p) => p + 1);
    }
  };

  // decrease start point
  const previous = () => {
    if (startpoint > 0) {
      setStartpoint((p) => p - 1);
    }
  };

  const closeFullsize = () => {
    setFullsizeImage(null);
  };

  const openFullsize = () => {
    setFullsizeImage(images[mainImage]);
  };

  return (
    <Box w="100%" h="100%">
      {imagesArray.length > 0 && (
        <>
          {/* main image wrapper */}
          <Box h="calc(100% - 60px)" pos="relative">
            {/* full size icon */}
            {/* <Flex
              justifyContent="center"
              alignItems="center"
              w={{ base: "25px", md: "36px" }}
              h={{ base: "25px", md: "36px" }}
              borderRadius="50%"
              bgColor="#222"
              pos="absolute"
              top="10px"
              right="10px"
              cursor="pointer"
              onClick={openFullsize}
            >
              <Image
                w={{ base: "15px", md: "20px" }}
                h={{ base: "15px", md: "20px" }}
                src={fullsizeIcon}
              />
            </Flex> */}
            {/* full size icon */}
            {/* <Box
              pos="absolute"
              top="10px"
              right="10px"
              w={{ base: "25px", md: "36px" }}
              h={{ base: "25px", md: "36px" }}
              p={{ base: "4px", md: "6px" }}
              bgColor="#222"
              borderRadius='50%'
            >
              {true ? <LockIcon /> : <UnlockIcon />}
            </Box> */}
            {videoUrl ? (
              <video
                style={{
                  maxWidth: "100%",
                  width: "100%",
                  height: "100%",
                  minHeight: "100%",
                  aspectRatio: "1/1",
                }}
                playsInline
                controlsF
                autoPlay
                loop
                muted
                controlsList="none"
                alt="All the devices"
                src={videoUrl}
              />
            ) : (
              <>
                {images &&
                  images.map((image, i) => {
                    //select image with same index with mainImage
                    if (i == mainImage) {
                      return (
                        <Image
                          src={image}
                          animation={imageAnimation}
                          borderRadius="8px"
                          overflow="hidden"
                          mb="15px"
                          cursor="pointer"
                          onClick={openFullsize}
                        />
                      );
                    }
                  })}
              </>
            )}
          </Box>
          {/* main image wrapper */}
          {/* bottom side */}
          <Flex h="60px" justifyContent="space-between" alignItems="center">
            <CarouselBtn icon={leftIcon} click={previous} />
            {images &&
              // show images from start point until 4 maximum
              images.map((image, i) => {
                if (i >= startpoint && i < startpoint + 4) {
                  return (
                    <Image
                      key={i}
                      w={{ base: "50px", md: "50px", lg: "70px" }}
                      h={{ base: "50px", md: "50px", lg: "70px" }}
                      borderRadius="8px"
                      cursor="pointer"
                      onClick={() => {
                        setMainImage(i);
                      }}
                      src={image}
                      alt=""
                    />
                  );
                }
              })}
            <CarouselBtn icon={rightIcon} click={next} />
          </Flex>
          {/* bottom side */}
        </>
      )}
      {fullsizeImage && (
        <FullsizeImage image={fullsizeImage} close={closeFullsize} />
      )}
    </Box>
  );
}

function CarouselBtn({ icon, click }) {
  return (
    <Flex
      bgColor="#353536"
      borderRadius="25px"
      w="35px"
      h="35px"
      alignItems="center"
      justifyContent="center"
      cursor="pointer"
    >
      <Image src={icon} w="20px" h="20px" onClick={click} />
    </Flex>
  );
}
