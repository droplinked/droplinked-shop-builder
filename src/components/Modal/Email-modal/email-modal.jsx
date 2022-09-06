import { Box, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import { setProfileEmail } from "../../../api/base-user/Profile-api";
import { isValidEmail } from "../../../utils/validations/emailValidation";
import { useToasty } from "../../../context/toastify/ToastContext";

import FormInput from "../../shared/FormInput/FormInput";
import BasicButton from "../../shared/BasicButton/BasicButton";
import ModalContainer from "../modal-container/modal-container";

export default function EmailModal({ close }) {

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const { errorToast, successToast } = useToasty();

  // submit form function
  const submit = async () => {
    // validation email format
    if(!isValidEmail(email)){
      errorToast('Please enter a valid email address.')
      return
    }
    
    setLoading(true);
    let result = await setProfileEmail(email);
    if (result == true) {
      successToast("Your email address updated");
      close()
    } else {
      errorToast(result)
      setLoading(false);
    }
  };

  // on chage email input
  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  return (
    <ModalContainer close={close}>
      <Box>
        <Text
          color="#fff"
          w="100%"
          textAlign="center"
          mb="20px"
          fontWeight="600"
          fontSize={{ base: "14px", md: "20px" }}
        >
          Please enter your email address
        </Text>

        <FormInput
          mb="30px"
          placeholder={"Email"}
          value={email}
          changeValue={changeEmail}
          // isError={(!isValidEmail(email)) && "Please enter a valid email address."}
        />

        <Flex
          justifyContent="space-between"
          alignItems="center"
          p="0px"
          w="100%"
        >
          <BasicButton
            w="45%"
            p="12px 16px"
            click={close}
            loading={loading}
            disabled={loading}
          >
            Cancel
          </BasicButton>
          <BasicButton
            w="45%"
            p="12px 16px"
            loading={loading}
            disabled={loading}
            click={submit}
          >
            Submit
          </BasicButton>
        </Flex>
      </Box>
    </ModalContainer>
  );
}
