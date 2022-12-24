import { useState, useEffect, useReducer, useMemo } from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import {
  SkuFormWrapper,
  LeftSideText,
  InputWrapper,
  FieldInput,
  SmallInput,
  GrayLine,
  SelectComponent,
  OptionComponent,
} from "./sku-form-style";
import { useToasty } from "../../../../../context/toastify/ToastContext";
import { skuReducer } from "../../reducer/add-sku-reducer";

import BasicButton from "../../../../../components/shared/BasicButton/BasicButton";

const initialReducer = (OptionList, defaultValue) => {
  let initialSku;
  if (defaultValue) {
    let options = defaultValue.options.map((option) => {
      return {
        variantID: option.variantID,
        variantName: option.variantName,
        value: option.value,
      };
    });
    initialSku = {
      price: defaultValue.price,
      externalID: defaultValue.externalID,
      quantity: defaultValue.quantity,
      options: options,
      dimensions: {
        length: defaultValue.dimensions.length,
        width: defaultValue.dimensions.width,
        height: defaultValue.dimensions.height,
      },
      weight: defaultValue.weight,
    };
  } else {
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

    initialSku = {
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
  }

  return initialSku;
};

const SkuForm = ({ closeForm, OptionList, submitForm, defaultValue }) => {
  const initial = useMemo(() => initialReducer(OptionList, defaultValue), []);

  const [sku, dispatch] = useReducer(skuReducer, initial);

  const { errorToast } = useToasty();

  useEffect(() => {
    dispatch({ type: "updateSku", payload: initial });
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
    let currentOptions = sku.options.map((option) => option);
    currentOptions = currentOptions.map((option) => {
      if (option.variantID == optionId) {
        return { ...option, value: value };
      } else {
        return { ...option };
      }
    });

    dispatch({ type: "updateOptions", payload: currentOptions });
  };

  const isEmpty = (value, name) => {
    if (value.length == 0) {
      errorToast(`Sku ${name} is required`);
      return true;
    } else if (value <= 0) {
      errorToast(`${name} should be greater than zero`);
      return true;
    } else {
      return false;
    }
  };

  const isValidate = () => {
    if (isEmpty(sku.price, "price")) return false;

    if (isEmpty(sku.quantity, "quantity")) return false;

    if (isEmpty(sku.weight, "weight")) {
      return false;
    }
    if (isEmpty(sku.dimensions.length, "length")) return false;

    if (isEmpty(sku.dimensions.width, "width")) return false;

    if (isEmpty(sku.dimensions.height, "height")) return false;

    let check = true;
    sku.options.forEach((option) => {
      if (isEmpty(option.value, option.variantName)) {
        check = false;
        return;
      }
    });

    return check;
  };

  const submitAddVariant = () => {
    if (!isValidate()) return;
    let result = submitForm(sku);
    if (result) {
      dispatch({ type: "updateSku", payload: initial });
      closeForm();
    }
  };

  const close = () => {
    dispatch({ type: "updateSku", payload: initial });
    closeForm();
  };

  return (
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
          <BasicButton cancelType={true} click={close}>
            Close
          </BasicButton>
        </Box>
        <Box w="200px">
          <BasicButton click={submitAddVariant}>Save variant</BasicButton>
        </Box>
      </Flex>
    </SkuFormWrapper>
  );
};
export default SkuForm;
