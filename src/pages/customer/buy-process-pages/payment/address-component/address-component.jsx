import { Flex, Box, Text } from "@chakra-ui/react";

const AddressComponent = ({shippingPrice , selectedAddress}) => {

  return (
    <Box
      w="100%"
      mx="auto"
      bg="gray"
      p="40px 40px"
      borderRadius="8px"
      mb="24px"
    >
      <Text
        w="100%"
        mb="7px"
        color="#fff"
        fontWeight="500"
        fontSize={{ base: "18px", md: "24px" }}
      >
        {selectedAddress.country} - {selectedAddress.state} ,{" "}
        {selectedAddress.firstname} {selectedAddress.lastname}
      </Text>
      <Text
        w="100%"
        mb="5px"
        color="#fff"
        fontWeight="400"
        fontSize={{ base: "16px", md: "20px" }}
      >
        {selectedAddress.addressLine1}
      </Text>

      <Flex w="100%" justifyContent="space-between">
        <Text
          color="#fff"
          fontWeight="400"
          fontSize={{ base: "12px", md: "20px" }}
        >
          {selectedAddress.city} {selectedAddress.zip}{" "}
        </Text>

        <Text
          color="#fff"
          fontWeight="400"
          fontSize={{ base: "16px", md: "20px" }}
        >
          Shipping price: ${shippingPrice}
        </Text>
      </Flex>
    </Box>
  );
  
};

export default AddressComponent
