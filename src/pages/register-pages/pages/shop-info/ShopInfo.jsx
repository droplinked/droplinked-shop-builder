import { Box } from "@chakra-ui/react";

import {
  PageContent,
  PageInformationComponent,
  PageContentWrapper,
} from "../../RegisterPages-style";

import InputComponent from "../../component/input-component/InputComponent";

const RegisterShopInfo = () => {
  return (
    <PageContent>
      <PageInformationComponent>
        Name your store and provide the shipping address(es) for your orders
      </PageInformationComponent>
      <PageContentWrapper>
        <InputComponent
          label="Store name"
          isRequired={true}
          placeHolder="Enter max 20 characters."
        />
        <Box mb="48px" />
        <InputComponent
          label="Store URL"
          value="https://droplinked.com/mystore"
        />
      </PageContentWrapper>
      <Box mb="36px" />
    </PageContent>
  );
};

export default RegisterShopInfo;
