import { Box, Image } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";

import { designContext } from "../../design-context";
import { BANNER_DEFAULT_IMSGES } from "./default-images";

import HeaderBannerComponent from "./components/header-banner-component/HeaderBannerComponent";
import ImagesSliderBannerComponent from "./components/images-slider-banner-component/ImagesSliderBannerComponent";
import { useLocation } from "react-router-dom";
import FullWidth from "./components/fullwidth/FullWidth";

const BannerComponent = () => {
  const { state: { backgroundColor, backgroundImage } } = useContext(designContext);
  const [images, setImages] = useState(BANNER_DEFAULT_IMSGES);
  const [LoadImage, setLoadImage] = useState(false);
  const location = useLocation().pathname;

  const addNewImage = (imageSrc) => setImages((prev) => [{ banner_src: imageSrc, image: imageSrc }, ...prev]);

  // Append image saved to images list for mode setting
  useEffect(() => {
    if (location.includes("settings") && backgroundImage && !LoadImage) {
      addNewImage(backgroundImage);
      setLoadImage(true);
    }
  }, [location, backgroundImage]);

  // Cache all image banner
  useEffect(() => BANNER_DEFAULT_IMSGES.map(el => fetch(el.banner_src)), [BANNER_DEFAULT_IMSGES])

  return (
    <Box w="100%">
      <Box w="100%" h="200px" pos="relative" overflow="hidden" mb="18px" borderRadius='8px' bg={backgroundColor}>
        <Image
          p="4px"
          src={backgroundImage}
          w="auto"
          h="auto"
          maxH="100%"
          pos="absolute"
          right="0px"
          zIndex={6}
        />
      </Box>
      <HeaderBannerComponent addNewImage={addNewImage} />
      <ImagesSliderBannerComponent images={images} />
      <FullWidth />
    </Box>
  );
};

export default BannerComponent;
