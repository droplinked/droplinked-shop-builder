import { Box, Flex, Image, Text } from "@chakra-ui/react";

import instaIcon from "../../../../assest/icon/insta.png";
import discordIcon from "../../../../assest/icon/newdiscord.png";
import twitterIcon from "../../../../assest/icon/twitter.png";
import webIcon from "../../../../assest/icon/web.png";

const ShopComponent = ({ shop }) => {
  return (
    <Flex p="36px 60px">
        {/* shop data */}
      <Box w={{ base: "100px", lg: "236px" }} py='16px' pr='36px' borderRight='1px solid'borderColor='line'>
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
            cursor='pointer'
          />
          <Image
            src={discordIcon}
            href={`https://discord.gg/${shop.discordUrl}`}
            w="12px"
            h="12px"
            mr="6px"
            cursor='pointer'
          />
          <Image
            src={twitterIcon}
            href={`https://twitter.com/${shop.twitterUrl}`}
            w="12px"
            h="12px"
            mr="6px"
            cursor='pointer'
          />
          <Image
            src={webIcon}
            href={`https://${shop.webUrl}`}
            w="12px"
            h="12px"
            mr="6px"
            cursor='pointer'
          />
        </Flex>
      </Box>
      {/* shop data */}
      <Flex w='100%' borderTop='1px solid red' pl='36px'></Flex>
    </Flex>
  );
};

export default ShopComponent;
