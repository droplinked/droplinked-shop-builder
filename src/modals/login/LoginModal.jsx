import ModalWrapper from "../modal-wrapper/ModalWrapper";
import FormInput from "../../components/shared/FormInput/FormInput";
import BasicButton from "../../components/shared/BasicButton/BasicButton";

import { Box } from "@chakra-ui/react";
import { Title, BottomText } from "./LoginModal-style";
import { PROFILE_STATUS } from "../../constant/profile-status-types";
import { USER_TYPE } from "../../constant/user-types";
import { useState, useContext } from "react";
import { toastValue } from "../../context/toastify/ToastContext";
import { isValidEmail } from "../../utils/validations/emailValidation";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../store/profile/profile.action";
import { setCurrentShop } from "../../store/shop/shop.action";
import { postLoginByEmail } from "../../apis/authApiService";
import { useApi } from "../../hooks/useApi/useApi";
import { useProfile } from "../../hooks/useProfile/useProfile";

const LoginModal = ({ show, close, switchModal, switchReset }) => {
  // state for disable buttons
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // hooks

  const { postApi } = useApi();
  const { setShopData } = useProfile();
  const { errorToast } = useContext(toastValue);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    // let info = {
    //   email: email,
    //   password: password,
    // };

    if (validateForm() == false) return;

    setLoading(true);
    let result = await postApi(postLoginByEmail(email, password));
    setLoading(false);
    if (result) loginFunction(result);
  };

  // action on user data based on type and status
  const loginFunction = (data) => {
    //first close modal
    close();
    console.log("data ", data);
    const status = data.user.status;

    // if (data.user.type == USER_TYPE.CUSTOMER) {
    //   dispatch(setCurrentUser(data));
    //   dispatch(setCurrentShop(data.shop));
    //   return;
    // }
    if (status === PROFILE_STATUS.NEW) {
      localStorage.setItem("registerEmail", JSON.stringify(data.user.email));
      navigateUser(status);
      return;
    } else if (status === PROFILE_STATUS.DELETED) {
      errorToast("This account has been deleted");
      return;
    } else {
      setShopData(data.shop);
      navigateUser(status, data.shop.name);
      dispatch(setCurrentUser(data));
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
        navigate(`/${shopName}/c/register/shop-info`);
        return;
      case PROFILE_STATUS.PROFILE_COMPLETED:
        navigate(`/${shopName}/c/register/shop-info`);
        return;
      case PROFILE_STATUS.SHOP_INFO_COMPLETED:
        navigate(`/${shopName}/c/products/`);
        return;
      case PROFILE_STATUS.IMS_TYPE_COMPLETED:
        navigate(`/${shopName}/c/products/`);
        return;
      case PROFILE_STATUS.ACTIVE:
        navigate(`/${shopName}/c/products/`);
        return;
    }
  };

  return (
    <>
      <ModalWrapper show={show} close={close}>
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
            <BasicButton click={onSubmit} disable={loading} loading={loading}>
              Login
            </BasicButton>
          </Box>
          <Box mb="25px"></Box>
          <BottomText onClick={switchReset}>Forgot password?</BottomText>
          <Box mb="10px"></Box>
          <BottomText onClick={switchModal}>
            Don’t have an account? Register now!
          </BottomText>
        </Box>
      </ModalWrapper>
    </>
  );
};

export default LoginModal;
