import { useEffect, useContext } from "react";

import { toastValue } from "../../../context/toastify/ToastContext";
import { useParams, useNavigate } from "react-router-dom";
import { postUserEmailVerification } from "../../../apis/userApiService";
import { useApi } from "../../../hooks/useApi/useApi";

import LoadingComponent from "../../../components/shared/loading-component/LoadingComponent";

export default function VerifyEmailPage() {
  const nav = useNavigate();
  let token = useParams().token;
  
  const { postApi } = useApi();
  const { successToast } = useContext(toastValue);

  useEffect(() => {
    const verify = async () => {
      let result = await postApi(postUserEmailVerification(token));
      if (result) {
        nav("/?modal=login");
        successToast("Your email has been verified, please login");
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
