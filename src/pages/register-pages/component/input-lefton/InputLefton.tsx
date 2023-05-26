import React from "react";
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import FieldLabel from "common/form/fieldLabel/FieldLabel";
import AppInput from "common/form/textbox/AppInput";
import AppTypography from "common/typography/AppTypography";

interface Iprops {
  isRequired?: boolean
  label?: string
  placeHolder?: string
  value?: string
  change?: any
  color?: string
  children?: any
}

const InputLefton = ({ isRequired, label, placeHolder, value, change, color, children, }: Iprops) => {
  return (
    <FormControl isRequired={isRequired} w="100%">
      <AppTypography size="16px" color="#C2C2C2">{label}</AppTypography>
      <Flex marginTop={2}>
        <InputLeftAddon
          bg="line"
          borderColor="subLayer"
          borderRadius="8px 0 0 8px"
          fontSize="14px"
          padding={3}
          color={color ? color : "#fff"}
          children={children}
        />
        <AppInput
          name=""
          placeholder={placeHolder}
          borderRadius={"0 8px 8px 0"}
          value={value}
          onChange={change}
        />
      </Flex>
    </FormControl>
  );
};

export default InputLefton;
