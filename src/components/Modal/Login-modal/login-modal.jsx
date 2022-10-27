//import "./LoginModal.style.scss";

import ModalContainer from "../modal-container/modal-container";
import FormInput from "../../shared/FormInput/FormInput";
import BasicButton from "../../shared/BasicButton/BasicButton";

import { Box } from "@chakra-ui/react";
import { Title, BottomText } from "./login-modal-style";
import { PROFILE_STATUS } from "../../../constant/profile-status-types";
import { useState, useContext } from "react";
import { toastValue } from "../../../context/toastify/ToastContext";
import { isValidEmail } from "../../../utils/validations/emailValidation";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../../../context/profile/ProfileContext";
import { SignIn } from "../../../api/base-user/Auth-api";

// this modal for login user and managment function after login based on status and userType
export default function LoginModal({ close, switchToggle, switchReset }) {
  // state for disable buttons
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // hooks
  const { addProfile } = useProfile();
  const { successToast, errorToast } = useContext(toastValue);
  let navigate = useNavigate();

  const changeEmail = (e) => setEmail(e.target.value);
  const changePassword = (e) => setPassword(e.target.value);

  const validateForm = () => {
    if (email == "") {
      errorToast("Email is required.");
      return false;
    } else if (password == "") {
      errorToast("Password is required.");
      return false;
    } else if (isValidEmail(email) == false) {
      errorToast("Please enter a valid email address.");
      return false;
    } else {
      return true;
    }
  };

  // submit form function
  const onSubmit = async () => {
    let info = {
      email: email,
      password: password,
    };

    if (validateForm() == false) return;
    // set in loading state
    setLoading(true);

    let result = await SignIn(info);

    if (result.status == "success") {
      loginFunction(result.data);
    } else {
      errorToast(result.reason);
    }

    // set in normal situation
    setLoading(false);
  };

  // action on user data based on type and status
  const loginFunction = (data) => {
    //first close modal
    close();

    let status = data.user.status;

    if (status === PROFILE_STATUS.NEW) {
      localStorage.setItem("registerEmail", JSON.stringify(data.user.email));
      navigateUser(status);
      return;
    } else if (status === PROFILE_STATUS.DELETED) {
      errorToast("This account has been deleted");
      return;
    } else {
      navigateUser(status, data.user.shopName);
      addProfile(data);
      return;
    }
  };

  // navigate user based on status
  const navigateUser = (status, shopName) => {
    switch (status) {
      case PROFILE_STATUS.NEW:
        navigate("/email-confirmation");
        return;
      case PROFILE_STATUS.VERIFIED:
        navigate("/register");
        return;
      case PROFILE_STATUS.PROFILE_COMPLETED:
        navigate("/register");
        return;
      case PROFILE_STATUS.SHOP_INFO_COMPLETED:
        navigate("/register");
        return;
      case PROFILE_STATUS.IMS_TYPE_COMPLETED:
        navigate(`/${shopName}`);
        return;
      case PROFILE_STATUS.ACTIVE:
        navigate(`/${shopName}`);
        return;
    }
  };

  return (
    <>
      <ModalContainer close={close}>
        <Box w="100%">
          <Title>Login</Title>

          <Box w="100%" pt="20px">
            <FormInput
              value={email}
              changeValue={changeEmail}
              label={"Email"}
              placeholder={"Email"}
            />
            <Box mb="20px"></Box>

            <FormInput
              value={password}
              changeValue={changePassword}
              label={"Password"}
              placeholder={"Password"}
              type="password"
            />
            <Box mb="20px"></Box>
            <BasicButton click={onSubmit} disable={loading}>
              Login
            </BasicButton>
          </Box>
          <Box mb="25px"></Box>
          <BottomText onClick={switchReset}>Forgot password?</BottomText>
          <Box mb="10px"></Box>
          <BottomText onClick={switchToggle}>
            {" "}
            Don’t have an account? Register now!
          </BottomText>
        </Box>
      </ModalContainer>
    </>
  );
}
