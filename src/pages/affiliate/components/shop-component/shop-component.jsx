import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import instaIcon from "../../../../assest/icon/insta.png";
import discordIcon from "../../../../assest/icon/newdiscord.png";
import twitterIcon from "../../../../assest/icon/twitter.png";
import webIcon from "../../../../assest/icon/web.png";

import ProductComponent from "../product-component/product-component";

const ShopComponent = ({ shop }) => {
  useEffect(() => {
    console.log(window.innerWidth);
  }, [window.innerWidth]);

  const getNumberOfItem = () => {
    if (window.innerWidth > 1200) return 5;
    else if (window.innerWidth > 1000) return 4;
    else if (window.innerWidth > 800) return 3;
    else return 2;
  };

  let numberOfItems = getNumberOfItem();

  console.log("numberOfItems", numberOfItems);

  return (
    <Flex p={{ base: "12px 20px", md: "24px 40px", lg: "36px 60px" }} h="auto">
      {/* shop data */}
      <Box
        w={{ base: "116px", md: "186px", lg: "236px" }}
        py="16px"
        pr="36px"
        borderRight="1px solid"
        borderColor="line"
      >
        <Image
          src={shop.logo}
          w={{ base: "24px", md: "36px", lg: "48px" }}
          h={{ base: "24px", md: "36px", lg: "48px" }}
          borderRadius="50%"
        />
        <Box mb="16px"></Box>
        <Text
          fontSize={{ base: "12px", md: "16px", lg: "22px" }}
          fontWeight="700"
          color="primary"
        >
          {shop.shopname}
        </Text>
        <Box mb="16px"></Box>
        <Text
          fontSize={{ base: "8px", md: "12px", lg: "14px" }}
          fontWeight="500"
          color="lightGray"
        >
          {shop.description}
        </Text>
        <Box mb="16px"></Box>
        <Flex>
          <Image
            src={instaIcon}
            href={`https://www.instagram.com/${shop.instagramUrl}`}
            w={{ base: "6px", md: "10px", lg: "12px" }}
            h={{ base: "6px", md: "10px", lg: "12px" }}
            mr={{ base: "4px", md: "6px" }}
            cursor="pointer"
          />
          <Image
            src={discordIcon}
            href={`https://discord.gg/${shop.discordUrl}`}
            w={{ base: "6px", md: "10px", lg: "12px" }}
            h={{ base: "6px", md: "10px", lg: "12px" }}
            mr={{ base: "4px", md: "6px" }}
            cursor="pointer"
          />
          <Image
            src={twitterIcon}
            href={`https://twitter.com/${shop.twitterUrl}`}
            w={{ base: "6px", md: "10px", lg: "12px" }}
            h={{ base: "6px", md: "10px", lg: "12px" }}
            mr={{ base: "4px", md: "6px" }}
            cursor="pointer"
          />
          <Image
            src={webIcon}
            href={`https://${shop.webUrl}`}
            w={{ base: "6px", md: "10px", lg: "12px" }}
            h={{ base: "6px", md: "10px", lg: "12px" }}
            mr={{ base: "4px", md: "6px" }}
            cursor="pointer"
          />
        </Flex>
      </Box>
      {/* shop data */}
      <Flex w="100%" h="auto" pl="36px" columnGap="16px" overflowY="hidden">
        {shop.products.map((product, i) => {
          if (i < numberOfItems) return <ProductComponent product={product} />;
        })}
        <Flex
          w="100%"
          h="100%"
          bg="mainLayer"
          borderRadius="8px"
          p="16px"
          justifyContent="center"
          alignItems="center"
        >
          <Text fontSize="24px" fontWeight="500" color="darkGray">
            {shop.products.length - numberOfItems}+
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ShopComponent;
