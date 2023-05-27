import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import {
  ThankPageWrapper,
  ThankText,
  MessageText,
  EmailText,
} from "./ThankForRegisterPage-style";
import BasicButton from 'components/common/BasicButton/BasicButton';
import useAppToast from "hooks/toast/useToast";
import { useMutation } from "react-query";
import { resendEmailService } from "lib/apis/user/services";
import { IresendEmailService } from "lib/apis/user/interfaces";

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
      showToast("A new link was sent to your email", "success");
    } catch (error) {
      showToast(error?.response?.data?.message[0], "error");
      setLoading(false);
    }
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
