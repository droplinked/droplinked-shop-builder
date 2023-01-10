import instaIcon from "../../../../assest/icon/insta.png";
import discordIcon from "../../../../assest/icon/newdiscord.png";
import twitterIcon from "../../../../assest/icon/twitter.png";
import webIcon from "../../../../assest/icon/web.png";
import defaultProfile from "../../../../assest/image/defaultProfile.png";

import { Flex, Image } from "@chakra-ui/react";
import {
  ShopInformationWrapper,
  IconWrapper,
  ShopinfoWrapper,
  ProfileImageWrapper,
  ProfileImage,
  DefaultProfileImage,
  ShopnameText,
  IconContainer,
} from "./ShopInformationSidebar-style";

const ShopInformationSidebar = ({ ShopData }) => {
  return (
    <ShopInformationWrapper>
      <ShopinfoWrapper>
        <ProfileImageWrapper>
          {ShopData.logo ? (
            <ProfileImage src={ShopData.logo} />
          ) : (
            <DefaultProfileImage
              style={{ backgroundImage: `url(${defaultProfile})` }}
            ></DefaultProfileImage>
          )}
        </ProfileImageWrapper>

        <ShopnameText>{ShopData.name}</ShopnameText>

        <Flex
          flexWrap="wrap"
          justifyContent={{ sm: "center", md: "space-between" }}
          alignItem="center"
          mt="30px"
          w="100%"
        >
          {ShopData.discordUrl != "" && (
            <IconContainer>
              <IconWrapper
                href={`https://discord.gg/${ShopData.discordUrl}`}
                target="_blank"
                rel="noreferrer"
              >
                <Image src={discordIcon} display="flex" margin="auto 0px" />
              </IconWrapper>
            </IconContainer>
          )}
          {ShopData.webUrl != "" && (
            <IconContainer>
              <IconWrapper
                href={`https://${ShopData.webUrl}`}
                target="_blank"
                rel="noreferrer"
              >
                <Image src={webIcon} display="flex" margin="auto 0px" />
              </IconWrapper>
            </IconContainer>
          )}
          {ShopData.twitterUrl != "" && (
            <IconContainer>
              <IconWrapper
                href={`https://twitter.com/${ShopData.twitterUrl}`}
                target="_blank"
                rel="noreferrer"
              >
                <Image src={twitterIcon} display="flex" margin="auto 0px" />
              </IconWrapper>
            </IconContainer>
          )}
          {ShopData.instagramUrl != "" && (
            <IconContainer>
              <IconWrapper
                href={`https://www.instagram.com/${ShopData.instagramUrl}`}
                target="_blank"
                rel="noreferrer"
              >
                <Image src={instaIcon} display="flex" margin="auto 0px" />
              </IconWrapper>
            </IconContainer>
          )}
        </Flex>
      </ShopinfoWrapper>
    </ShopInformationWrapper>
  );
};

export default ShopInformationSidebar;
