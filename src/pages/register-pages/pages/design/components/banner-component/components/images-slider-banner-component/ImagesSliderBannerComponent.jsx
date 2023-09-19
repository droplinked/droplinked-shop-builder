import React, { useContext } from "react";
import { Flex, Image } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { designContext } from "pages/register-pages/pages/design/design-context";
import "swiper/css";
import ActiveBox from "pages/register-pages/pages/design/parts/active/ActiveBox";

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
      <Swiper style={{ width: "100%" }} spaceBetween={10} slidesPerView={4.7} lazyPreloadPrevNext >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <ActiveBox props={{ width: "100%", borderRadius: "4px" }} active={backgroundImage === image.banner_src}>
              <Image
                width={"100%"}
                src={image.image}
                borderRadius="4px"
                onClick={() => selectImage(image)}
                cursor="pointer"
              />
            </ActiveBox>
          </SwiperSlide>
        ))}
      </Swiper>
    </Flex>
  );
};

export default ImagesSliderBannerComponent;
