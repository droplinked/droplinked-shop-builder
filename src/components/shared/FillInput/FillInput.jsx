import { Input, Text, Flex } from "@chakra-ui/react";

const FillInput = ({ preText, value, change ,placeholder }) => {
  return (
    <Flex
      w="100%"
      px="16px"
      py={{ base: "8px", md: "12px" }}
      bgColor="dark"
      borderRadius="8px"
      alignItems="center"
    >
      <Text
        fontWeight="600"
        fontSize={{ base: "14px", md: "20px" }}
        color="lightGray"
      >
        {preText}
      </Text>
      <Input
        fontWeight="600"
        fontSize={{ base: "14px", md: "20px" }}
        color="lightGray"
        w="100%"
        h="100%"
        border="none"
        outline="none"
        p="0px"
        _focus={{
          border: "none",
          outline: "none",
        }}
        placeholder={placeholder}
        value={value}
        onChange={change}
      />
    </Flex>
  );
};

export default FillInput;
