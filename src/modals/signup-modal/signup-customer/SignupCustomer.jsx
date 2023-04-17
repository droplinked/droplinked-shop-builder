import { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";

import { useToasty } from "../../../context/toastify/ToastContext";
//import { customerSignup } from "../../../api/base-user/Auth-api";
import { BottomText } from "../SignupModal-style";
import { useDispatch } from "react-redux";
import { postSignupCustomer } from "../../../api-service/auth/authApiService";
import { useApi } from "../../../hooks/useApi/useApi";

import { setCurrentUser } from "../../../store/profile/profile.action";

import BasicButton from "../../../components/shared/BasicButton/BasicButton";
import InputFieldComponent from "../../../components/shared/input-field-component/InputFieldComponent";

export default function SignupCustomer({ switchToggle, close }) {
  const { errorToast, successToast } = useToasty();
  const dispatch = useDispatch();
  const { postApi } = useApi();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const changeEmail = (e) => setEmail(e.target.value);
  const changePass = (e) => setPassword(e.target.value);
  const changeConfirmPass = (e) => setConfirmPassword(e.target.value);

  const onSubmit = async () => {
    if (password !== confirmPassword) {
      errorToast("Passwords do not match, please re-enter");
      return;
    }

    if (validationEmail(email)) {
      errorToast("Please enter a valid email address.");
      return;
    }

    //let accountInfo = { email: email, password: password };
    setLoading(true);

    // let result = await customerSignup(accountInfo, errorToast);
    let result = await postApi(postSignupCustomer(email, password));
    if (result) {
      successToast("Account successfully created");
      close();
      dispatch(setCurrentUser(result));
    }
    setLoading(false);
  };

  const validationEmail = (em) => {
    let regx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (regx.test(em)) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <Box w="100%" h="100%">
      <Box mb="20px"></Box>
      <InputFieldComponent
        value={email}
        change={changeEmail}
        label={"Email"}
        placeholder={"Email"}
      />
      <Box mb="20px"></Box>
      <InputFieldComponent
        value={password}
        change={changePass}
        label={"Password"}
        type="password"
        placeholder={"Password"}
      />
      <Box mb="20px"></Box>
      <InputFieldComponent
        value={confirmPassword}
        change={changeConfirmPass}
        label={"Confirm password"}
        type="password"
        placeholder={"Confirm password"}
      />
      <Box mb="20px"></Box>
      <BasicButton width="100%" click={onSubmit} disabled={loading}>
        Sign up
      </BasicButton>

      <Flex mt="20px" w="100%">
        <BottomText>
          {" "}
          By creating an account, you agree to the{" "}
          <Link onClick={close} to="/terms">
            Terms & Conditions
          </Link>{" "}
          and{" "}
          <Link onClick={close} to="/privacy">
            Privacy
          </Link>
          .
        </BottomText>
      </Flex>
      <Flex mt="20px" w="100%" textAlign="center">
        <BottomText>
          Already have an account? <a onClick={switchToggle}>Login</a>
        </BottomText>
      </Flex>
    </Box>
  );
}

{
  /* <form
                onSubmit={handleSubmit(onSubmit)}
                style={{ margin: "0px", padding: "0px", maxWidth: "100%" }}
            >

                <div className="input-label">
                    <label>Email</label>
                    <input type="email" placeholder="example@email.com"
                        {...register("email", { required: true })}
                        onChange={() => { setError(null) }}
                    />
                    {errors.email?.type === 'required' && <span className="signup-modal-error">Email is required.</span>}
                    {(error != null || error != "") &&
                        (<span className="signup-modal-error">{error}</span>)}
                </div>


           
                <div className="input-label">
                    <label >Password</label>
                    <input type="password" placeholder="Password"
                        {...register("password", { required: true, minLength: 8 })} />
                    {errors.password?.type === 'required' && <span className="signup-modal-error">Password is required.</span>}
                    {errors.password?.type === 'minLength' && <span className="signup-modal-error">Password must be at least 8 characters.</span>}
                </div>

                <div className="input-label">
                    <label >Confirm password</label>
                    <input type="password" placeholder="Confirm password"
                        {...register("confirmPassword", { required: true, minLength: 8 })} />
                    {errors.confirmPassword?.type === 'required' && <span className="signup-modal-error">Password is required.</span>}
                    {errors.confirmPassword?.type === 'minLength' && <span className="signup-modal-error">Password must be at least 8 characters.</span>}
                </div>
                <div className="mt-3 mt-md-4">
                     <BasicButton type="submit"  disabled={loading} >Sign up</BasicButton>
                </div>

            </form> */
}
