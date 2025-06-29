import { Flex } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import AppInput from 'components/redesign/input/AppInput'
import { Form, Formik } from 'formik'
import useAppToast from 'hooks/toast/useToast'
import { forgetPasswordService } from 'services/auth/services'
import useOnboardingStore from 'pages/onboarding/stores/useOnboardingStore'
import React from 'react'
import * as Yup from 'yup'
import AuthRedirectLink from '../common/AuthRedirectLink'
import OnboardingStepHeader from '../common/OnboardingStepHeader'

const formSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address.")
    .required("Email address is required.")
})

function ResetPasswordForm() {
  const { updateOnboardingState } = useOnboardingStore()
  const { showToast } = useAppToast()

  const handleSubmit = async ({ email }) => {
    try {
      await forgetPasswordService({ email })
      updateOnboardingState('credentials', { email, password: '' })
      showToast({ type: "success", message: "Reset password email sent successfully" })
      updateOnboardingState('currentStep', 'RESET_PASSWORD_VERIFICATION')
    } catch (error) {
      showToast({ type: "error", message: error?.response?.data?.message || "Failed to send reset password email" })
    }
  }

  return (
    <>
      <OnboardingStepHeader
        heading="Reset Password"
        description="Enter the email linked to your account. We'll send you a verification code to reset your password."
      />

      <Formik
        initialValues={{ email: '' }}
        validateOnChange={false}
        validationSchema={formSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, handleChange, isSubmitting }) => (
          <Form style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <AppInput
              label="Email Address"
              inputProps={{
                name: 'email',
                value: values.email,
                onChange: handleChange,
                placeholder: 'Enter email address'
              }}
              message={errors.email?.toString()}
            />

            <AppButton type="submit" marginTop={3} isLoading={isSubmitting}>
              Continue
            </AppButton>

            <Flex direction="column" gap={2}>
              <AuthRedirectLink
                text="Remember your password?"
                action={() => updateOnboardingState('currentStep', 'SIGN_IN')}
                linkText="Sign In"
              />

              <AuthRedirectLink
                text="Don't have an account?"
                action={() => updateOnboardingState('currentStep', 'SIGN_UP')}
                linkText="Join us and create one!"
              />
            </Flex>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default ResetPasswordForm