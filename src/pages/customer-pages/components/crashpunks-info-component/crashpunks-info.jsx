import instaIcon from "../../../../assest/icon/insta.png";
import discordIcon from "../../../../assest/icon/discord.png";
import twitterIcon from "../../../../assest/icon/twitter.png";
import webIcon from "../../../../assest/icon/web.png";
import profilePic from "../../../../assest/image/crashpunks.gif";

import {  Flex, Image, Text } from "@chakra-ui/react";
import { IconWrapper } from "./crashpunks-info-style";
import { defaultAuthURL } from "@stacks/connect";

const CrashpunksInfo = () => {
  return (
    <Flex
      w="100%"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      pt="30px"
      px='12px'
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
        <Image
          src={profilePic}
          margin="auto"
          width="100%"
          height="100%"
          objectFit="cover"
          borderRadius="50%"
        />
      </Flex>

      <Text
        marginTop="20px"
        fontWeight="600"
        fontSize="18px"
        textAlign="center"
        color="#ffffff"
      >
        CrashPunks
      </Text>

      <Flex
        flexWrap="wrap"
        justifyContent="space-between"
        alignItem="center"
        mt="30px"
      >
        <Flex
          w={{ base: "auto", md: "25%" }}
          justifyContent="center"
          alignItem="center"
        >
          <IconWrapper
            href="https://discord.gg/crashpunks"
            target="_blank"
            rel="noreferrer"
          >
            <Image src={discordIcon} display="flex" margin="auto 0px" />
          </IconWrapper>
        </Flex>

        <Flex
          w={{ base: "auto", md: "25%" }}
          justifyContent="center"
          alignItem="center"
        >
          <IconWrapper
            href="http://crashpunks.com/"
            target="_blank"
            rel="noreferrer"
          >
            <Image src={webIcon} display="flex" margin="auto 0px" />
          </IconWrapper>
        </Flex>

        <Flex
          w={{ base: "auto", md: "25%" }}
          justifyContent="center"
          alignItem="center"
        >
          <IconWrapper
            href="https://twitter.com/crashpunks"
            target="_blank"
            rel="noreferrer"
          >
            <Image src={twitterIcon} display="flex" margin="auto 0px" />
          </IconWrapper>
        </Flex>

        <Flex
          w={{ base: "auto", md: "25%" }}
          justifyContent="center"
          alignItem="center"
        >
          <IconWrapper
            href="https://www.instagram.com/crashpunks/"
            target="_blank"
            rel="noreferrer"
          >
            <Image src={instaIcon} display="flex" margin="auto 0px" />
          </IconWrapper>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CrashpunksInfo
