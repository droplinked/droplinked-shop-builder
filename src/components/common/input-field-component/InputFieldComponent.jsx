import {
  Input,
  FormControl,
  FormLabel,
  Text,
  Textarea,
  FormHelperText,
} from "@chakra-ui/react";
import { useState } from "react";

export default function InputFieldComponent({
  name = "",
  value,
  change,
  label,
  placeholder,
  description,
  isRequired,
  textArea,
  type,
  showError,
  ...otherProps
}) {
  const [touched, setTouched] = useState(false);
  return (
    <FormControl
      sx={{
        "& .css-1ssjhh": {
          color: "white",
        },
      }}
      isRequired={isRequired}
      {...otherProps}
    >
      {label && (
        <FormLabel htmlFor="input-com" color="white">
          {label}
        </FormLabel>
      )}

      {textArea ? (
        <Textarea
          id="input-com"
          value={value}
          onChange={change}
          color="#DBDBDB"
          bgColor="subLayer"
          border="none"
          borderRadius="8px"
          _focus={{ outline: "none" }}
          _placeholder={{ color: "#808080" }}
          fontSize="14px"
          size="lg"
          placeholder={placeholder}
          onBlur={() => setTouched(true)}
        />
      ) : (
        <Input
          id="input-com"
          value={value}
          onChange={change}
          color="#DBDBDB"
          bgColor="subLayer"
          border="none"
          borderRadius="8px"
          _focus={{ outline: "none" }}
          _placeholder={{ color: "#808080" }}
          fontSize="14px"
          size="lg"
          placeholder={placeholder}
          type={type ? type : "text"}
          onBlur={() => setTouched(true)}
        />
      )}

      {description && (
        <Text fontSize="14px" color="#808080" mt={2}>
          {description}
        </Text>
      )}

      {((isRequired && !value?.length && touched) ||
        (!value?.length && showError)) && (
        <FormHelperText color="#ff6464">{name} is required</FormHelperText>
      )}
    </FormControl>
  );
}
