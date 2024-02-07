import { Box, Flex, VStack } from "@chakra-ui/react";
import BasicButton from 'components/common/BasicButton/BasicButton';
import AppInput from 'components/common/form/textbox/AppInput';
import AppTypography from 'components/common/typography/AppTypography';
import ShowPassword from "components/modals/signup-modal/signup-producer/parts/showPassword/ShowPassword";
import { Form, Formik } from "formik";
import useAppToast from "functions/hooks/toast/useToast";
import { IchangePasswordService } from "lib/apis/user/interfaces";
import { changePasswordService } from "lib/apis/user/services";
import { passwordRegex } from "lib/utils/heper/regex";
import AppErrors from "lib/utils/statics/errors/errors";
import React, { useCallback, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from 'yup';
import "./ResetPassPage-style.scss";

export default function ResetPassPage() {
  const { mutateAsync, isLoading } = useMutation((params: IchangePasswordService) => changePasswordService(params))
  const { showToast } = useAppToast()
  const [States, setStates] = useState({
    show: {
      password: false,
      repassword: false
    }
  })
  let navigate = useNavigate();
  let token = useParams().token;

  const toggleShowField = useCallback((field: any) => setStates(prev => ({ ...prev, show: { ...prev.show, [field]: !prev.show[field] } })), [])

  const onSubmit = async (data) => {
    try {
      await mutateAsync({ accountRecoveryToken: token, newPassword: data.password })
      showToast({
        message: "Confirmation email sent! Please check your inbox and follow the instructions to reset your account password.",
        type: "success"
      });
      navigate("/?modal=login");
    } catch (error) {
      showToast({ message: error?.response?.data?.data?.message || error?.message, type: 'error' })
    }
  };

  const formSchema = Yup.object().shape({
    password: Yup.string().matches(passwordRegex, AppErrors.signup.password_requirements_not_met).required('Required'),
    repassword: Yup.string().oneOf([Yup.ref('password'), null], AppErrors.signup.when_the_password_and_confirmed).required('Required')
  });

  return (
    <Formik
      initialValues={{
        password: '',
        repassword: '',
      }}
      validateOnChange={false}
      validationSchema={formSchema}
      onSubmit={onSubmit}
    >

      {({ errors, values, setFieldValue }) => (
        <Form>
          <Flex justifyContent={"center"} padding="100px 0" margin="60px 0">
            <VStack align={"stretch"} spacing={6} color="#FFF" maxWidth="500px">
              <AppTypography fontSize="20px" fontWeight="bold" textAlign="center">Change Password</AppTypography>
              <AppTypography fontSize="16px" textAlign="center">Please enter the email address you’ve been registered for your store, we will send you an email to help you change your password</AppTypography>
              <Box position={"relative"}>
                <AppInput
                  type={States.show.password ? "text" : "password"}
                  name="password"
                  placeholder="New password"
                  backgroundColor="#1C1C1C"
                  _hover={{ backgroundColor: "#1C1C1C" }}
                  _focus={{ backgroundColor: "#1C1C1C" }}
                  error={errors?.password ? errors.password.toString() : ""}
                  onChange={(e) => setFieldValue("password", e.target.value)}
                  value={values.password}
                />
                <ShowPassword showed={States.show.password} onClick={() => toggleShowField("password")} />
              </Box>
              <Box position={"relative"}>
                <AppInput
                  type={States.show.repassword ? "text" : "password"}
                  name="repassword"
                  placeholder="Confirm Password"
                  backgroundColor="#1C1C1C"
                  _hover={{ backgroundColor: "#1C1C1C" }}
                  _focus={{ backgroundColor: "#1C1C1C" }}
                  error={errors?.repassword ? errors.repassword.toString() : ""}
                  onChange={(e) => setFieldValue("repassword", e.target.value)}
                  value={values.repassword}
                />
                <ShowPassword showed={States.show.repassword} onClick={() => toggleShowField("repassword")} />
              </Box>
              <BasicButton type="submit" isLoading={isLoading}>Save</BasicButton>
            </VStack>
          </Flex>
        </Form>
      )}
    </Formik>
  );
}
