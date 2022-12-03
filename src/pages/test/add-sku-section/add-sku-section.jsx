import { Box, Text, Flex } from "@chakra-ui/react";
import { useState, useEffect, useReducer } from "react";
import {
  SkuFormWrapper,
  LeftSideText,
  InputWrapper,
  FieldInput,
  SmallInput,
  GrayLine,
  SelectComponent,
  OptionComponent,
} from "./add-sku-section-style";

import BasicButton from "../../../components/shared/BasicButton/BasicButton";
import VariantComponent from "../test-components/variant-component/variant-component";

function reducer(state, action) {
  switch (action.type) {
    case "updateSku":
      return { ...action.payload };
    case "updatePrice":
      return { ...state, price: parseFloat(action.payload) };
    case "updateQuantity":
      return { ...state, quantity: parseInt(action.payload) };
    case "updateExternalId":
      return { ...state, externalID: action.payload };
    case "updateWeight":
      return { ...state, weight: parseFloat(action.payload) };
    case "updateLength":
      return {
        ...state,
        dimensions: { ...state.dimensions, length: parseFloat(action.payload) },
      };
    case "updateWidth":
      return {
        ...state,
        dimensions: { ...state.dimensions, width: parseFloat(action.payload) },
      };
    case "updateHeight":
      return {
        ...state,
        dimensions: { ...state.dimensions, height: parseFloat(action.payload) },
      };
    case "updateOptions":
      return {
        ...state,
        options: action.payload,
      };

    default:
      throw new Error();
  }
}

const AddSkuSection = ({ OptionList, skus, setSkus }) => {
  const initial = () => {
    let options =
      OptionList.length == 0
        ? []
        : OptionList.map((option) => {
            return {
              variantID: option.optionId,
              variantName: option.optionName,
              value: "",
            };
          });

    let initialSku = {
      price: "",
      externalID: "",
      quantity: "",
      options: options,
      dimensions: {
        length: "",
        width: "",
        height: "",
      },
      weight: "",
    };
    return initialSku;
  };

  const [open, setOpen] = useState(false);
  const [sku, dispatch] = useReducer(reducer, initial());

  const openForm = () => setOpen((p) => !p);

  useEffect(() => {
    dispatch({ type: "updateSku", payload: initial() });
  }, [OptionList]);

  const changePrice = (e) =>
    dispatch({ type: "updatePrice", payload: e.target.value });
  const changeQuantity = (e) =>
    dispatch({ type: "updateQuantity", payload: e.target.value });
  const changeExternalId = (e) =>
    dispatch({ type: "updateExternalId", payload: e.target.value });
  const changeWeight = (e) =>
    dispatch({ type: "updateWeight", payload: e.target.value });
  const changeLength = (e) =>
    dispatch({ type: "updateLength", payload: e.target.value });
  const changeWidth = (e) =>
    dispatch({ type: "updateWidth", payload: e.target.value });
  const changeHeight = (e) =>
    dispatch({ type: "updateHeight", payload: e.target.value });

  const changeOption = (value, optionId) => {
    let optionIndex = sku.options.findIndex(
      (option) => option.variantID == optionId
    );
    let newOptions = sku.options;
    newOptions[optionIndex].value = value;
    dispatch({ type: "updateOptions", payload: newOptions });
  };

  const submitAddVariant = () => {
    let currentSkus = Array.from(skus);
    currentSkus.push(sku);
    setSkus(currentSkus);
    dispatch({ type: "updateSku", payload: initial() });
    openForm();
  };

  const close = () => {
    dispatch({ type: "updateSku", payload: initial() });
    openForm();
  }

  return (
    <Box w="100%" bg="mainLayer" p="50px 60px" borderRadius="8px">
      <Text fontWeight="500" fontSize="24px" color="white">
        Variants
      </Text>
      <Box mb="48px"></Box>
      {skus.map((currentSku, i) => {
        return <VariantComponent key={i} sku={currentSku} />;
      })}
      {open ? (
        <SkuFormWrapper>
          <InputWrapper>
            <LeftSideText>Price</LeftSideText>
            <FieldInput
              placeholder="Price"
              type="number"
              onChange={changePrice}
              value={sku.price}
            />
          </InputWrapper>
          <Box mb="16px"></Box>
          <InputWrapper>
            <LeftSideText>Quantity</LeftSideText>
            <FieldInput
              placeholder="Quantity"
              type="number"
              onChange={changeQuantity}
              value={sku.quantity}
            />
          </InputWrapper>
          <Box mb="16px"></Box>
          <InputWrapper>
            <LeftSideText>External ID</LeftSideText>
            <FieldInput
              placeholder="External ID"
              onChange={changeExternalId}
              value={sku.externalID}
            />
          </InputWrapper>
          <Box mb="16px"></Box>
          <InputWrapper>
            <LeftSideText> Delivery box information</LeftSideText>
            <Flex w="70%" alignItems="center">
              <Flex
                w="100%"
                bg="mainLayer"
                p="8px 24px"
                borderRadius="8px"
                justifyContent="space-between"
                alignItems="center"
                h="100%"
              >
                <SmallInput
                  placeholder="Lenght"
                  type="number"
                  onChange={changeLength}
                  value={sku.dimensions.length}
                />
                <GrayLine />
                <SmallInput
                  placeholder="Height"
                  type="number"
                  onChange={changeHeight}
                  value={sku.dimensions.height}
                />
                <GrayLine />
                <SmallInput
                  placeholder="Width"
                  type="number"
                  onChange={changeWidth}
                  value={sku.dimensions.width}
                />
                <GrayLine />
                <SmallInput
                  placeholder="Weight"
                  type="number"
                  onChange={changeWeight}
                  value={sku.weight}
                />
              </Flex>
              <Text ml="12px" fontSize="20px" fontWeight="500" color="darkGray">
                inch/oz
              </Text>
            </Flex>
          </InputWrapper>

          {OptionList.map((option) => {
            return (
              <InputWrapper mt="16px" key={option.index}>
                <LeftSideText>{option.optionName}</LeftSideText>
                <SelectComponent
                  onChange={(e) => {
                    changeOption(e.target.value, option.optionId);
                  }}
                >
                  <OptionComponent selected disabled hidden>
                    Select {option.optionName}
                  </OptionComponent>
                  {option.values.map((value) => {
                    return (
                      <OptionComponent key={value.index} value={value.value}>
                        {value.value}
                      </OptionComponent>
                    );
                  })}
                </SelectComponent>
              </InputWrapper>
            );
          })}

          <Box mb="36px"></Box>
          <Flex justifyContent="space-between">
          <Box w="200px">
              <BasicButton cancelType={true} click={close}>Close</BasicButton>
            </Box>
            <Box w="200px">
              <BasicButton click={submitAddVariant}>Save variant</BasicButton>
            </Box>
          </Flex>
        </SkuFormWrapper>
      ) : (
        <Box w="100%">
          <BasicButton cancelType={true} click={openForm}>
            Add variant
          </BasicButton>
        </Box>
      )}
    </Box>
  );
};

export default AddSkuSection;
