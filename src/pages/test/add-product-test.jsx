import {
  AddProductPageWrapper,
  AddProductContentWrapper,
  SectionTitle,
  ImagesWrapper,
  ImageItem,
  SelectTag,
  OptionTag,
  CustomShippingInput,
} from "./add-product-style";
import { Box, Image, Text, Flex } from "@chakra-ui/react";
import { useState } from "react";

import OptionSection from "./test-components/option-component/option-section-component";
import SelectCollection from "./test-components/select-collection/select-collection-component";
import FormInput from "../../components/shared/FormInput/FormInput";
import testImg from "./example-image.jpg";
import uploadImage from "./upload-image.svg";
import AddVariantForm from "./test-components/variant-from-component/add-variant-form-component";
import VariantComponent from "./test-components/variant-component/variant-component";
import RecordModal from "./test-components/record-warning-modal/record-warning-modal";
import BasicButton from "../../components/shared/BasicButton/BasicButton";
import ProductIntroducing from "./product-introducing-component/productn-intoducing"
import TechnicalInformation from "./technical-information/technical-information"
const SHIPPING_TYPE = {
  EASY_POST: "EASY_POST",
  CUSTOM: "CUSTOM",
};

const AddproductTest = () => {
  // const [shippingType, setShippingType] = useState(SHIPPING_TYPE.EASY_POST);
  // const [optionList, setOptionList] = useState([{}]);
  // const [variantList, setVariantList] = useState([]);
  // const [showRecordModal, setShowRecordModal] = useState(false);
  // const [isRecord, setIsRecord] = useState(false);

  // const changeShippingType = (e) => setShippingType(e.target.value);

  // const toggleRecordModal = () => setShowRecordModal((p) => !p);

  // const recordVariant = () => setIsRecord(true);

  // const addOption = () => {
  //   let currentValue = Array.from(optionList);
  //   currentValue.push({});
  //   setOptionList(currentValue);
  // };

  // const addVariant = () => {
  //   let currentValue = Array.from(variantList);
  //   currentValue.push({});
  //   setVariantList(currentValue);
  // };

  return (
    <AddProductPageWrapper>
      
      <ProductIntroducing />
      <Box mb="16px"></Box>
      <TechnicalInformation />
      {/* <AddProductContentWrapper>
        <SectionTitle>Introduction</SectionTitle>
        <Box mb="48px"></Box>
        <FormInput changeValue={() => {}} label="Title" placeholder="default" />
        <Box mb="40px"></Box>
        <FormInput
          changeValue={() => {}}
          label="Description"
          placeholder="default"
          type="textarea"
        />
        <Box mb="48px"></Box>
        <ImagesWrapper>
          <ImageItem bg="subLayer">
            <>
              <Image src={uploadImage} w="50px" h="50px" />
              <Box mb="24px"></Box>
              <Text fontSize="18px" color="darkGray">
                Add 3 images here
              </Text>
            </>
          </ImageItem>
          <ImageItem backgroundImage={testImg}></ImageItem>
        </ImagesWrapper>
      </AddProductContentWrapper>

      <Box mb="16px"></Box>

      <AddProductContentWrapper>
        <SectionTitle>Technical information</SectionTitle>
        <Box mb="48px"></Box>
        <Text
          htmlFor="input-com"
          fontWeight="600"
          fontSize={{ base: "14px", md: "20px" }}
          color="white"
        >
          Collection
        </Text>
        <Box mb="16px"></Box>
        <SelectCollection />
        <Box mb="40px"></Box>
        <Text
          htmlFor="input-com"
          fontWeight="600"
          fontSize={{ base: "14px", md: "20px" }}
          color="white"
        >
          Shipping
        </Text>
        <Box mb="16px"></Box>
        <Flex justifyContent="space-between">
          <Box w="40%">
            <SelectTag onChange={changeShippingType}>
              <OptionTag value={SHIPPING_TYPE.EASY_POST}>Easy post</OptionTag>
              <OptionTag value={SHIPPING_TYPE.CUSTOM}>Custom</OptionTag>
            </SelectTag>
          </Box>
          {shippingType == SHIPPING_TYPE.CUSTOM && (
            <Box w="40%">
              <CustomShippingInput placeholder="$ 10" />
            </Box>
          )}
        </Flex>
      </AddProductContentWrapper>

      <Box mb="16px"></Box>

      <AddProductContentWrapper>
        <SectionTitle>Properties</SectionTitle>
        <Box mb="48px"></Box>
        <Flex w="100%" p="10px 0px">
          <Text color="white" fontSize="16px" mr="15%">
            Required
          </Text>
          <Flex justifyContent="space-between" w="100%">
            <Text color="white" fontSize="16px">
              Price
            </Text>
            <Box w="1px" bg="#262626" h="100%" border="1px solid #262626"></Box>
            <Text color="white" fontSize="16px">
              Quantity
            </Text>
            <Box w="1px" bg="#262626" h="100%" border="1px solid #262626"></Box>
            <Text color="white" fontSize="16px">
              External ID
            </Text>
            <Box w="1px" bg="#262626" h="100%" border="1px solid #262626"></Box>
            <Text color="white" fontSize="16px">
              Delivery boxing information
            </Text>
          </Flex>
        </Flex>
        <Box mb="48px"></Box>
        <Flex w="100%" p="10px 0px">
          <Text color="white" fontSize="16px" mr="15%">
            Optional
          </Text>
          <Box w="100%">
            {optionList.map((opt, i) => {
              return (
                <OptionSection
                  isLast={optionList.length == i + 1}
                  addOption={addOption}
                />
              );
            })}
          </Box>
        </Flex>
      </AddProductContentWrapper>

      <Box mb="16px"></Box>

      <AddProductContentWrapper>
        <SectionTitle>Variants</SectionTitle>
        <Box mb="48px"></Box>

        <VariantComponent isRecord={isRecord} openModal={toggleRecordModal} />
        <VariantComponent isRecord={isRecord} openModal={toggleRecordModal} />
        <Box mb="16px"></Box>
        <AddVariantForm addVariant={addVariant} />
      </AddProductContentWrapper>
      <Box mb='36px'></Box>
      <Flex w="100%" justifyContent="end">
        <Box w="200px">
          <BasicButton>Save</BasicButton>
        </Box>
      </Flex>
      {showRecordModal && (
        <RecordModal recordVariant={recordVariant} cancel={toggleRecordModal} />
      )} */}
    </AddProductPageWrapper>
  );
};

export default AddproductTest;
