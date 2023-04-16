import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { Stack } from "@chakra-ui/react";

import { toastValue } from "../../../context/toastify/ToastContext";
import { isValidEmail } from "../../../utils/validations/emailValidation";
import { BottomText } from "../SignupModal-style";
import { postUserSignup } from "../../../apis/userApiService";
import { useApi } from "../../../hooks/useApi/useApi";

import BasicButton from "../../../components/shared/BasicButton/BasicButton";
import InputFieldComponent from "../../../components/shared/input-field-component/InputFieldComponent";
import PasswordInputComponent from "../../../components/shared/password-input-component/PasswordInputComponent";

export default function SignupProducer({ close, shopname, switchToggle }) {
  const { successToast, errorToast } = useContext(toastValue);
  const [loading, setLoading] = useState(false);

  const { postApi } = useApi();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [shopName, setShopName] = useState(shopname);

  const changeEmail = (e) => setEmail(e.target.value);
  const changePass = (e) => setPassword(e.target.value);
  const changeConPass = (e) => setConfirmPassword(e.target.value);
  const changeShopName = (e) => {
    if (shopname == undefined) setShopName(e.target.value);
  };

  let navigate = useNavigate();

  const onSubmit = async () => {
    // let info = {
    //   email: email,
    //   password: password,
    //   shopName: shopName,
    // };

    if (password !== confirmPassword) {
      errorToast("Passwords do not match, please re-enter");
      return;
    }

    if (isValidEmail(email) == false) {
      errorToast("Please enter a valid email address.");
      return;
    }
    if (!/^[A-Za-z0-9_]*$/.test(shopName)) {
      errorToast(
        "Username can contain letters (a-z), numbers (0-9) and underscores."
      );
      return;
    }
    if (password.length < 8) {
      errorToast("Your password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    let result = await postApi(postUserSignup(email, password, shopName));
    setLoading(false);

    if (result) {
      localStorage.setItem("registerEmail", JSON.stringify(email));
      successToast("Account successfully created");
      close();
      navigate("/email-confirmation");
    }
  };

  return (
    <Stack w="100%" h="100%" spacing="20px">
      <InputFieldComponent
        value={shopName}
        change={changeShopName}
        placeholder={"Username"}
      />
      <InputFieldComponent
        value={email}
        change={changeEmail}
        placeholder={"Email"}
      />
      <PasswordInputComponent
        value={password}
        change={changePass}
        placeholder={"Password"}
      />
      <PasswordInputComponent
        value={confirmPassword}
        change={changeConPass}
        placeholder={"Confirm password"}
      />
      <BasicButton click={onSubmit} disabled={loading}>
        Sign up
      </BasicButton>

      <BottomText onClick={switchToggle}>
        Already have an account? <a>Sign in</a> now
      </BottomText>
    </Stack>
  );
}
