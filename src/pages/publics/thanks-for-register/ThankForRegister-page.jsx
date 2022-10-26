import { Box } from "@chakra-ui/react";
import { resendEmail } from "../../../api/public/ResendEmail-api";
import { useState } from "react";
import { useToasty } from "../../../context/toastify/ToastContext";
import {
  ThankPageWrapper,
  ThankText,
  MessageText,
  EmailText,
} from "./ThankForRegister-page-style";

import BasicButton from "../../../components/shared/BasicButton/BasicButton";

export default function ThankForRegisterPage() {
  // use this state for loading state of button when calling api
  const [loading, setLoading] = useState(false);

  const { successToast, errorToast } = useToasty();

  // get email from localhost for show register email in text
  let email = JSON.parse(localStorage.getItem("registerEmail"));

  const resend = async () => {
    // set in loading state until get data
    setLoading(true);
    // call resent email api
    let result = await resendEmail(email);
    // console.log(result);
    // if get error from api
    if (result == false) {
      errorToast("Not Found or Verified");
    } else {
      // if call successfully
      successToast("A new link was sent to your email");
    }
    setLoading(false);
  };

  return (
    <ThankPageWrapper>
      <ThankText>Thank you!</ThankText>

      <MessageText>
        We've sent a confirmation email to
        <EmailText> "{email}"</EmailText>. Please check your email inbox.
      </MessageText>

      <Box w={{ sm: "150px", md: "200px" }}>
        <BasicButton click={resend} loading={loading}>
          Resend the link
        </BasicButton>
      </Box>
    </ThankPageWrapper>
  );
}
