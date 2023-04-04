import { Box, Flex, Image, Text } from "@chakra-ui/react";

import plusIcon from "../../../../../assest/icon/plus-icon.svg";

const AddRuleComponent = () => {
  return (
    <Flex
      w="169px"
      h="148px"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      bg="subLayer"
      borderRadius="8px"
      cursor="pointer"
     // onClick={navigateToAddProductPage}
    >
      <Image src={plusIcon} h="48px" w="48px" />
      <Box mb="24px" />
      <Text color="#fff" fontWeight="500" fontSize="18px">
        Add Ruleset
      </Text>
    </Flex>
  );
};

export default AddRuleComponent;
