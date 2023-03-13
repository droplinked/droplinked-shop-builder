import { Box, Flex } from "@chakra-ui/react";
import { useReducer } from "react";

import {
  PageContent,
  PageInformationComponent,
  PageContentWrapper,
  SaveButton,
} from "../../RegisterPages-style";
import { useApi } from "../../../../hooks/useApi/useApi";
import { putUpdateShop } from "../../../../apis/shopApiService";
import { shopContactReducer, SHOP_REDUCER_TYPES } from "./contact-reducer";

import InputComponent from "../../component/input-component/InputComponent";

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

  const { putApi } = useApi();

  const clickOnSave = async () => {
    const apiBody = {
      discordURL: "",
      instagramURL: "",
      twitterURL: "",
      webURL: "",
    };
    const result = await putApi(putUpdateShop(apiBody));
    if (result) {
      navigate(`/${shop.name}/register/contact-info`);
    }
  };
  return (
    <PageContent>
      <PageInformationComponent>
        Add social media links on your store to help customers find you easily
        across multiple platforms.
      </PageInformationComponent>
      <PageContentWrapper>
        <InputComponent label="Website" placeHolder="https://mystore.com" />
        <Box mb="52px" />
        <InputComponent label="Discord" placeHolder="discord/my store" />
        <Box mb="52px" />
        <InputComponent
          label="Twitter"
          placeHolder="https://twitter.com/my store"
        />
        <Box mb="52px" />
        <InputComponent
          label="Instagram"
          placeHolder="https://www.instagram.com/mystore.com"
        />
      </PageContentWrapper>

      <Flex justifyContent="end" w="100%" pt="36px">
        <SaveButton w="200px">Save & next step</SaveButton>
      </Flex>
    </PageContent>
  );
};
export default ContactInfo;
