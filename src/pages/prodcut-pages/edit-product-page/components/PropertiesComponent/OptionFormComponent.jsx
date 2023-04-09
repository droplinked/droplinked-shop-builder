import { Box, Flex, Text } from "@chakra-ui/react";

import {
  ComponentTitle,
  OptionFormWrapper,
  SelectComponent,
  OptionComponent,
  ValueInput,
  PlusIcon,
} from "../../EditProductPage-style";
import {
  getOptionsArrayAfterChangeVariant,
  checkExistVariant,
  getOptionsArrayAfterChangeOptionValue,
  getOptionsArrayAfterAddValueToOption,
  getOptionsArrayAfterRemoveValueFromOption,
} from "./utils";

import plus from "../../../../../assest/icon/plus-icon.svg";
import minus from "../../../../../assest/icon/minusIcon.png";
import { MinusIcon } from "../../../add-product-page/AddProductPage-style";
// this component handles options values and types
const OptionFormComponent = ({
  option,
  OptionList,
  setOptionList,
  variantsType,
}) => {
  // change variant type of option
  const changeOptionType = (optionId, optionIndex) => {
    let optionName = variantsType.find((vari) => vari._id == optionId).name;
    let optionArray = Array.from(OptionList);

    optionArray = getOptionsArrayAfterChangeVariant(
      optionArray,
      optionIndex,
      optionId,
      optionName
    );

    setOptionList(optionArray);
  };

  // check exist this variant
  const existVariant = (variantId) => checkExistVariant(OptionList, variantId);

  const changeOptionValue = (optionIndex, valueIndex, newValue) => {
    let optionArray = getOptionsArrayAfterChangeOptionValue(
      OptionList,
      optionIndex,
      valueIndex,
      newValue
    );
    setOptionList(optionArray);
  };

  const addValueToOption = (optionIndex) => {
    let optionArray = getOptionsArrayAfterAddValueToOption(
      OptionList,
      optionIndex
    );
    setOptionList(optionArray);
  };

  const removeValueFromOption = (optionIndex, optionValueIndex) => {
    let optionArray = getOptionsArrayAfterRemoveValueFromOption(
      optionIndex,
      OptionList,
      optionValueIndex
    );
    setOptionList(optionArray);
  };

  return (
    <Box key={option.index} mt={2}>
      <Flex justifyContent="space-between" alignItems="center">
        <ComponentTitle>Property</ComponentTitle>
        <Box mr="10%"></Box>
        <SelectComponent
          onChange={(e) => changeOptionType(e.target.value, option.index)}
        >
          <OptionComponent selected disabled hidden>
            Property
          </OptionComponent>
          {variantsType?.map((variant) => {
            return (
              <OptionComponent
                key={variant._id}
                value={variant._id}
                disabled={existVariant(variant._id)}
              >
                {variant.name}
              </OptionComponent>
            );
          })}
        </SelectComponent>
      </Flex>

      {option?.values?.map((optionValue) => {
        return (
          <Box key={optionValue?.index} mb={4}>
            <Box mb="16px"></Box>
            <Flex justifyContent="space-between" alignItems="center">
              <Text fontWeight="400" fontSize="20px" color="white" w="100px">
                Value {optionValue.index}
              </Text>
              <Box mr="10%"></Box>
              <Flex w="100%" alignItems="center">
                <ValueInput
                  placeholder="default"
                  value={optionValue.value}
                  onChange={(e) => {
                    changeOptionValue(
                      option.index,
                      optionValue.index,
                      e.target.value
                    );
                  }}
                />
                {optionValue.index ===
                option.values[option.values.length - 1]?.index ? (
                  <PlusIcon
                    src={plus}
                    onClick={() => {
                      addValueToOption(option.index);
                    }}
                  />
                ) : (
                  <MinusIcon
                    src={minus}
                    onClick={() => {
                      removeValueFromOption(option.index, optionValue.index);
                    }}
                  />
                )}
              </Flex>
            </Flex>
          </Box>
        );
      })}
    </Box>
  );
};

export default OptionFormComponent;
