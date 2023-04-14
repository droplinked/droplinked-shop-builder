import { useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
//
import {
  ComponentWrapper,
  ComponentTitle,
  SelectComponent,
  OptionComponent,
  ValueInput,
  PlusIcon,
  MinusIcon,
} from "../../AddProductPage-style";
import {
  getOptionsArrayAfterAddValueToOption,
  getOptionsArrayAfterRemoveValueFromOption,
} from "../../../edit-product-page/components/PropertiesComponent/utils";
//
import plus from "assest/icon/plus-icon.svg";
import minus from "assest/icon/minusIcon.png";
import BasicButton from "components/shared/BasicButton/BasicButton";

const INITiAL_VARIANTS = [
  {
    _id: "62a989ab1f2c2bbc5b1e7153",
    name: "Color",
  },
  {
    _id: "62a989e21f2c2bbc5b1e7154",
    name: "Size",
  },
];

const PropertiesComponent = ({ OptionList, setOptionList }) => {
  // const { getApi } = useApi();

  const [variantsType, setVariantType] = useState(INITiAL_VARIANTS);

  const changeOptionType = (optionId, optionIndex) => {
    let optionName = variantsType.find((vari) => vari._id == optionId).name;
    let optionArray = Array.from(OptionList);

    optionArray = optionArray.map((opt) => {
      const optionValues =
        opt.values.length == 0 ? [{ index: 1, value: "" }] : opt.values;

      if (opt.index != optionIndex) return { ...opt };
      else
        return {
          optionId: optionId,
          optionName: optionName,
          values: optionValues,
          index: opt.index,
        };
    });

    setOptionList(optionArray);
  };

  const existVariant = (variantId) => {
    let result = false;
    OptionList.forEach((option) => {
      if (option.optionId == variantId) result = true;
    });
    return result;
  };

  const changeOptionValue = (optionIndex, valueIndex, newValue) => {
    let optionArray = Array.from(OptionList);
    let findOption = optionArray.find((option) => option.index == optionIndex);
    let optionValues = findOption.values.map((value) => {
      if (value.index == valueIndex) {
        return { index: value.index, value: newValue };
      } else {
        return { ...value };
      }
    });
    findOption = { ...findOption, values: optionValues };
    optionArray = optionArray.map((option) => {
      if (option.index == optionIndex) return { ...findOption };
      else return { ...option };
    });
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

  const addNewOption = () => {
    let currentOption = Array.from(OptionList);
    currentOption.push({
      optionId: "",
      optionName: "",
      values: [],
      index: OptionList.length + 1,
    });
    setOptionList(currentOption);
  };

  return (
    <ComponentWrapper>
      <ComponentTitle>Properties</ComponentTitle>
      <Box mb="36px" />

      {OptionList.map((option) => {
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
                {variantsType.map((variant) => {
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
            {option.values.map((optionValue) => {
              return (
                <Box key={optionValue?.index} mb={4}>
                  <Box mb="16px"></Box>
                  <Flex justifyContent="space-between" alignItems="center">
                    <Text
                      fontWeight="400"
                      fontSize="20px"
                      color="white"
                      w="100px"
                    >
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
                            removeValueFromOption(
                              option.index,
                              optionValue.index
                            );
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
      })}

      {OptionList.length < 2 && (
        <BasicButton click={addNewOption} cancelType={true} mt={4}>
          Make new properties
        </BasicButton>
      )}
    </ComponentWrapper>
  );
};

export default PropertiesComponent;
