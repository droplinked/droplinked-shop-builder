import { Box, Text } from '@chakra-ui/react';
import AppButton from 'components/redesign/button/AppButton';
import AppInput from 'components/redesign/input/AppInput';
import InteractiveText from 'components/redesign/interactive-text/InteractiveText';
import { Form, Formik } from 'formik';
import useAppToast from 'hooks/toast/useToast';
import { forgetPasswordService } from 'lib/apis/user/services';
import useOnboardingStore from 'pages/onboarding/stores/useOnboardingStore';
import { OnboardingStepProps } from 'pages/onboarding/types/onboarding';
import React from 'react';
import * as Yup from 'yup';
import OnboardingStepHeader from '../common/OnboardingStepHeader';

const formSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address.")
    .required("Email address is required.")
})

function ResetPasswordForm({ onNext }: OnboardingStepProps) {
  const { updateOnboardingState } = useOnboardingStore()
  const { showToast } = useAppToast()

  const handleSubmit = async ({ email }) => {
    try {
      await forgetPasswordService({ email })
      updateOnboardingState('credentials', { email, password: '' })
      showToast({ type: "success", message: "Reset password email sent successfully" })
      onNext()
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
        initialValues={{
          email: ''
        }}
        validateOnChange={false}
        validationSchema={formSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, handleChange, isSubmitting }) => (
          <Form style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
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

            <AppButton size="lg" type="submit" isLoading={isSubmitting}>
              Continue
            </AppButton>

            <Box display="flex" flexDirection="column" gap={2} mt={6}>
              <Text fontSize="14px" color="text.white" display="flex" gap={1}>
                Remember your password?
                <InteractiveText onClick={() => updateOnboardingState('currentStep', 'SIGN_IN')}>
                  Sign In
                </InteractiveText>
              </Text>
              <Text fontSize="14px" color="text.white" display="flex" gap={1}>
                Don't have an account?
                <InteractiveText onClick={() => updateOnboardingState('currentStep', 'SIGN_UP')}>
                  Join us and create one!
                </InteractiveText>
              </Text>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default ResetPasswordForm