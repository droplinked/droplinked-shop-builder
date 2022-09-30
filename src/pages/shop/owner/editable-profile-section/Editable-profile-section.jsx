import InputImage from "../../../../components/shared/InputImage/InputImage";

import instaIcon from "../../../../assest/icon/insta.png";
import discordIcon from "../../../../assest/icon/discord.png";
import twitterIcon from "../../../../assest/icon/twitter.png";
import webIcon from "../../../../assest/icon/web.png";
import { useToasty } from "../../../../context/toastify/ToastContext";
import { updateShopApi } from "../../../../api/producer/Shop-api";

import { Box, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import {
  ShopName,
  IconsWrapper,
  IconImage,
  EditButton,
} from "./Editable-profile-style";

const EditableTopSection = ({ shopData, shopName }) => {

  const [image, setImage] = useState(shopData.logo || "");

  let navigate = useNavigate();
  const { errorToast, successToast } = useToasty();

  const navigateToSetting = () => navigate("/settings");


  const changeProfileImage = async (imageUrl) => {

    setImage(imageUrl);

    let shopInformation = {
      social: {
        discordUrl: shopData.discordUrl || "",
        twitter: shopData.twitterUrl || "",
        instagram: shopData.instagramUrl || "",
        webUrl: shopData.webUrl || "",
      },
      shopLogo: imageUrl || "",
      shopAddressID: shopData.addressBookID,
      description: "",
    };

    let result = await updateShopApi(shopInformation);

    if (result.status == "success") {
      localStorage.setItem("shop", JSON.stringify(result.data.shop));
      successToast("Shop info successfully updated");
    } else {
      errorToast(result.reason);
    }
  };

  return (
    <Flex w="100%" flexDir="column" justifyContent="center">
      <Box mx="auto">
        <InputImage image={image} setImage={changeProfileImage} />
      </Box>

      <Box mx="auto" mt="20px">
        <ShopName>{shopName}</ShopName>
      </Box>

      <Flex justifyContent="center" alignItems="center" mt="20px">
        <Flex justifyContent="space-between">
          {shopData.discordUrl && (
            <IconsWrapper
              href={`https://discord.gg/${shopData.discordUrl}`}
              target="_blank"
              rel="noreferrer"
            >
              <IconImage src={discordIcon} />
            </IconsWrapper>
          )}
          {shopData.webUrl && (
            <IconsWrapper
              href={`https://${shopData.webUrl}`}
              target="_blank"
              rel="noreferrer"
            >
              <IconImage src={webIcon} />
            </IconsWrapper>
          )}
          {shopData.twitterUrl && (
            <IconsWrapper
              href={`https://twitter.com/${shopData.twitterUrl}`}
              target="_blank"
              rel="noreferrer"
            >
              <IconImage src={twitterIcon} />
            </IconsWrapper>
          )}
          {shopData.instagramUrl && (
            <IconsWrapper
              href={`https://www.instagram.com/${shopData.instagramUrl}`}
              target="_blank"
              rel="noreferrer"
            >
              <IconImage src={instaIcon} />
            </IconsWrapper>
          )}
        </Flex>
      </Flex>
      <Box mx="auto">
        <EditButton onClick={navigateToSetting}>edit</EditButton>
      </Box>
    </Flex>
  );
};

export default EditableTopSection;
