import { Box, Flex } from "@chakra-ui/react";
import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  PageContent,
  PageInformationComponent,
  PageContentWrapper,
  SaveButton,
} from "../../RegisterPages-style";
import { useApi } from "../../../../hooks/useApi/useApi";
import { useProfile } from "../../../../hooks/useProfile/useProfile";
import { putUpdateShop } from "../../../../apis/shopApiService";
import { shopContactReducer, SHOP_REDUCER_TYPES } from "./contact-reducer";

import InputComponent from "../../component/input-component/InputComponent";
import SubmitButton from "../../component/submit-buttons/SubmitButtons";
import InputLefton from "../../component/input-lefton/InputLefton"; 

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
  const { shop } = useProfile();
  const navigate = useNavigate();

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
    setLoading(true)
    const result = await putApi(putUpdateShop(apiBody));
    setLoading(false)
    if (result) {
      navigate(`/${shop.name}/register/design`);
    }
  };

  return (
    <PageContent>
      <PageInformationComponent>
        Add social media links on your store to help customers find you easily
        across multiple platforms.
      </PageInformationComponent>
      <PageContentWrapper>
        <InputLefton
          value={shopInformation.webURL}
          change={changeWebUrl}
          label="Website"
          placeHolder="mystore.com"
          children='https://'
        />
        <Box mb="52px" />
        <InputLefton
          value={shopInformation.discordURL}
          change={changeDiscord}
          label="Discord"
          placeHolder="my store"
          children='https://discord.gg/'
        />
        <Box mb="52px" />
        <InputLefton
          value={shopInformation.twitterURL}
          change={changeTwitter}
          label="Twitter"
          placeHolder="my store"
          children='https://twitter.com/'
        />
        <Box mb="52px" />
        <InputLefton
          value={shopInformation.instagramURL}
          change={changeInsagram}
          label="Instagram"
          placeHolder="mystore.com"
          children='https://www.instagram.com/'
        />
      </PageContentWrapper>

      <Flex justifyContent="end" w="100%" pt="36px">
        <SubmitButton width="200px" click={clickOnSave} loading={loading} >
          Save & next step
        </SubmitButton>
      </Flex>
    </PageContent>
  );
};
export default ContactInfo;
