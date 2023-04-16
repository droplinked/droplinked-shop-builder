import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
function PasswordInputComponent({
  value,
  change,
  label,
  placeholder,
  isRequired,
  props,
}) {
  //
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  //
  const isInvalid = value ? value?.length < 8 : false;
  //
  return (
    <Flex gap={3}>
      <FormControl
        sx={{
          "& .css-1ssjhh": {
            color: "white",
          },
        }}
        isRequired={isRequired}
        {...props}
      >
        {label && (
          <FormLabel htmlFor="input-com" color="white">
            {label}
          </FormLabel>
        )}
        <InputGroup>
          <Input
            isInvalid={isInvalid}
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
            type={show ? "text" : "password"}
          />
          <InputRightElement>
            <Button
              _focus={{ outline: "none" }}
              variant="unstyled"
              onClick={handleClick}
            >
              hi
            </Button>
            {/* <IconButton
              // icon={!show ? <GenIcon /> : <GenIcon />}
              borderRadius="lg"
              variant="ghost"
              onClick={handleClick}
            /> */}
          </InputRightElement>
        </InputGroup>
        {isInvalid && (
          <FormHelperText color="red">
            Password must include at least 8 characters.
          </FormHelperText>
        )}
      </FormControl>
    </Flex>
  );
}

export default PasswordInputComponent;
