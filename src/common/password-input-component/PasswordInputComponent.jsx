import {
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { Icon } from "./PasswordInputComponent-style";
import openEyeIcon from "../../../assest/icon/visible-icon.svg";
import closeEyeIcon from "../../../assest/icon/invisible-icon.svg";
//
function PasswordInputComponent({
  value,
  change,
  label,
  placeholder,
  isRequired,
  showError,
  props,
}) {
  //
  const [touched, setTouched] = useState(false);
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
            onBlur={() => setTouched(true)}
          />
          <InputRightElement height="100%">
            <IconButton
              variant="link"
              _focus={{ outline: "none" }}
              onClick={handleClick}
            >
              <Icon src={show ? closeEyeIcon : openEyeIcon} />
            </IconButton>
          </InputRightElement>
        </InputGroup>
        {(isInvalid ||
          (isRequired && !value?.length && touched) ||
          (!value?.length && showError)) && (
          <FormHelperText color="red">
            Password must include at least 8 characters.
          </FormHelperText>
        )}
      </FormControl>
    </Flex>
  );
}

export default PasswordInputComponent;
