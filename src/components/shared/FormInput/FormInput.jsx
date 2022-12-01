import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Textarea,
} from "@chakra-ui/react";

export default function FormInput({
  value,
  changeValue,
  label,
  type,
  placeholder,
  isError,
  gray,
  ...otherProps
}) {
  return (
    <FormControl {...otherProps}>
      {label && (
        <FormLabel
          htmlFor="input-com"
          fontWeight="600"
          fontSize={{ base: "14px", md: "20px" }}
          color="white"
        >
          {label}
        </FormLabel>
      )}
      {type == "textarea" ? (
        <Textarea
          id="input-com"
          type={type ? type : "text"}
          value={value}
          onChange={changeValue}
          fontWeight="600"
          fontSize={{ base: "14px", md: "20px" }}
          color="white"
          border="none"
          bgColor={(gray)?"mainLayer":"subLayer"}
          borderRadius="8px"
          px="16px"
          py={{ base: "8px", md: "12px" }}
          outline="none"
          _focus={{ outline: "none" }}
          h="auto"
          placeholder={placeholder}
        />
      ) : (
        <Input
          id="input-com"
          type={type ? type : "text"}
          value={value}
          onChange={changeValue}
          fontWeight="600"
          fontSize={{ base: "14px", md: "20px" }}
          color="#DBDBDB"
          bgColor={(gray)?"mainLayer":"subLayer"}
          border="none"
          borderRadius="8px"
          px="16px"
          py={{ base: "8px", md: "12px" }}
          outline="none"
          _focus={{ outline: "none" }}
          h="auto"
          placeholder={placeholder}
        />
      )}
      {isError && <FormHelperText color="red">{isError}</FormHelperText>}
    </FormControl>
  );
}
