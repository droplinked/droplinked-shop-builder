import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { useToasty } from "context/toastify/ToastContext";
import { useApi } from "hooks/useApi/useApi";
import {
  ThankPageWrapper,
  ThankText,
  MessageText,
  EmailText,
} from "./ThankForRegisterPage-style";
//
import BasicButton from "common/BasicButton/BasicButton";
import { postUserResendEmail } from "lib/apis/userApiService";

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
    let result = await postApi(postUserResendEmail(email));
    setLoading(false);
    // if get error from api
    if (result) successToast("A new link was sent to your email");
  };

  return (
    <ThankPageWrapper minHeight={"50vh"} paddingTop={50}>
      <ThankText>Thank you!</ThankText>
      <MessageText>
        We have sent a verification email to
        <EmailText> "{email}"</EmailText>. Check inbox to verify your email.
      </MessageText>

      <Box w={{ sm: "150px", md: "200px" }}>
        <BasicButton onClick={resend} isLoading={loading}>
          Resend the link
        </BasicButton>
      </Box>
    </ThankPageWrapper>
  );
}
