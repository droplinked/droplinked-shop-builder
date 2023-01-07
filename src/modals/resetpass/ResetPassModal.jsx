import { useState } from "react";
import { Box } from "@chakra-ui/react";

import { useToasty } from "../../context/toastify/ToastContext";
import { resetPassword } from "../../api/base-user/Auth-api";
import { Title, Detail  ,BacktoLoginButton} from "./ResetPassModal-style";

import ModalWrapper from "../modal-wrapper/ModalWrapper";
import BasicButton from "../../components/shared/BasicButton/BasicButton";
import FormInput from "../../components/shared/FormInput/FormInput";


const ResetPassModal = ({show , close, switchReset }) => {

    const [disableBtn, setDisableBtn] = useState(false);
    const [email, setEmail] = useState("");
    const { successToast, errorToast } = useToasty();
  
    const SubmitForm = async () => {
      if (validationEmail()) {
          errorToast("The email address is invalid.");
      } else {
        setDisableBtn(true);
        let result = await resetPassword(email);
        if (result == true) {
          successToast(`Send an email to : ${email}`);
          close();
        } else {
          errorToast(result);
        }
        setDisableBtn(false);
      }
    };
  
    const validationEmail = () => {
      // let regx = /^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/
      let regx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (regx.test(email)) {
        return false;
      } else {
        return true;
      }
    };
  
    const ChangeEmail = (e) =>  setEmail(e.target.value);
     
  
  
    return (
      <ModalWrapper show={show} close={close}>
        <Box>
          <Title>Reset your password</Title>
          <Detail>
            Enter the email address associated with your account and we'll send
            you a link to reset your password.
          </Detail>
          <Box mt="30px"></Box>
          <FormInput label={"Email"} type={"email"} changeValue={ChangeEmail} />
  
          <Box mt="18px"></Box>
  
          <BasicButton click={SubmitForm} loading={disableBtn}>
            Reset password
          </BasicButton>
  
          <BacktoLoginButton onClick={switchReset} cancelType={true}>
            Back to login
          </BacktoLoginButton>
        </Box>
      </ModalWrapper>
    );
}

export default ResetPassModal