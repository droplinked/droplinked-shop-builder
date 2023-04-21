import { Box, Image } from "@chakra-ui/react";
import { useContext, useState } from "react";

import { designContext } from "../../design-context";
import { BANNER_DEFAULT_IMSGES } from "./default-images";

import HeaderBannerComponent from "./components/header-banner-component/HeaderBannerComponent";
import ImagesSliderBannerComponent from "./components/images-slider-banner-component/ImagesSliderBannerComponent";

const BannerComponent = () => {
  const [images, setImages] = useState(BANNER_DEFAULT_IMSGES);

  const {
    state: { backgroundColor, backgroundImage },
  } = useContext(designContext);

  const addNewImage = (imageSrc) => {
    const newArray = Array.from(images);
    newArray.push({ banner_src: imageSrc, image: imageSrc });
    setImages(newArray);
  };
  console.log("images ", images);
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
