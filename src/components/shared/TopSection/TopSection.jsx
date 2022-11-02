// import "./TopSection-style.scss";
import instaIcon from "../../../assest/icon/insta.png";
import discordIcon from "../../../assest/icon/discord.png";
import twitterIcon from "../../../assest/icon/twitter.png";
import webIcon from "../../../assest/icon/web.png";
import defaultProfile from "../../../assest/image/defaultProfile.png";

import { Box, Flex } from "@chakra-ui/react";
import {
  ImageWrapper,
  ProfileImage,
  DefaultProfile,
  ShopnameText,
  IconWrapper,
  Icon,
} from "./TopSection-style";

export default function TopSection({
  pic,
  shopname,
  instagram,
  twitter,
  discord,
  web,
}) {
  return (
    <Box w="100%">
      <Flex justifyContent="center" alignItems="center">
        <ImageWrapper>
          {pic ? (
            <ProfileImage src={pic} alt="" />
          ) : (
            <DefaultProfile
              style={{ backgroundImage: `url(${defaultProfile})` }}
            ></DefaultProfile>
          )}
        </ImageWrapper>
      </Flex>
      <Flex justifyContent="center" alignItems="center">
        <ShopnameText>{shopname}</ShopnameText>
      </Flex>

      <Flex mt={{ base: "10px", md: "20px" }} justifyContent="center">
        <Flex justifyContent="space-between" alignItems="center">
          {discord != "" && (
            <IconWrapper
              href={`https://discord.gg/${discord}`}
              target="_blank"
              rel="noreferrer"
            >
              <Icon src={discordIcon} alt="" />
            </IconWrapper>
          )}
          {web != "" && (
            <IconWrapper
              href={`https://${web}`}
              target="_blank"
              rel="noreferrer"
            >
              <Icon src={webIcon} alt=""/>
            </IconWrapper>
          )}
          {twitter != "" && (
            <a
              href={`https://twitter.com/${twitter}`}
              target="_blank"
              rel="noreferrer"
              className="social"
            >
              <img src={twitterIcon} alt="" className="ratio ratio-1x1" />
            </a>
          )}
          {instagram != "" && (
            <a
              href={`https://www.instagram.com/${instagram}`}
              target="_blank"
              rel="noreferrer"
              className="social"
            >
              <img src={instaIcon} alt="" className="ratio ratio-1x1" />
            </a>
          )}
        </Flex>
      </Flex>
    </Box>
  );
}
