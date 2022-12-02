import { Box, Text, Flex } from "@chakra-ui/react";
import { useState , useEffect } from "react";
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


const AddSkuSection = ({ OptionList }) => {
  const [open, setOpen] = useState(false);
  const [sku, setSku] = useState({});
  const openForm = () => setOpen((p) => !p);

  useEffect(()=>{
    initial()
  },[])


  const initial = () => {
    let initialSku = {
      price: '' ,
      
    }
  }

  console.log("OptionList ", OptionList);

  return (
    <Box w="100%" bg="mainLayer" p="50px 60px" borderRadius="8px">
      <Text fontWeight="500" fontSize="24px" color="white">
        Variants
      </Text>
      <Box mb="48px"></Box>

      <SkuFormWrapper>
        <InputWrapper>
          <LeftSideText>Price</LeftSideText>
          <FieldInput placeholder="Price" />
        </InputWrapper>
        <Box mb="16px"></Box>
        <InputWrapper>
          <LeftSideText>Quantity</LeftSideText>
          <FieldInput placeholder="Quantity" />
        </InputWrapper>
        <Box mb="16px"></Box>
        <InputWrapper>
          <LeftSideText>External ID</LeftSideText>
          <FieldInput placeholder="External ID" />
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
              <SmallInput placeholder="Lenght" />
              <GrayLine />
              <SmallInput placeholder="Height" />
              <GrayLine />
              <SmallInput placeholder="Width" />
              <GrayLine />
              <SmallInput placeholder="Weight" />
            </Flex>
            <Text ml="12px" fontSize="20px" fontWeight="500" color="darkGray">
              inch/oz
            </Text>
          </Flex>
        </InputWrapper>

        {OptionList.map((option) => {
          return (

              <InputWrapper mt='16px' key={option.index}>
                <LeftSideText>{option.optionName}</LeftSideText>
                <SelectComponent>
                   {option.values.map((value) => {
                    return <OptionComponent key={value.index}>{value.value}</OptionComponent>;
                  })} 
                </SelectComponent>
              </InputWrapper>
          );
        })}

        <Box mb="36px"></Box>
        <Flex justifyContent="flex-end">
          <Box w="200px">
            <BasicButton>Save variant</BasicButton>
          </Box>
        </Flex>
      </SkuFormWrapper>

      {/* <Box w="100%">
        <BasicButton cancelType={true} click={openForm}>
          Add variant
        </BasicButton>
      </Box> */}
    </Box>
  );
};

export default AddSkuSection;
