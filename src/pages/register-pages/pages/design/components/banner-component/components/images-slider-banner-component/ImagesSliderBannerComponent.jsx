import React, { useContext } from "react";
import { Flex, Image } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { designContext } from "pages/register-pages/pages/design/design-context";
import "swiper/css";

const ImagesSliderBannerComponent = ({ images }) => {

  const {
    state: { backgroundImage },
    methods: { updateState },
  } = useContext(designContext);


  const selectImage = (imageObject) => {
    updateState("backgroundImage", imageObject.banner_src);
    updateState("backgroundImageSecondary", imageObject.banner_src);
    if (imageObject.color) updateState("backgroundColor", imageObject.color);
  };

  return (
    <Flex wrap="wrap">
      <Swiper spaceBetween={10} slidesPerView={4.7} lazyPreloadPrevNext >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Image
              width={"100%"}
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
          </SwiperSlide>
        ))}
      </Swiper>
    </Flex>
  );
};

export default ImagesSliderBannerComponent;
