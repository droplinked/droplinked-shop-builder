import instaIcon from "../../../../assest/icon/insta.png";
import discordIcon from "../../../../assest/icon/discord.png";
import twitterIcon from "../../../../assest/icon/twitter.png";
import webIcon from "../../../../assest/icon/web.png";
import defaultProfile from "../../../../assest/image/defaultProfile.png";

import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { IconWrapper } from "./ShopInfo-style";

const ShopInfo = ({ ShopData }) => {
  return (
    <Flex
      w="100%"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      pt="30px"
    >
      <Flex
        borderRadius="50%"
        margin="auto 0px"
        justifyContent="center"
        alignItems="center"
        width="120px"
        height="120px"
        border="1px solid #353535"
      >
        {ShopData.logo ? (
          <Image
            src={ShopData.logo}
            margin="auto"
            width="100%"
            height="100%"
            objectFit="cover"
            borderRadius="50%"
          />
        ) : (
          <Box
            width="60%"
            height="60%"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            style={{ backgroundImage: `url(${defaultProfile})` }}
          ></Box>
        )}
      </Flex>

      <Text
        marginTop="20px"
        fontWeight="600"
        fontSize="18px"
        textAlign="center"
        color="#ffffff"
      >
        {ShopData.name}
      </Text>

      <Flex
        flexWrap="wrap"
        justifyContent="space-between"
        alignItem="center"
        mt="30px"
      >
        {ShopData.discordUrl != "" && (
          <Flex w={{base:"auto" ,md:"25%"}} justifyContent="center" alignItem="center">
            <IconWrapper
              href={`https://discord.gg/${ShopData.discordUrl}`}
              target="_blank"
              rel="noreferrer"
            >
              <Image src={discordIcon} display="flex" margin="auto 0px" />
            </IconWrapper>
          </Flex>
        )}
        {ShopData.webUrl != "" && (
          <Flex w={{base:"auto" ,md:"25%"}} justifyContent="center" alignItem="center">
            <IconWrapper
              href={`https://${ShopData.webUrl}`}
              target="_blank"
              rel="noreferrer"
            >
              <Image src={webIcon} display="flex" margin="auto 0px" />
            </IconWrapper>
          </Flex>
        )}
        {ShopData.twitterUrl != "" && (
          <Flex w={{base:"auto" ,md:"25%"}} justifyContent="center" alignItem="center">
            <IconWrapper
              href={`https://twitter.com/${ShopData.twitterUrl}`}
              target="_blank"
              rel="noreferrer"
            >
              <Image src={twitterIcon} display="flex" margin="auto 0px" />
            </IconWrapper>
          </Flex>
        )}
        {ShopData.instagramUrl != "" && (
          <Flex w={{base:"auto" ,md:"25%"}} justifyContent="center" alignItem="center">
            <IconWrapper
              href={`https://www.instagram.com/${ShopData.instagramUrl}`}
              target="_blank"
              rel="noreferrer"
            >
              <Image src={instaIcon} display="flex" margin="auto 0px" />
            </IconWrapper>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default ShopInfo;
