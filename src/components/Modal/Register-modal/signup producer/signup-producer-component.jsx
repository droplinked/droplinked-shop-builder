import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { toastValue } from "../../../../context/toastify/ToastContext";
import { producerSignup } from "../../../../api/producer/Auth-api";
import { isValidEmail } from "../../../../utils/validations/emailValidation";
import { BottomText } from "../singup-modal-style";
import { Box, Flex } from "@chakra-ui/react";

import FormInput from "../../../shared/FormInput/FormInput";
import BasicButton from "../../../shared/BasicButton/BasicButton";

export default function SignupProducer({ close, shopname, switchToggle }) {
  const { successToast, errorToast } = useContext(toastValue);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [shopName, setShopName] = useState(shopname);

  const changeEmail = (e) => setEmail(e.target.value);
  const changePass = (e) => setPassword(e.target.value);
  const changeConPass = (e) => setConfirmPassword(e.target.value);
  //const changeShopName = (e) => setShopName(e.target.value);

  let navigate = useNavigate();

  const onSubmit = async () => {
    let info = {
      email: email,
      password: password,
      confirmPass: confirmPassword,
      shopName: shopName,
    };

    if (info.password !== info.confirmPass) {
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

    setLoading(true);

    let result = await producerSignup(info);
    if (result == true) {
      successToast("Account successfully created");
      close();
      navigate("/email-confirmation");
    } else {
      errorToast(result);
    }
    setLoading(false);
  };

  return (
    <Box w="100%" h="100%">
      <Box mb="20px"></Box>
      <FormInput
        value={email}
        changeValue={changeEmail}
        label={"Email"}
        placeholder={"Email"}
      />
      <Box mb="20px"></Box>
      <FormInput
        value={password}
        changeValue={changePass}
        label={"Password"}
        placeholder={"Password"}
      />
      <Box mb="20px"></Box>
      <FormInput
        value={confirmPassword}
        changeValue={changeConPass}
        label={"Confirm password"}
        placeholder={"Confirm password"}
      />
      <Box mb="20px"></Box>
      <FormInput
        value={shopName}
        label={"Username"}
        placeholder={"Username"}
      />
      <Box mb="20px"></Box>
      <BasicButton click={onSubmit} disabled={loading}>
        Sign up
      </BasicButton>
      <Box mb="20px"></Box>
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
      <Flex mt="20px" w="100%">
        <BottomText>
          Already have an account? <a onClick={switchToggle}>Login</a>
        </BottomText>
      </Flex>
      {/* <form
        onSubmit={handleSubmit(onSubmit)}
        onChange={() => {
          if (loading) {
            setLoading(false);
          }
        }}
        style={{ margin: "0px", padding: "0px", maxWidth: "100%" }}
      >

        <div className="input-label">
          <label>Email</label>
          <input
            type="email"
            placeholder="example@email.com"
            {...register("email", { required: true })}
            onChange={() => {
              setError(null);
            }}
          />
          {errors.email?.type === "required" && (
            <span className="signup-modal-error">Email is required.</span>
          )}
          {(error != null || error != "") && (
            <span className="signup-modal-error">{error}</span>
          )}
        </div>


        <div className="input-label">
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: true, minLength: 8 })}
          />
          {errors.password?.type === "required" && (
            <span className="signup-modal-error">Password is required.</span>
          )}
          {errors.password?.type === "minLength" && (
            <span className="signup-modal-error">
              Password must be at least 8 characters.
            </span>
          )}
        </div>

     
        <div className="input-label">
          <label>Confirm password</label>
          <input
            type="password"
            placeholder="Confirm password"
            {...register("confirmPassword", { required: true, minLength: 8 })}
          />
          {errors.confirmPassword?.type === "required" && (
            <span className="signup-modal-error">Password is required.</span>
          )}
          {errors.confirmPassword?.type === "minLength" && (
            <span className="signup-modal-error">
              Password must be at least 8 characters.
            </span>
          )}
        </div>

        <div className="input-label">
          <label>Username</label>
          <div className="modal-shopname-input">
            <span>droplinked.com/</span>
            {shopname == undefined ? (
              <input
                type="text"
                className="modal-shopname-input-inpt"
                placeholder="Username"
                {...register("shopname", { required: true })}
                onChange={() => {
                  setShopNameError(false);
                }}
              />
            ) : (
              <input
                type="text"
                value={shopname}
                className="modal-shopname-input-inpt"
                placeholder="Username"
                {...register("shopname", { required: true })}
                onChange={() => {
                  setShopNameError(false);
                }}
              />
            )}
          </div>
          {errors.shopname?.type === "required" && (
            <span className="signup-modal-error">Username is required.</span>
          )}
          {shopNameError && (
            <span className="signup-modal-error">
              {
                "Username can contain letters (a-z), numbers (0-9) and underscores."
              }
            </span>
          )}
        </div>
        <button
          className="sign-up-btn"
          type="submit"
          disabled={loading}
          style={{ backgroundColor: `${loading == true ? "#4A4A4A" : ""}` }}
        >
          Sign up
        </button>
      </form>

      <div className="text mt-4">
        <p>
          By creating an account, you agree to the{" "}
          <Link onClick={close} to="/terms">
            Terms & Conditions
          </Link>{" "}
          and{" "}
          <Link onClick={close} to="/privacy">
            Privacy
          </Link>
          .
        </p>
      </div>
      <div className="text mt-2">
        <p>
          Already have an account? <a onClick={switchToggle}>Login</a>
        </p>
      </div> */}
    </Box>
  );
}
