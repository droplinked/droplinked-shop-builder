import { Input, Text, Flex, FormLabel ,FormControl} from "@chakra-ui/react";

const FillInput = ({ preText, value, change, placeholder ,label }) => {
  return (
    <FormControl w='100%'>
      <FormLabel
        htmlFor="input-com"
        fontWeight="600"
        fontSize={{ base: "14px", md: "20px" }}
        color="#fff"
      >
        {label}
      </FormLabel>
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
    </FormControl>
  );
};

export default FillInput;
