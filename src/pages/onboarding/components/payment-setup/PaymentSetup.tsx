import { Flex } from '@chakra-ui/react'
import { OnboardingStepProps } from 'pages/onboarding/types/onboarding'
import React, { useState } from 'react'
import ControlButtons from '../common/ControlButtons'
import CurrencySection from './CurrencySection'
import FinancialServices from './FinancialServices'
import OnboardingStepHeader from '../common/OnboardingStepHeader'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import arLocale from 'locales/onboarding/ar.json'
import enLocale from 'locales/onboarding/en.json'

function PaymentSetup({ onBack, onNext }: Pick<OnboardingStepProps, "onBack" | "onNext">) {
  const [isLoading, setIsLoading] = useState(false)
  const { t } = useLocaleResources('onboarding', {
    en: enLocale,
    ar: arLocale
  })

  const handleCurrencyLoading = (loading: boolean) => {
    setIsLoading(loading)
  }

  return (
    <>
      <OnboardingStepHeader 
        heading={t('paymentSetup.title')} 
        description={t('paymentSetup.subtitle')} 
      />
      <Flex direction="column" minH="calc(100vh - 250px)" gap="36px">
        <FinancialServices />
        <CurrencySection onLoadingChange={handleCurrencyLoading} />
        <ControlButtons 
          onBack={onBack} 
          onSubmit={onNext} 
          onSkip={onNext} 
          showBackButton={false} 
          isLoading={isLoading}
        />
      </Flex>
    </>
  )
}

export default PaymentSetup
