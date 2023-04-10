import { useEffect, useReducer, useMemo } from "react";
import {
  Box,
  Text,
  Flex,
  Stack,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

import {
  SkuFormWrapper,
  InputWrapper,
  ComponentTitle,
  FieldInput,
  GrayLine,
  SelectComponent,
  OptionComponent,
  SmallInput,
} from "../../AddProductPage-style";
import { skuReducer } from "./sku-reducer";
import { initialReducer } from "./initial-reducer";
import { useToasty } from "../../../../../context/toastify/ToastContext";

import BasicButton from "../../../../../components/shared/BasicButton/BasicButton";

const SkuForm = ({
  closeForm,
  OptionList,
  submitForm,
  defaultValue,
  deleteSku,
}) => {
  const initial = useMemo(() => initialReducer(OptionList, defaultValue), []);

  const [sku, dispatch] = useReducer(skuReducer, initial);

  const { errorToast } = useToasty();

  console.log('sku ', sku);
  console.log('OptionList ', OptionList);
  
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
      <Stack spacing={4}>
        <InputWrapper>
          <ComponentTitle>Price</ComponentTitle>
          <InputGroup width="70%">
            <FieldInput
              width="100%"
              bg="mainLayer"
              placeholder="Price"
              type="number"
              onChange={changePrice}
              value={sku.price}
              pr="90px"
            />
            <InputRightElement
              h="100%"
              width="90px"
              children={
                <Flex
                  px={6}
                  align="center"
                  h="100%"
                  borderLeft="1px solid"
                  borderColor="line"
                  color="lightGray"
                >
                  ETH
                </Flex>
              }
            />
          </InputGroup>
        </InputWrapper>

        <InputWrapper>
          <ComponentTitle>Quantity</ComponentTitle>
          <FieldInput
            placeholder="Quantity"
            type="number"
            onChange={changeQuantity}
            value={sku.quantity}
          />
        </InputWrapper>

        <InputWrapper>
          <ComponentTitle>External ID</ComponentTitle>
          <FieldInput
            placeholder="External ID"
            onChange={changeExternalId}
            value={sku.externalID}
          />
        </InputWrapper>

        <InputWrapper>
          <ComponentTitle>Delivery boxing</ComponentTitle>
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
                placeholder="Length"
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
              <ComponentTitle>{option.optionName}</ComponentTitle>
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

        {/* <InputWrapper>
          <ComponentTitle>Size</ComponentTitle>
          <SelectComponent bg="mainLayer" w="70%" onChange={changeSize}>
            {["xl", "lg", "md", "sm", "xs"].map((item) => (
              <OptionComponent key={item}>{item}</OptionComponent>
            ))}
          </SelectComponent>
        </InputWrapper> */}
      </Stack>

      <Box mb="36px"></Box>
      <Flex justifyContent="space-between">
        <Box w="200px">
          <BasicButton
            cancelType={true}
            click={() => {
              close();
              deleteSku && deleteSku();
            }}
          >
            {deleteSku ? "Delete" : "Close"}
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
