import { Box, Image } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";

import { designContext } from "../../design-context";
import { BANNER_DEFAULT_IMSGES } from "./default-images";

import HeaderBannerComponent from "./components/header-banner-component/HeaderBannerComponent";
import ImagesSliderBannerComponent from "./components/images-slider-banner-component/ImagesSliderBannerComponent";
import { useLocation } from "react-router-dom";

const BannerComponent = () => {
  const { state: { backgroundColor, backgroundImage } } = useContext(designContext);
  const [images, setImages] = useState(BANNER_DEFAULT_IMSGES);
  const [LoadImage, setLoadImage] = useState(false)
  const location = useLocation().pathname;

  const addNewImage = (imageSrc) => setImages(prev => ([{ banner_src: imageSrc, image: imageSrc }, ...prev]));

  // Append image saved to images list for mode setting 
  useEffect(() => {
    if (location.includes("settings") && backgroundImage && !LoadImage) {
      addNewImage(backgroundImage)
      setLoadImage(true)
    }
  }, [location, backgroundImage])

  return (
    <Box w="100%">
      <HeaderBannerComponent addNewImage={addNewImage} />
      <Box w="100%" h="200px" pos="relative" overflow="hidden" mb="18px">
        <Box
          pos="absolute"
          h="100%"
          w="50%"
          maxW="50%"
          left="0px"
          bg={backgroundColor}
          boxShadow={`50px 2px 60px 60px ${backgroundColor}`}
          zIndex={3}
        />
        <Image
          src={backgroundImage}
          w="auto"
          h="100%"
          pos="absolute"
          right="0px"
        />
      </Box>
      <ImagesSliderBannerComponent images={images} />
    </Box>
  );
};

export default BannerComponent;
