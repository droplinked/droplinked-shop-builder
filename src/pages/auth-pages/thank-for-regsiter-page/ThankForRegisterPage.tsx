import { Box } from "@chakra-ui/react";
import BasicButton from 'components/common/BasicButton/BasicButton';
import useAppToast from "functions/hooks/toast/useToast";
import { IresendEmailService } from "lib/apis/user/interfaces";
import { resendEmailService } from "lib/apis/user/services";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { EmailText, MessageText, ThankPageWrapper, ThankText } from "./ThankForRegisterPage-style";

export default function ThankForRegisterPage() {
  const { mutateAsync } = useMutation((params: IresendEmailService) => resendEmailService(params))
  // use this state for loading state of button when calling api
  const [loading, setLoading] = useState(false);
  const { showToast } = useAppToast()

  // get email from localhost for show register email in text
  let email = JSON.parse(localStorage.getItem("registerEmail"));

  const resend = async () => {
    try {
      // call resent email api
      setLoading(true);
      await mutateAsync({ email })
      setLoading(false);
      // if get error from api
      showToast({ message: "A new link was sent to your email", type: "success" });
    } catch (error) {
      showToast({ message: error?.response?.data?.message[0], type: "error" });
      setLoading(false);
    }
  };

  return (
    <ThankPageWrapper padding={'250px 0'}>
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
