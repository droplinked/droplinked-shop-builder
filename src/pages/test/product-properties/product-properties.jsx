import { Box, Text, Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import {
  OptionText,
  GrayLine,
  OptionFormWrapper,
  SelectComponent,
  OptionComponent,
  ValueInput,
  PlusIcon,
} from "./product-properties-style";
import { getVariants } from "../../../api/producer/Product-api";
import { API_STATUS } from "../../../constant/api-status";
import { useToasty } from "../../../context/toastify/ToastContext";

import plus from "../../../assest/icon/plus-icon.svg";
import BasicButton from "../../../components/shared/BasicButton/BasicButton";

const ProductProperites = () => {
  const { errorToast } = useToasty();

  const [variantsType, setVariantType] = useState(null);
  const [OptionList, setOptionList] = useState([]);

  console.log("OptionList", OptionList);

  useEffect(() => {
    initialVariants();
  }, []);

  const initialVariants = async () => {
    let result = await getVariants();
    if (result.status == API_STATUS.SUCCESS) setVariantType(result.data);
    else errorToast(result.data);
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

  const addValueToOption = (optionIndex) => {
    let optionArray = Array.from(OptionList);

    optionArray = optionArray.map((opt) => {
      if (opt.index == optionIndex) {
        const optionValues = opt.values;
        optionValues.push({ index: opt.values.length + 1, value: "" });
        return {
          optionId: opt.optionId,
          optionName: opt.optionName,
          values: optionValues,
          index: opt.index,
        };
      } else return { ...opt };
    });
    setOptionList(optionArray);
  };

  const changeOptionValue = (optionIndex, valueIndex, newValue) => {
    let optionArray = Array.from(OptionList);
    let findOption = optionArray.find(option => option.index == optionIndex)
    let optionValues = findOption.values.map(value => {
        if(value.index == valueIndex){return {index: value.index, value: newValue }}
        else { return {...value}}
    })
    findOption = {...findOption , values:optionValues}
    optionArray = optionArray.map(option => {
        if(option.index == optionIndex)return { ...findOption}
        else return {...option}
    })
    setOptionList(optionArray);
  };

  return (
    <Box w="100%" bg="mainLayer" p="50px 60px" borderRadius="8px">
      <Text fontWeight="500" fontSize="24px" color="white">
        Properties
      </Text>
      <Box mb="48px"></Box>

      <Flex p="10px 0px">
        <Text fontWeight="400" fontSize="20px" color="white">
          Required
        </Text>
        <Box mr="100px"></Box>
        <Flex w="100%" justifyContent="space-between">
          <OptionText>Price</OptionText>
          <GrayLine />
          <OptionText>Quantity</OptionText>
          <GrayLine />
          <OptionText>External ID</OptionText>
          <GrayLine />
          <OptionText>Delivery boxing information</OptionText>
        </Flex>
      </Flex>

      <Box mb="48px"></Box>

      <Flex p="10px 0px">
        <Text fontWeight="400" fontSize="20px" color="white" pt="8px">
          Optional
        </Text>

        <Box mr="100px"></Box>
        <Box w="100%">
          {OptionList.length > 0 &&
            OptionList.map((option) => {
              return (
                <OptionFormWrapper key={option.index}>
                  <Flex justifyContent="space-between" alignItems="center">
                    <Text
                      fontWeight="400"
                      fontSize="20px"
                      color="white"
                      w="100px"
                    >
                      Property
                    </Text>
                    <Box mr="10%"></Box>
                    <SelectComponent
                      onChange={(e) =>
                        changeOptionType(e.target.value, option.index)
                      }
                    >
                      <OptionComponent selected disabled hidden>
                        Property
                      </OptionComponent>
                      {variantsType.map((variant) => {
                        return (
                          <OptionComponent
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
                      <>
                        <Box mb="16px"></Box>
                        <Flex
                          justifyContent="space-between"
                          alignItems="center"
                        >
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
                            {optionValue.index == option.values.length && (
                              <PlusIcon
                                src={plus}
                                onClick={() => {
                                  addValueToOption(option.index);
                                }}
                              />
                            )}
                          </Flex>
                        </Flex>
                      </>
                    );
                  })}
                </OptionFormWrapper>
              );
            })}

          <Box w="100%">
            <BasicButton click={addNewOption} cancelType={true}>
              Add new
            </BasicButton>{" "}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default ProductProperites;
