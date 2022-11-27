import { Box, Text, Flex, Input } from "@chakra-ui/react";

import {
  FormInput,
  DimentionsInputs,
  SelectTag,
  OptionTag,
} from "./add-variant-form-style";

import BasicButton from "../../../../components/shared/BasicButton/BasicButton";

const AddVariantForm = () => {
  return (
    <Box w="100%" bg="subLayer" p="36px 48px" borderRadius="8px">
      <Flex alignItems="center" justifyContent="space-between" mb="16px">
        <Text color="white" fontSize="20px">
          Price
        </Text>
        <FormInput placeholder="Example" />
      </Flex>

      <Flex alignItems="center" justifyContent="space-between" mb="16px">
        <Text color="white" fontSize="20px">
          Quantity
        </Text>
        <FormInput placeholder="Example" />
      </Flex>

      <Flex alignItems="center" justifyContent="space-between" mb="16px">
        <Text color="white" fontSize="20px">
          External ID
        </Text>
        <FormInput placeholder="Example" />
      </Flex>
      <Flex alignItems="center" justifyContent="space-between" mb="16px">
        <Text color="white" fontSize="20px">
          Delivery box dimentions
        </Text>
        <Flex
          alignItems="center"
          justifyContent="space-between"
          w="100%"
          maxW="50%"
          bg="mainLayer"
          color="darkGray"
          p="15px 24px"
          borderRadius="8px"
        >
          <DimentionsInputs placeholder="Lenght" />
          <Box bg="#262626" w="2px" h="100%" border="1px solid #262626"></Box>
          <DimentionsInputs placeholder="Height" />
          <Box bg="#262626" w="2px" h="100%" border="1px solid #262626"></Box>
          <DimentionsInputs placeholder="Width" />
          <Box bg="#262626" w="2px" h="100%" border="1px solid #262626"></Box>
          <DimentionsInputs placeholder="Weight" />
        </Flex>
      </Flex>

      <Flex alignItems="center" justifyContent="space-between" mb="16px">
        <Text color="white" fontSize="20px">
          Size
        </Text>
        <SelectTag>
          <OptionTag>value 1</OptionTag>
          <OptionTag>value 2</OptionTag>
        </SelectTag>
      </Flex>

      <Box mb="20px"></Box>

      <Flex justifyContent='end' w='100%'>
      <Box w="200px" >
        <BasicButton>Save</BasicButton>
      </Box>
      </Flex>
    </Box>
  );
};

export default AddVariantForm;
