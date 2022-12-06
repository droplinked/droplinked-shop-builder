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

  console.log('numberOfItems' , numberOfItems);

  return (
    <Flex p="36px 60px" h="auto">
      {/* shop data */}
      <Box
        w={{ base: "136px",md:'186px', lg: "236px" }}
        py="16px"
        pr="36px"
        borderRight="1px solid"
        borderColor="line"
      >
        <Image src={shop.logo} w="48px" h="48px" borderRadius="50%" />
        <Box mb="16px"></Box>
        <Text fontSize="22px" fontWeight="700" color="primary">
          {shop.shopname}
        </Text>
        <Box mb="16px"></Box>
        <Text fontSize="14px" fontWeight="500" color="lightGray">
          {shop.description}
        </Text>
        <Box mb="16px"></Box>
        <Flex>
          <Image
            src={instaIcon}
            href={`https://www.instagram.com/${shop.instagramUrl}`}
            w="12px"
            h="12px"
            mr="6px"
            cursor="pointer"
          />
          <Image
            src={discordIcon}
            href={`https://discord.gg/${shop.discordUrl}`}
            w="12px"
            h="12px"
            mr="6px"
            cursor="pointer"
          />
          <Image
            src={twitterIcon}
            href={`https://twitter.com/${shop.twitterUrl}`}
            w="12px"
            h="12px"
            mr="6px"
            cursor="pointer"
          />
          <Image
            src={webIcon}
            href={`https://${shop.webUrl}`}
            w="12px"
            h="12px"
            mr="6px"
            cursor="pointer"
          />
        </Flex>
      </Box>
      {/* shop data */}
      <Flex
        w="100%"
        h="auto"
        pl="36px"
        columnGap="16px"
        overflowY="hidden"
      >
        {shop.products.map((product, i) => {
          if (i< numberOfItems)
            return <ProductComponent product={product} />;
        })}
         <Flex w="100%" h="100%" bg="mainLayer" borderRadius="8px" p="16px" justifyContent='center' alignItems='center' >
         <Text fontSize="24px" fontWeight="500" color="darkGray">
          {shop.products.length - numberOfItems}+
        </Text>
         </Flex>
      </Flex>
    </Flex>
  );
};

export default ShopComponent;
