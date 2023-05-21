import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
//
import { putUserRecoveryAccount } from "lib/apis/userApiService";
import { useApi } from "hooks/useApi/useApi";
//
import "./ResetPassPage-style.scss";
//
import BasicButton from "common/BasicButton/BasicButton";
import InputFieldComponent from "common/input-field-component/InputFieldComponent";
import { toast } from "react-toastify";



export default function ResetPassPage() {
  const [newPass, setNewpass] = useState("");
  const [confirmnewPass, setConfirmNewpass] = useState("");
  const [confirmError, setConfirmError] = useState(false);
  const [btnActivd, setBtnActivd] = useState(false);
  const { putApi } = useApi();

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
    let result = await putApi(putUserRecoveryAccount(token, newPass));
    if (result) {
      toast.success(
        "Your password has been changed successfully. Please login again."
      );
      navigate("/?modal=login");
    } else navigate("/");
  };

  return (
    <>
      <div className="recovery-page-wrapper">
        <div className="title">Change your password</div>
        <InputFieldComponent
          type={"password"}
          label={"New Password"}
          value={newPass}
          change={(e) => {
            setNewpass(e.target.value);
          }}
        />
        <div className="mt-4">
          <InputFieldComponent
            type={"password"}
            label={"Confirm New Password"}
            value={confirmnewPass}
            change={changeConfirmPass}
          />
        </div>
        {confirmError && (
          <p className="error">{`Password and confirm password don't match.`}</p>
        )}
        <div className="mt-4">
          <BasicButton onClick={changePassword} isDisabled={btnActivd}>
            Change my password
          </BasicButton>
        </div>
      </div>
    </>
  );
}
