import { Flex, Text, FormLabel, FormControl } from "@chakra-ui/react";
import { useState, useRef } from "react";

const InputColor = ({ label, value, change }) => {
  return (
    <FormControl isRequired w="100%">
      <FormLabel fontWeight="500" fontSize="18px" color="#C2C2C2" mb="12px">
        {label}
      </FormLabel>
      <Flex
        w="100%"
        bg="subLayer"
        borderRadius="8px"
        p="13px 24px"
        gap="10px"
        alignItems="center"
      >
        <input
          style={{
            backgroundColor: value,
            width: "20px",
            height: "20px",
          }}
          type="color"
          value={value}
          onChange={change}
        />

        <Text
          fontFamily="Avenir Next"
          fontWeight="500"
          fontSize="16px"
          color="#808080"
        >
          {value}
        </Text>
      </Flex>
    </FormControl>
  );
};

export default InputColor;
