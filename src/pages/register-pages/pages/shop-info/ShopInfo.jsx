import { Box } from "@chakra-ui/react";
import { useState } from "react";

import {
  PageContent,
  PageInformationComponent,
  PageContentWrapper,
  Text18px,
  AddAddressButton,
} from "../../RegisterPages-style";

import InputComponent from "../../component/input-component/InputComponent";
import AddressModal from "../../../../modals/address/AddressModal";

const RegisterShopInfo = () => {
  const [showAddressModal, setShowAddressModal] = useState(false);

  const toggleAddressModal = () => setShowAddressModal((p) => !p);

  return (
    <>
      <PageContent>
        <PageInformationComponent>
          Name your store and provide the shipping address(es) for your orders
        </PageInformationComponent>
        <PageContentWrapper>
          <Text18px>Store info</Text18px>
          <Box mb="48px" />
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
          <Box mb="104px" />
          <Text18px>Locations</Text18px>
          <Box mb="48px" />
          <AddAddressButton onClick={toggleAddressModal}>
            Add new Address
          </AddAddressButton>
        </PageContentWrapper>
        <Box mb="36px" />
      </PageContent>
      <AddressModal show={showAddressModal} close={toggleAddressModal} />
    </>
  );
};

export default RegisterShopInfo;
