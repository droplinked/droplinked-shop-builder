import { Box, Text, Flex, Select } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { getCollections } from "../../../api/producer/Collection-api";
import { API_STATUS } from "../../../constant/api-status";
import { useToasty } from "../../../context/toastify/ToastContext";
import {
  SelectComponent,
  OptionComponent,
  InputComponent,
} from "./technical-information-style";
import { SHIPING_TYPES } from "../../../constant/shipping-types";

import Loading from "../../../components/shared/loading/Loading";
import Dropdown from "../../../components/shared/Dropdown/Dropdown-component";
import FormInput from "../../../components/shared/FormInput/FormInput";

// const SHIPING_TYPE = [
//   { id: "EASY_POST", value: "Easy post" },
//   { id: "CUSTOM", value: "Custom" },
// ];

const TechnicalInformation = ({ TechnicalInfo, dispatchTechnical }) => {
  const { errorToast } = useToasty();

  const [collectionList, setCollectionList] = useState(null);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [shippingType, setShippingType] = useState("EASY_POST");
  const [shippingPrice, setShippingPrice] = useState("");

  useEffect(() => {
    initializeCollection();
  }, []);

  const initializeCollection = async () => {
    let result = await getCollections();
    if (result.status == API_STATUS.SUCCESS) setCollectionList(result.data);
    else errorToast(result.data);
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
    dispatchTechnical({ type: "updateShippingPrice", payload: e.target.value });

  return (
    <Box w="100%" bg="mainLayer" p="50px 60px" borderRadius="8px">
      <Text fontWeight="500" fontSize="24px" color="white">
        Technical information
      </Text>
      <Box mb="48px"></Box>

      <Box p="0px 24px">
        <Text color="white" fontSize="20px" fontWeight="500">
          Collections
        </Text>
        <Box mb="18px"></Box>
        <Flex
          w="100%"
          borderRadius="8px"
          bg="subLayer"
          p="18px 18px"
          flexWrap="wrap"
          pb="100px"
        >
          {/* {collectionList == null && <Loading />} */}
          <Box
            p="8px 16px"
            bg={TechnicalInfo.productCollectionID == "" ? "primary" : "mainLayer"}
            mr="20px"
            maxH="auto"
            color={
              TechnicalInfo.productCollectionID == "" ? "primaryDark" : "darkGray"
            }
            fontSize="20px"
            borderRadius="28px"
            mb="16px"
          >
            Select one
          </Box>
          {collectionList &&
            collectionList.map((collection) => {
              return (
                <Box
                  cursor="pointer"
                  onClick={() => {
                    selectCollection(collection._id);
                  }}
                  key={collection._id}
                  value={collection._id}
                  p="8px 16px"
                  bg={isSelected(collection) ? "primary" : "mainLayer"}
                  mr="20px"
                  maxH="auto"
                  color={isSelected(collection) ? "primaryDark" : "darkGray"}
                  fontSize="20px"
                  borderRadius="28px"
                  mb="16px"
                >
                  {collection.title}
                </Box>
              );
            })}
        </Flex>
        <Box mb="48px"></Box>
        <Flex w="100%" justifyContent="space-between">
          <Box w="45%">
            <Text fontSize="20px" fontWeight="500" color="white">
              Shipping
            </Text>
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
              <Text fontSize="20px" fontWeight="500" color="white">
                Shipping price
              </Text>
              <Box mb="18px"></Box>
              <InputComponent
                value={TechnicalInfo.shippingPrice}
                placeholder="Shipping price"
                onChange={changeShippingPrice}
              />
            </Box>
          )}
        </Flex>
      </Box>
    </Box>
  );
};

export default TechnicalInformation;
