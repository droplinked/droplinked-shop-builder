import React, { useState, useContext } from "react";
import { Box, VStack, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { designerContext } from "pages/storefront-designer/context/designerContext";

const uploadAddress = "https://upload-file-flatlay.s3.us-west-2.amazonaws.com";

const OptionBannerModel = {
  defaults: [
    {
      banner_src: uploadAddress + "/91b9390f2d29012f8920c49444f30fd815c8ae033cc2894707cc011042fcd41c.png_or.png",
      thumb: uploadAddress + "/91b9390f2d29012f8920c49444f30fd815c8ae033cc2894707cc011042fcd41c.png",
      color: "#27262B",
    },
    {
      banner_src: uploadAddress + "/4e72d49e4de6b50c66be928360af0f78442299d11af80751c51d8dfcf14dd9bf.png_or.png",
      thumb: uploadAddress + "/4e72d49e4de6b50c66be928360af0f78442299d11af80751c51d8dfcf14dd9bf.png",
      color: "#27262B",
    },
    {
      banner_src: uploadAddress + "/97d61d7fb0fd493c15267dfe912dbd418beb119eddb607fd5f543dd8386815b1.png_or.png",
      thumb: uploadAddress + "/97d61d7fb0fd493c15267dfe912dbd418beb119eddb607fd5f543dd8386815b1.png",
      color: "#27262B",
    },
    {
      banner_src: uploadAddress + "/6615ad35af266a1107ce8aae97442c4d4774cf42989f7f32b417c418f0a4fcdd.png_or.png",
      thumb: uploadAddress + "/6615ad35af266a1107ce8aae97442c4d4774cf42989f7f32b417c418f0a4fcdd.png",
      color: "#27262B",
    },
    {
      banner_src: uploadAddress + "/ca99d11b41ee8bc01492b27bd1b74b54d6932a755fca77e29fb2f6d8a92b3bd9.png_or.png",
      thumb: uploadAddress + "/ca99d11b41ee8bc01492b27bd1b74b54d6932a755fca77e29fb2f6d8a92b3bd9.png",
      color: "#27262B",
    },
  ],
};

const CoverImageSection: React.FC = () => {
  const [selectedBanner, setSelectedBanner] = useState<number | null>(null);
  const { methods: { dispatch } } = useContext(designerContext);

  const handleSelectBanner = (index: number) => {
    setSelectedBanner(index);
    
    // Update the backgroundImage with the selected banner's image
    const selectedImage = OptionBannerModel.defaults[index];
    dispatch({ 
      type: "updateShop", 
      params: { backgroundImage: selectedImage.banner_src } 
    });
  };

  return (
    <VStack spacing={4} width="100%" align="stretch">
      <SimpleGrid columns={2} spacing="12px" width="100%">
        {OptionBannerModel.defaults.map((banner, index) => (
          <Box
            key={index}
            p={1}
            borderRadius="lg"
            border="1px solid"
            borderColor={selectedBanner === index ? "main.primary" : "neutral.gray.800"}
            cursor="pointer"
            onClick={() => handleSelectBanner(index)}
          >
            <Image
              src={banner.thumb}
              alt={`Banner option ${index + 1}`}
              height="100px"
              width="138px"
              borderRadius="md"
              objectFit="cover"
              m="4px"
            />
          </Box>
        ))}
      </SimpleGrid>
    </VStack>
  );
};

export default CoverImageSection;
