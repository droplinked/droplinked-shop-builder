import { Box,Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";

import { API_STATUS } from "../../../../../constant/api-status";
import { useToasty } from "../../../../../context/toastify/ToastContext";
import {
  SelectComponent,
  OptionComponent,
  InputComponent,
  CollectionContainer,
  CollectionItem,
} from "./technical-information-style";
import {
  SectionWrapper,
  SectionTitle,
  Margin48px,
  AddProductLabel,
} from "../style/share-style";
import { SHIPING_TYPES } from "../../../../../constant/shipping-types";

const TechnicalInformation = ({ TechnicalInfo, dispatchTechnical }) => {
  const { errorToast } = useToasty();

  const [collectionList, setCollectionList] = useState(null);

  useEffect(() => {
    initializeCollection();
  }, []);

  const initializeCollection = async () => {
   // let result = await getCollections();
  //  if (result.status == API_STATUS.SUCCESS) setCollectionList(result.data);
   // else errorToast(result.data);
  };

  const isSelected = (collection) => {
    return TechnicalInfo.productCollectionID &&
      collection._id == TechnicalInfo.productCollectionID
      ? true
      : false;
  };

  const selectCollection = (collectionId) =>
    dispatchTechnical({ type: "updateCollectionId", payload: collectionId });

  const changeShippingDropdown = (e) =>
    dispatchTechnical({ type: "updateShippingType", payload: e.target.value });

  const changeShippingPrice = (e) =>
    dispatchTechnical({
      type: "updateShippingPrice",
      payload: parseFloat(e.target.value),
    });

  return (
    <SectionWrapper>
      <SectionTitle>Technical information</SectionTitle>
      <Margin48px />

      <Box p="0px 24px">
        <AddProductLabel>Collections</AddProductLabel>
        <Box mb="18px"></Box>
        <CollectionContainer>
          <CollectionItem
            bg={
              TechnicalInfo.productCollectionID == "" ? "primary" : "mainLayer"
            }
            color={
              TechnicalInfo.productCollectionID == ""
                ? "primaryDark"
                : "darkGray"
            }
          >
            Select one
          </CollectionItem>
          {collectionList &&
            collectionList.map((collection) => {
              return (
                <CollectionItem
                  onClick={() => {
                    selectCollection(collection._id);
                  }}
                  key={collection._id}
                  value={collection._id}
                  bg={isSelected(collection) ? "primary" : "mainLayer"}
                  color={isSelected(collection) ? "primaryDark" : "darkGray"}
                >
                  {collection.title}
                </CollectionItem>
              );
            })}
        </CollectionContainer>
        <Margin48px />
        <Flex w="100%" justifyContent="space-between">
          <Box w="45%">
            <AddProductLabel>Shipping</AddProductLabel>
            <Box mb="18px"></Box>
            <SelectComponent
              value={TechnicalInfo.shippingType}
              onChange={changeShippingDropdown}
            >
              <OptionComponent value={SHIPING_TYPES.EASY_POST}>
                {SHIPING_TYPES.EASY_POST}
              </OptionComponent>
              <OptionComponent value={SHIPING_TYPES.CUSTOM}>
                {SHIPING_TYPES.CUSTOM}
              </OptionComponent>
            </SelectComponent>
          </Box>
          {TechnicalInfo.shippingType == "CUSTOM" && (
            <Box w="45%">
              <AddProductLabel>Shipping price</AddProductLabel>
              <Box mb="18px"></Box>
              <InputComponent
                type="number"
                value={TechnicalInfo.shippingPrice}
                placeholder="Shipping price"
                onChange={changeShippingPrice}
              />
            </Box>
          )}
        </Flex>
      </Box>
    </SectionWrapper>
  );
};

export default TechnicalInformation;
