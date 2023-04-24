import { Box, Flex, VStack } from "@chakra-ui/react";
import { useReducer, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import {
  PageContent,
  PageInformationComponent,
  PageContentWrapper,
} from "../../RegisterPages-style";
import { useApi } from "../../../../hooks/useApi/useApi";
import { shopContactReducer, SHOP_REDUCER_TYPES } from "./contact-reducer";
import { useCustomNavigate } from "../../../../hooks/useCustomeNavigate/useCustomNavigate";
import { useProfile } from "../../../../hooks/useProfile/useProfile";
import { useToasty } from "../../../../context/toastify/ToastContext";

import SubmitButton from "../../component/submit-buttons/SubmitButtons";
import InputLefton from "../../component/input-lefton/InputLefton";
import BasicButton from "components/shared/BasicButton/BasicButton";
import AppCard from "components/shared/card/AppCard";
import { putUpdateShop } from "lib/apis/shopApiService";

const INITIAL_SHOP_CONTACT = {
  discordURL: "",
  instagramURL: "",
  twitterURL: "",
  webURL: "",
};

const ContactInfo = () => {
  const [shopInformation, dispatchShopInformation] = useReducer(
    shopContactReducer,
    INITIAL_SHOP_CONTACT
  );

  const [loading, setLoading] = useState(false);

  const { putApi } = useApi();
  const { shopNavigate } = useCustomNavigate();
  const { shop, updateShopData } = useProfile();
  const { successToast } = useToasty();
  const currentPath = useLocation().pathname;

  const initializeValues = () => {
    const obj = {
      discordURL: shop.discordURL ? shop.discordURL : "",
      instagramURL: shop.instagramURL ? shop.instagramURL : "",
      twitterURL: shop.twitterURL ? shop.twitterURL : "",
      webURL: shop.webURL ? shop.webURL : "",
    };

    dispatchShopInformation({
      type: SHOP_REDUCER_TYPES.INITIALIZE,
      payload: obj,
    });
  };

  useEffect(() => {
    initializeValues();
  }, [shop]);

  const changeWebUrl = (e) =>
    dispatchShopInformation({
      type: SHOP_REDUCER_TYPES.CHANGE_WEBURL,
      payload: e.target.value,
    });

  const changeDiscord = (e) =>
    dispatchShopInformation({
      type: SHOP_REDUCER_TYPES.CHANGE_DISCORD,
      payload: e.target.value,
    });

  const changeTwitter = (e) =>
    dispatchShopInformation({
      type: SHOP_REDUCER_TYPES.CHANGE_TWITTER,
      payload: e.target.value,
    });

  const changeInsagram = (e) =>
    dispatchShopInformation({
      type: SHOP_REDUCER_TYPES.CHANGE_INSTAGRAM,
      payload: e.target.value,
    });

  const clickOnSave = async () => {
    const apiBody = {
      discordURL: shopInformation.discordURL,
      instagramURL: shopInformation.instagramURL,
      twitterURL: shopInformation.twitterURL,
      webURL: shopInformation.webURL,
    };
    setLoading(true);
    const result = await putApi(putUpdateShop(apiBody));
    updateShopData();
    setLoading(false);

    if (result) {
      shopNavigate(`products`);
      successToast("Updated");
    }
  };

  return (
    <PageContent>
      <VStack align={"stretch"}>
        <AppCard>
          Add social media links on your store to help customers find you easily
          across multiple platforms.
        </AppCard>
        <AppCard>
          <InputLefton
            value={shopInformation.webURL}
            change={changeWebUrl}
            label="Website"
            placeHolder="mystore.com"
            children="https://"
          />
          <Box mb="52px" />
          <InputLefton
            value={shopInformation.discordURL}
            change={changeDiscord}
            label="Discord"
            placeHolder="my store"
            children="https://discord.gg/"
          />
          <Box mb="52px" />
          <InputLefton
            value={shopInformation.twitterURL}
            change={changeTwitter}
            label="Twitter"
            placeHolder="my store"
            children="https://twitter.com/"
          />
          <Box mb="52px" />
          <InputLefton
            value={shopInformation.instagramURL}
            change={changeInsagram}
            label="Instagram"
            placeHolder="mystore.com"
            children="https://www.instagram.com/"
          />
        </AppCard>
      </VStack>

      <Flex justifyContent={"right"} marginTop={8} width={"100%"}>
        <Box>
          <BasicButton size="lg" click={clickOnSave} loading={loading}>
            {currentPath.includes("register") ? "Publish store" : "Save"}
          </BasicButton>
        </Box>
      </Flex>
    </PageContent>
  );
};
export default ContactInfo;
