import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
//
import { postUserEmailVerification } from "lib/apis/userApiService";
import { useApi } from "hooks/useApi/useApi";
//
import LoadingComponent from "common/loading-component/LoadingComponent";
import { toast } from "react-toastify";

export default function VerifyEmailPage() {
  const nav = useNavigate();
  let token = useParams().token;
  
  const { postApi } = useApi();

  useEffect(() => {
    const verify = async () => {
      let result = await postApi(postUserEmailVerification(token));
      if (result) {
        nav("/?modal=login");
        toast.success("Your email has been verified, please login");
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
