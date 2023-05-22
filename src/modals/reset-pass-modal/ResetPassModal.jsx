import { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { useApi } from "../../hooks/useApi/useApi";
import { BacktoLoginButton } from "./ResetPassModal-style";
import BasicButton from "../../common/BasicButton/BasicButton";
import { postUserForgotPassword } from "lib/apis/userApiService";
import AppTypography from "common/typography/AppTypography";
import AppInput from "common/form/textbox/AppInput";
import useAppToast from "hooks/toast/useToast";
import AppModal from "common/modal/AppModal";

const ResetPassModal = ({ show, close, switchReset }) => {
  const [disableBtn, setDisableBtn] = useState(false);
  const [email, setEmail] = useState("");
  const { postApi } = useApi();
  const { showToast } = useAppToast();

  const SubmitForm = async () => {
    if (validationEmail()) {
      showToast("The email address is invalid.", "error");
    } else {
      setDisableBtn(true);
      let result = await postApi(postUserForgotPassword(email));
      if (result) {
        showToast(`Send an email to : ${email}`, "success");
        close();
      }
      setDisableBtn(false);
    }
  };

  const validationEmail = () => {
    // let regx = /^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/
    // let regx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // if (regx.test(email)) {
    //   return false;
    // } else {
    //   return true;
    // }
    return false
  };

  const ChangeEmail = (e) => setEmail(e.target.value);

  return (
    <AppModal open={show} close={close} contentProps={{padding:"50px 30px"}}>
      <Box>
        <Flex justifyContent={"center"}><AppTypography size="18px" weight="bolder" color={"#FFF"}>Reset your password</AppTypography></Flex>
        <AppTypography size="14px" color={"#FFF"} marginTop={6}>
          Enter the email address associated with your account and we'll send
          you a link to reset your password.
        </AppTypography>
        <Box mt="30px"></Box>
        <AppInput name="email" isRequired label={"Email"} type={"email"} change={ChangeEmail} />

        <Box mt="18px"></Box>

        <BasicButton minWidth={"100%"} onClick={SubmitForm} isLoading={disableBtn}>Reset password</BasicButton>

        <BacktoLoginButton onClick={switchReset} cancelType={true}>
          Back to login
        </BacktoLoginButton>
      </Box>
    </AppModal>
  );
};

export default ResetPassModal;
