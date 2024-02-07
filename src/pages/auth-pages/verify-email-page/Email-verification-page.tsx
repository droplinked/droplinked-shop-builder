import { Flex, VStack } from "@chakra-ui/react";
import LoadingComponent from 'components/common/loading-component/LoadingComponent';
import AppTypography from "components/common/typography/AppTypography";
import useAppToast from "functions/hooks/toast/useToast";
import { IemailVerifyService } from "lib/apis/user/interfaces";
import { emailVerifyService } from "lib/apis/user/services";
import React, { useEffect } from "react";
import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

export default function VerifyEmailPage() {
  const { mutateAsync } = useMutation((params: IemailVerifyService) => emailVerifyService(params))
  const nav = useNavigate()
  let token = useParams().token
  const { showToast } = useAppToast()

  useEffect(() => {
    const verify = async () => {
      try {
        // Check code
        await mutateAsync({ token })
        nav("/?modal=login");
        showToast({ message: "Your email has been verified, please login", type: "success" });
      } catch (error) {
        nav("/");
      }
    };
    verify();
  }, []);

  return (
    <Flex justifyContent="center" padding="150px 0">
      <VStack align="stretch" width="95%" backgroundColor="#090909" padding="100px 0" borderRadius="10px" maxWidth="400px" textAlign="center" spacing={5}>
        <LoadingComponent />
        <AppTypography fontSize="16px" color="#FFF">Please Waiting...</AppTypography>
      </VStack>
    </Flex>
  );
}
