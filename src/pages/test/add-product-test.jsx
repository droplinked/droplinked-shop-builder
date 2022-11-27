import {
  AddProductPageWrapper,
  AddProductContentWrapper,
  SectionTitle,
  ImagesWrapper,
  ImageItem,
} from "./add-product-style";
import { Box, Image, Text } from "@chakra-ui/react";

import SelectCollection from "./test-components/select-collection/select-collection-component";
import FormInput from "../../components/shared/FormInput/FormInput";
import testImg from "./example-image.jpg";
import uploadImage from "./upload-image.svg";

const AddproductTest = () => {
  return (
    <AddProductPageWrapper>
      <AddProductContentWrapper>
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
      </AddProductContentWrapper>
    </AddProductPageWrapper>
  );
};

export default AddproductTest;
