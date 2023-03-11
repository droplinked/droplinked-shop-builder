import { FormControl, FormLabel, Input } from "@chakra-ui/react";

const InputComponent = ({ isRequired, label, placeHolder, value, change }) => {
  return (
    <FormControl isRequired={isRequired} w="100%">
      <FormLabel fontWeight="500" fontSize="18px" color="#C2C2C2">
        {label}
      </FormLabel>
      <Input
        placeholder={placeHolder}
        value={value}
        onChange={change}
        padding="0px 24px"
        background="subLayer"
        borderRadius="8px"
        fontWeight="500"
        fontSize="16px"
        color="#fff"
        border='none'
        _focus={{
            border:'none'
        }}
        _placeholder={{
            color:"#666666" 
        }}
      />
    </FormControl>
  );
};

export default InputComponent;
