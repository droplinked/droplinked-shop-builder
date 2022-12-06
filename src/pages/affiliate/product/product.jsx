import { Flex, Box, Image, Text } from "@chakra-ui/react";
import { productData } from "./product-data";

import leftFlash from "../../../assest/icon/left-flash.svg";
import rightFlash from "../../../assest/icon/right-flash.svg";
import lockIcon from "../../../assest/icon/lockIcon.svg";

const AffiliateProduct = () => {
  let images = productData.images;

  return (
    <Box px="80px" w="100%">
      <Box w="100%" p="60px 140px" bg="mainLayer" borderRadius="8px">
        <Flex w="100%" columnGap="80px">
          <Box w="350px">
            <Image
              src={images[0]}
              borderRadius="8px"
              w="100%"
              aspectRation="1"
            />
            <Box mb="36px"></Box>
            <Flex w="100%" alignItems="center">
              <Image src={leftFlash} w="16px" h="100%" />

              <Flex
                w="calc(100%-32px)"
                justifyContent="space-around"
                columnGap="10px"
                px="10px"
              >
                {images.map((img, i) => {
                  if ((i > 0, i < 3))
                    return (
                      <Image
                        src={img}
                        key={i}
                        w="25%"
                        aspectRation="1"
                        borderRadius="8px"
                      />
                    );
                })}
              </Flex>

              <Image src={rightFlash} w="16px" h="100%" />
            </Flex>
          </Box>

          <Box w="calc(100% - 430px)" py="24px">
            <Text fontSize="24px" fontWeight="700" color="white">
              {productData.title}
            </Text>
            <Box mb="10px"></Box>
            <Text fontSize="18px" fontWeight="500" color="white">
              Descripption
            </Text>

            <Text fontSize="18px" fontWeight="500" color="lightGray">
              {productData.description}
            </Text>
            <Box mb="10px"></Box>
            <Flex alignItems="center">
              <Flex
                w="28px"
                h="28px"
                minH="28px"
                minW="28px"
                bg="primary"
                borderRadius="50% 50% 0px 50%"
                alignItems="center"
                justifyContent="center"
                mr="12px"
              >
                <Image src={lockIcon} w="20px" h="20px" />
              </Flex>
              <Text fontSize="18px" fontWeight="500" color="lightGray">
                {productData.ruleset}
              </Text>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default AffiliateProduct;
