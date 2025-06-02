import { Box, Text } from '@chakra-ui/react';
import AppButton from 'components/redesign/button/AppButton';
import AppInput from 'components/redesign/input/AppInput';
import InteractiveText from 'components/redesign/interactive-text/InteractiveText';
import { Form, Formik } from 'formik';
import useOnboardingStore from 'pages/onboarding/stores/useOnboardingStore';
import { OnboardingStepProps } from 'pages/onboarding/types/onboarding';
import React from 'react';
import OnboardingStepHeader from '../common/OnboardingStepHeader';

function ResetPasswordForm({onNext }: OnboardingStepProps) {
  const { updateOnboardingState } = useOnboardingStore();

  const handleSubmit = async ({ email }) => {
    updateOnboardingState('credentials', { email, password: '' });
    updateOnboardingState('previousStep', 'RESET_PASSWORD');
    onNext();
  };

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
  );
}

export default ResetPasswordForm;
