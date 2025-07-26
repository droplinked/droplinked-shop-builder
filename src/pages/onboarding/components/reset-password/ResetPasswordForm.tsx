import { Flex } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import AppInput from 'components/redesign/input/AppInput'
import { Form, Formik } from 'formik'
import useAppToast from 'hooks/toast/useToast'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import useOnboardingStore from 'pages/onboarding/stores/useOnboardingStore'
import React from 'react'
import { forgetPasswordService } from 'services/auth/services'
import * as Yup from 'yup'
import AuthRedirectLink from '../common/AuthRedirectLink'
import OnboardingStepHeader from '../common/OnboardingStepHeader'

function ResetPasswordForm() {
  const { updateOnboardingState } = useOnboardingStore()
  const { showToast } = useAppToast()
  const { t } = useLocaleResources('onboarding')

  const formSchema = Yup.object().shape({
    email: Yup.string()
      .email(t('ResetPasswordForm.validation.emailInvalid'))
      .required(t('ResetPasswordForm.validation.emailRequired'))
  })

  const handleSubmit = async ({ email }) => {
    try {
      await forgetPasswordService({ email })
      updateOnboardingState('credentials', { email, password: '' })
      showToast({ type: "success", message: t('ResetPasswordForm.success.emailSent') })
      updateOnboardingState('currentStep', 'RESET_PASSWORD_VERIFICATION')
    } catch (error) {
      showToast({ type: "error", message: error?.response?.data?.message || t('ResetPasswordForm.errors.emailSendFailed') })
    }
  }

  return (
    <>
      <OnboardingStepHeader
        heading={t('ResetPasswordForm.title')}
        description={t('ResetPasswordForm.description')}
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
              label={t('ResetPasswordForm.form.emailLabel')}
              inputProps={{
                name: 'email',
                value: values.email,
                onChange: handleChange,
                placeholder: t('ResetPasswordForm.form.emailPlaceholder')
              }}
              message={errors.email?.toString()}
            />

            <AppButton type="submit" marginTop={3} isLoading={isSubmitting}>
              {t('common:continue')}
            </AppButton>

            <Flex direction="column" gap={2}>
              <AuthRedirectLink
                text={t('ResetPasswordForm.links.rememberPassword')}
                action={() => updateOnboardingState('currentStep', 'SIGN_IN')}
                linkText={t('ResetPasswordForm.links.signIn')}
              />

              <AuthRedirectLink
                text={t('ResetPasswordForm.links.noAccount')}
                action={() => updateOnboardingState('currentStep', 'SIGN_UP')}
                linkText={t('ResetPasswordForm.links.createAccount')}
              />
            </Flex>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default ResetPasswordForm