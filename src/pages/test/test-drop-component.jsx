import { Flex, Box, Select } from "@chakra-ui/react";

const DropdownTest = () => {
  return (
    <Box w="100%">
      <Select
        w="100%" 
        borderRadius="8px"
        p="6px 129x"
        outline="none"
        bgColor="#353536"
        color="#fff"
        fontWeight="600"
        fontSize="18px"
        transition="0.5s"
        _focus={{
          border: "2px solid #8053ff",
        }}
      >
        <option
          selected
          disabled
          style={{
            color: "#fff",
            fontSize: "18px",
            backgroundColor: "#333",
            fontWeight: "600",
          }}
        >
          test
        </option>
      </Select>
    </Box>
  );
};

export default DropdownTest;
