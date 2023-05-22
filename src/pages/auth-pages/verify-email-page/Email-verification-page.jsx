import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
//
import { postUserEmailVerification } from "lib/apis/userApiService";
import { useApi } from "hooks/useApi/useApi";
//
import LoadingComponent from "common/loading-component/LoadingComponent";
import useAppToast from "hooks/toast/useToast";

export default function VerifyEmailPage() {
  const nav = useNavigate()
  let token = useParams().token
  const { showToast } = useAppToast()

  const { postApi } = useApi()

  useEffect(() => {
    const verify = async () => {
      let result = await postApi(postUserEmailVerification(token));
      if (result) {
        nav("/?modal=login");
        showToast("Your email has been verified, please login", "success");
      } else {
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
