import "./ResetPassPage-style.scss";

import BasicButton from "../../../components/shared/BasicButton/BasicButton";
import FormInput from "../../../components/shared/FormInput/FormInput";

import { useParams, useNavigate } from "react-router-dom";
import { toastValue } from "../../../context/toastify/ToastContext";
import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { putUserRecoveryAccount } from "../../../apis/userApiService";
import { useApi } from "../../../hooks/useApi/useApi";

export default function ResetPassPage() {
  const [newPass, setNewpass] = useState("");
  const [confirmnewPass, setConfirmNewpass] = useState("");
  const [confirmError, setConfirmError] = useState(false);
  const [btnActivd, setBtnActivd] = useState(false);
  const { successToast } = useContext(toastValue);
  const { postApi } = useApi();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  let navigate = useNavigate();
  let token = useParams().token;

  const changeConfirmPass = (e) => {
    setConfirmNewpass(e.target.value);
    setConfirmError(false);
  };

  const changePassword = async () => {
    if (newPass !== confirmnewPass) {
      setConfirmError(true);
      return;
    }

    setBtnActivd(true);

    // const postInfo = {
    //   accountRecoveryToken: token,
    //   newPassword: newPass,
    // };
    // let result = await recoveryAccount(token, newPass);
    let result = await postApi(putUserRecoveryAccount(token, newPass));
    if (result) {
      successToast(
        "Your password has been changed successfully. Please login again."
      );
      navigate("/?modal=login");
    } else navigate("/");
  };

  return (
    <>
      <div className="recovery-page-wrapper">
        <div className="title">Change your password</div>
        <FormInput
          type={"password"}
          label={"New Password"}
          value={newPass}
          changeValue={(e) => {
            setNewpass(e.target.value);
          }}
        />
        <div className="mt-4">
          <FormInput
            type={"password"}
            label={"Confirm New Password"}
            value={confirmnewPass}
            changeValue={changeConfirmPass}
          />
        </div>
        {confirmError && (
          <p className="error">{`Password and confirm password don't match.`}</p>
        )}
        <div className="mt-4">
          <BasicButton click={changePassword} disabled={btnActivd}>
            Change my password
          </BasicButton>
        </div>
      </div>
    </>
  );
}
