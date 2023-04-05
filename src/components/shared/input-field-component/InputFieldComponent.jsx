import { Input, FormControl, FormLabel, Text } from "@chakra-ui/react";

export default function InputFieldComponent({
  value,
  change,
  label,
  placeholder,
  description,
  ...otherProps
}) {
  return (
    <FormControl {...otherProps}>
      {label && (
        <FormLabel htmlFor="input-com" color="white">
          {label}
        </FormLabel>
      )}
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
      />
      {description && (
        <Text fontSize="14px" color="#808080" mt={2}>
          {description}
        </Text>
      )}
    </FormControl>
  );
}
