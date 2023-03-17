import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";

const InputLefton = ({
  isRequired,
  label,
  placeHolder,
  value,
  change,
  color,
  children
}) => {
  return (
    <FormControl isRequired={isRequired} w="100%">
      <FormLabel fontWeight="500" fontSize="18px" color="#C2C2C2">
        {label}
      </FormLabel>
      <InputGroup size="sm">
        <InputLeftAddon children={children} />
        <Input
          placeholder={placeHolder}
          value={value}
          onChange={change}
          padding="0px 24px"
          background="subLayer"
          borderRadius="8px"
          fontWeight="500"
          fontSize="16px"
          color={color ? color : "#fff"}
          border="none"
          _focus={{
            border: "none",
          }}
          _placeholder={{
            color: "#666666",
          }}
        />
      </InputGroup>
    </FormControl>
  );
};

export default InputLefton;
