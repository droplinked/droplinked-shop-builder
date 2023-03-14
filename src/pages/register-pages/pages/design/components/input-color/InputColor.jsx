import { Box, Flex, Text, Input } from "@chakra-ui/react";
import { useState, useRef } from "react";

const InputColor = () => {
  const fileRef = useRef(null);

  const [selectedColor, setSelectedColor] = useState("#FFFFFF");

  const openFile = () => {
    fileRef.current.click();
  };

  return (
    <Flex
      w="100%"
      bg="subLayer"
      borderRadius="8px"
      p="13px 24px"
      gap="10px"
      alignItems='center'
    >

      <input
        style={{
          backgroundColor: selectedColor,
          width: "20px",
          height: "20px",
        }}
        type="color"
        value={selectedColor}
        onChange={(e) => {
          setSelectedColor(e.target.value);
        }}
      />

      <Text
        fontFamily="Avenir Next"
        fontWeight="500"
        fontSize="16px"
        color="#808080"
      >
       {selectedColor}
      </Text>
    </Flex>
  );
};

export default InputColor;
