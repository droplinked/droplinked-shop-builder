import instaIcon from "../../../../assest/icon/insta.png";
import discordIcon from "../../../../assest/icon/newdiscord.png";
import twitterIcon from "../../../../assest/icon/twitter.png";
import webIcon from "../../../../assest/icon/web.png";
import profilePic from "../../../../assest/image/crashpunks.gif";

import { Flex, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {
  IconWrapper,
  ShopinfoWrapper,
  ProfileImageWrapper,
  ProfileImage,
  ShopnameText,
  IconContainer,
} from "../sidebar-style";


const CrashpunksInfo = () => {
  let navigate = useNavigate();

  const navigateToShop = () => navigate("/crashpunks");

  return (
    <ShopinfoWrapper>
      <ProfileImageWrapper>
        <ProfileImage src={profilePic} onClick={navigateToShop} />
      </ProfileImageWrapper>

      <ShopnameText>CrashPunks</ShopnameText>

      <Flex
        flexWrap="wrap"
        justifyContent={{ sm: "center", md: "space-between" }}
        alignItem="center"
        mt="30px"
        w="100%"
      >
        <IconContainer>
          <IconWrapper
            href="https://discord.gg/crashpunks"
            target="_blank"
            rel="noreferrer"
          >
            <Image src={discordIcon} display="flex" margin="auto 0px" />
          </IconWrapper>
        </IconContainer>

        <IconContainer>
          <IconWrapper
            href="http://crashpunks.com/"
            target="_blank"
            rel="noreferrer"
          >
            <Image src={webIcon} display="flex" margin="auto 0px" />
          </IconWrapper>
        </IconContainer>

        <IconContainer>
          <IconWrapper
            href="https://twitter.com/crashpunks"
            target="_blank"
            rel="noreferrer"
          >
            <Image src={twitterIcon} display="flex" margin="auto 0px" />
          </IconWrapper>
        </IconContainer>

        <IconContainer>
          <IconWrapper
            href="https://www.instagram.com/crashpunks/"
            target="_blank"
            rel="noreferrer"
          >
            <Image src={instaIcon} display="flex" margin="auto 0px" />
          </IconWrapper>
        </IconContainer>
      </Flex>
    </ShopinfoWrapper>
  );
};

export default CrashpunksInfo;
