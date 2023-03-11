import { FormControl, FormLabel, Input } from "@chakra-ui/react";

const InputComponent = ({ isRequired, label, placeHolder, value, change }) => {
  return (
    <FormControl isRequired={isRequired} w="100%">
      <FormLabel color="white">{label}</FormLabel>
      <Input placeholder={placeHolder} value={value} onChange={change} />
    </FormControl>
  );
};

export default InputComponent;
