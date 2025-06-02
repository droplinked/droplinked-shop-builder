import AppButton from 'components/redesign/button/AppButton';
import useOnboardingStore from 'pages/onboarding/stores/useOnboardingStore';
import React from 'react';
import OnboardingStepHeader from '../common/OnboardingStepHeader';

function PasswordUpdatedForm() {
  const { updateOnboardingState } = useOnboardingStore();

  const handleSignIn = () => {
    updateOnboardingState('currentStep', 'SIGN_IN');
  };

  return (
    <>
      <OnboardingStepHeader heading="Password Updated!" description="Your password has been reset successfully. You can now log in." />

      <AppButton size="lg" onClick={handleSignIn}>
        Sign In
      </AppButton>
    </>
  );
}

export default PasswordUpdatedForm;
