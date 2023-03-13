import { Box, Flex } from "@chakra-ui/react";
import { useState, useEffect, useReducer } from "react";

import {
  PageContent,
  PageInformationComponent,
  PageContentWrapper,
  Text18px,
  AddAddressButton,
  SaveButton,
} from "../../RegisterPages-style";
import { useApi } from "../../../../hooks/useApi/useApi";
import { getAddressList } from "../../../../apis/addressApiService";
import {
  shopInformationReducer,
  SHOP_REDUCER_TYPES,
} from "./shop-info-reducer";

import InputComponent from "../../component/input-component/InputComponent";
import AddressModal from "../../../../modals/address/AddressModal";

const INITIAL_SHOP_INFO = {
  description: "",
  addressBookID: null,
};

const RegisterShopInfo = () => {
  const [shopInformation, dispatchShopInformation] = useReducer(
    shopInformationReducer,
    INITIAL_SHOP_INFO
  );

  const [showAddressModal, setShowAddressModal] = useState(false);
  const [addressList, setAddressList] = useState([]);

  const { getApi } = useApi();

  const toggleAddressModal = () => setShowAddressModal((p) => !p);

  const updateAddressList = async () => {
    let result = await getApi(getAddressList());
    if (result && result.length > 0) setAddressList(result);
  };

  useEffect(() => {
    updateAddressList();
  }, []);

  const changeDescription = (e) =>{
    if(e.target.value.length < 21)
    dispatchShopInformation({
      type: SHOP_REDUCER_TYPES.CHANGE_DESCRIPTION,
      payload: e.target.value,
    });
  }
   

    const setAddressBook = (id) =>
    dispatchShopInformation({
      type: SHOP_REDUCER_TYPES.CHANGE_ADDRESS_BOOK,
      payload: id,
    });

  console.log("shopInformation ", shopInformation);

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
            value={shopInformation.description}
            color={shopInformation.description.length < 20 ? "#fff" : 'red'}
            isRequired={true}
            placeHolder="Enter max 20 characters."
            change={changeDescription}
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
        <Flex justifyContent="end" w="100%">
          <SaveButton w="200px">Save</SaveButton>
        </Flex>
      </PageContent>
      <AddressModal
        show={showAddressModal}
        close={toggleAddressModal}
        type={"SHOP"}
        updateAddressList={updateAddressList}
      />
    </>
  );
};

export default RegisterShopInfo;
