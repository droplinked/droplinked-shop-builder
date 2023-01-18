import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { useToasty } from "../../../context/toastify/ToastContext";
import { useApi } from "../../../hooks/useApi/useApi";
import { postResendEmail } from "../../../api-service/auth/authApiService";
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

  const { successToast } = useToasty();
  const { postApi } = useApi();

  // get email from localhost for show register email in text
  let email = JSON.parse(localStorage.getItem("registerEmail"));

  const resend = async () => {
    // call resent email api
    setLoading(true);
    let result = await postApi(postResendEmail(email));
    setLoading(false);
    // if get error from api
    if (result) successToast("A new link was sent to your email");
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
