import { Flex, Box, Image, Text } from "@chakra-ui/react";
import { productData } from "./product-data";

import leftFlash from "../../../assest/icon/left-flash.svg";
import rightFlash from "../../../assest/icon/right-flash.svg";
import lockIcon from "../../../assest/icon/lockIcon.svg";

import SkuComponent from "./sku-component"

const AffiliateProduct = () => {


  let images = productData.images;

  return (
    <Box px={{base:"20px",md:"40px",lg:'60px',xl:"80px"}} w="100%">
      <Box w="100%" p={{base:'40px 20px',lg:'40px 80px',xl:"60px 140px"}} bg="mainLayer" borderRadius="8px">

        <Flex w="100%" columnGap={{md:'0px',lg:'40px',xl:"80px"}} flexDir={{base:"column" , lg:'row'}}>

          <Box w={{lg:'300px',xl:"350px"}} >
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
          <Box mb={{base:"40px" , lg:'0px'}}></Box>
          <Box w={{base:"100%",lg:"calc(100% - 430px)"}} py="24px">
            <Text fontSize={{lg:"1.5rem",xl:"1.8rem"}} fontWeight="700" color="white">
              {productData.title}
            </Text>
            <Box mb="18px"></Box>
            <Text fontSize={{base:"10px",lg:"14px",xl:"16px"}} fontWeight="500" color="white">
              Descripption
            </Text>
            <Box mb="10px"></Box>
            <Text fontSize={{base:"10px",md:'14px',lg:"12px",xl:"18px"}} fontWeight="500" color="lightGray">
              {productData.description}
            </Text>
            <Box mb="18px"></Box>
            <Flex alignItems="center">
              <Flex
                w={{base:'20px',lg:"28px"}}
                h={{base:'20px',lg:"28px"}}
                minH={{base:'20px',lg:"28px"}}
                minW={{base:'20px',lg:"28px"}}
                bg="primary"
                borderRadius="50% 50% 0px 50%"
                alignItems="center"
                justifyContent="center"
                mr="12px"
              >
                <Image src={lockIcon} w={{base:"14px",lg:"20px"}} h={{base:"14px",lg:"20px"}} />
              </Flex>
              <Text fontSize={{base:"10px",md:'14px',lg:"12px",xl:"18px"}} fontWeight="500" color="lightGray">
                {productData.ruleset}
              </Text>
            </Flex>
          </Box>


        </Flex>

        <Box mb='80px'></Box>

          {productData.skus.map((sku,i)=>{
            return <SkuComponent sku={sku} key={i}/>
          })}
      </Box>
    </Box>
  );
};

export default AffiliateProduct;
