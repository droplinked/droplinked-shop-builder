import React, { useState, useContext } from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";

import { designContext } from "pages/register-pages/pages/design/design-context";

const ImagesSliderBannerComponent = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const {
    state: { backgroundColor, backgroundImage },
    methods: { updateState },
  } = useContext(designContext);

  const handlePrevClick = () => {
    setCurrentSlide((currentSlide - 1 + images.length) % images.length);
  };

  const handleNextClick = () => {
    if (currentSlide + 4 < images.length) setCurrentSlide((pre) => ++pre);
  };

  const selectImage = (imageObject) => {
    updateState("backgroundImage", imageObject.banner_src);
    updateState("backgroundImageSecondary", imageObject.banner_src);
    if (imageObject.color) updateState("backgroundColor", imageObject.color);
  };

  return (
    <Box>
      <Flex wrap="wrap">
        {images.slice(currentSlide, currentSlide + 4).map((image, index) => (
          <Box key={index} p={2} flexBasis="25%">
            <Image
              src={image.image}
              borderRadius="4px"
              border={
                backgroundImage === image.banner_src
                  ? "4px solid #2EC99E"
                  : "none"
              }
              onClick={() => {
                selectImage(image);
              }}
              cursor="pointer"
            />
          </Box>
        ))}
      </Flex>
      <Flex justify="space-between" align="center" py="0px" h="10px">
        <Text
          color="white"
          fontSize="32px"
          onClick={handlePrevClick}
          disabled={currentSlide === 0}
          _disabled={{ color: "gray" }}
          cursor="pointer"
        >
          &#60;
        </Text>

        <Text
          color="white"
          fontSize="32px"
          onClick={handleNextClick}
          disabled={currentSlide === images.length - 4}
          _disabled={{ color: "gray" }}
          cursor="pointer"
        >
          &#62;
        </Text>
      </Flex>
    </Box>
  );
};

export default ImagesSliderBannerComponent;
