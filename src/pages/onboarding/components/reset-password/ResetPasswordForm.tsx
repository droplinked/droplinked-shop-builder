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
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import arLocale from 'locales/onboarding/ar.json'
import enLocale from 'locales/onboarding/en.json'


function ResetPasswordForm() {
  const { updateOnboardingState } = useOnboardingStore()
  const { showToast } = useAppToast()
  const { t } = useLocaleResources('onboarding', {
    en: enLocale,
    ar: arLocale
} );

  const formSchema = Yup.object().shape({
    email: Yup.string()
      .email(t('resetPassword.validation.emailInvalid'))
      .required(t('resetPassword.validation.emailRequired'))
  })

  const handleSubmit = async ({ email }) => {
    try {
      await forgetPasswordService({ email })
      updateOnboardingState('credentials', { email, password: '' })
      showToast({ type: "success", message: t('resetPassword.success.emailSent') })
      updateOnboardingState('currentStep', 'RESET_PASSWORD_VERIFICATION')
    } catch (error) {
      showToast({ type: "error", message: error?.response?.data?.message || t('resetPassword.errors.emailSendFailed') })
    }
  }

  return (
    <>
      <OnboardingStepHeader
        heading={t('resetPassword.title')}
        description={t('resetPassword.description')}
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
              label={t('resetPassword.form.emailLabel')}
              inputProps={{
                name: 'email',
                value: values.email,
                onChange: handleChange,
                placeholder: t('resetPassword.form.emailPlaceholder')
              }}
              message={errors.email?.toString()}
            />

            <AppButton type="submit" marginTop={3} isLoading={isSubmitting}>
              {t('resetPassword.form.continueButton')}
            </AppButton>

            <Flex direction="column" gap={2}>
              <AuthRedirectLink
                text={t('resetPassword.links.rememberPassword')}
                action={() => updateOnboardingState('currentStep', 'SIGN_IN')}
                linkText={t('resetPassword.links.signIn')}
              />

              <AuthRedirectLink
                text={t('resetPassword.links.noAccount')}
                action={() => updateOnboardingState('currentStep', 'SIGN_UP')}
                linkText={t('resetPassword.links.createAccount')}
              />
            </Flex>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default ResetPasswordForm