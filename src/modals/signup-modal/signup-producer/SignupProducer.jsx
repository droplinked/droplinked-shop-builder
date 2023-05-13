import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { Stack } from "@chakra-ui/react";
import { toastValue } from "../../../context/toastify/ToastContext";
import { BottomText } from "../SignupModal-style";
import { useApi } from "../../../hooks/useApi/useApi";
import BasicButton from "../../../components/shared/BasicButton/BasicButton";
import { postUserSignup } from "lib/apis/userApiService";
import AppInput from "components/shared/form/textbox/AppInput";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

export default function SignupProducer({ close, shopname, switchToggle }) {
  const { successToast, errorToast } = useContext(toastValue);
  const [loading, setLoading] = useState(false);
  const { postApi } = useApi();
  let navigate = useNavigate();

  const onSubmit = async (data) => {
    const { email, password, username } = data
    setLoading(true);
    let result = await postApi(postUserSignup(email, password, username));
    setLoading(false);

    if (result) {
      localStorage.setItem("registerEmail", JSON.stringify(email));
      successToast("Account successfully created");
      close();
      navigate("/email-confirmation");
    }
  };

  const formSchema = Yup.object().shape({
    username: Yup.string().matches(/^[A-Za-z0-9_]*$/, "Username can contain letters (a-z), numbers (0-9) and underscores.").required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(8, "Your password must be at least 8 characters.").required('Required'),
    repassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required')
  });

  return (
    <Formik
      initialValues={{
        username: shopname || '',
        email: '',
        password: '',
        repassword: '',
      }}
      validationSchema={formSchema}
      onSubmit={onSubmit}
    >

      {({ errors, values, setFieldValue }) => (
        <Form>
          <Stack w="100%" h="100%" spacing="20px">
            <AppInput
              error={errors.username}
              name="username"
              isReadOnly={shopname && shopname.length}
              onChange={(e) => setFieldValue("username", e.target.value)}
              value={values.username}
            />
            <AppInput
              error={errors.email}
              name="email"
              onChange={(e) => setFieldValue("email", e.target.value)}
              value={values.email}
            />
            <AppInput
              type="password"
              name="password"
              error={errors.password}
              onChange={(e) => setFieldValue("password", e.target.value)}
              value={values.password}
            />
            <AppInput
              type="password"
              name="repassword"
              error={errors.repassword}
              onChange={(e) => setFieldValue("repassword", e.target.value)}
              value={values.repassword}
            />

            <BasicButton type="submit" isDisabled={loading}>
              Sign up
            </BasicButton>

            <BottomText onClick={switchToggle}>
              Already have an account? <a>Sign in</a> now
            </BottomText>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
