import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoadingComponent from 'components/common/loading-component/LoadingComponent';
import useAppToast from "functions/hooks/toast/useToast";
import { useMutation } from "react-query";
import { emailVerifyService } from "lib/apis/user/services";
import { IemailVerifyService } from "lib/apis/user/interfaces";

export default function VerifyEmailPage() {
  const { mutateAsync } = useMutation((params: IemailVerifyService) => emailVerifyService(params))
  const nav = useNavigate()
  let token = useParams().token
  const { showToast } = useAppToast()

  useEffect(() => {
    const verify = async () => {
      try {
        await mutateAsync({ token })
        nav("/?modal=login");
        showToast("Your email has been verified, please login", "success");
      } catch (error) {
        nav("/");
      }
    };
    verify();
  }, []);

  return (
    <>
      <LoadingComponent />
    </>
  );
}
