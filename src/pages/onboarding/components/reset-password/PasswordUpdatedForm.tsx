import AppButton from 'components/redesign/button/AppButton'
import useOnboardingStore from 'pages/onboarding/stores/useOnboardingStore'
import React from 'react'
import OnboardingStepHeader from '../common/OnboardingStepHeader'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

function PasswordUpdatedForm() {
  const { updateOnboardingState } = useOnboardingStore()
  const { t } = useLocaleResources('onboarding');

  const handleSignIn = () => updateOnboardingState('currentStep', 'SIGN_IN')

  return (
    <>
      <OnboardingStepHeader
        heading={t('resetPassword.passwordUpdated.title')}
        description={t('resetPassword.passwordUpdated.description')}
      />

      <AppButton onClick={handleSignIn}>
        {t('resetPassword.passwordUpdated.signInButton')}
      </AppButton>
    </>
  )
}

export default PasswordUpdatedForm