import { useMediaQuery } from '@chakra-ui/react'
import { useShopSetupSubmit } from 'pages/onboarding/hooks/useShopSetupSubmit'
import useOnboardingStore from 'pages/onboarding/stores/useOnboardingStore'
import React from 'react'
import ControlButtons from '../common/ControlButtons'
import OnboardingStepHeader from '../common/OnboardingStepHeader'
import ShopPreview from '../shop-preview/ShopPreview'
import AICard from './ai/AICard'
import AutoPopulateSampleProductsToggle from './inputs/AutoPopulateSampleProductsToggle'
import DescriptionField from './inputs/DescriptionField'
import ExistingShopUrlProcessor from './inputs/ExistingShopUrlProcessor'
import NameField from './inputs/NameField'
import UrlChooser from './inputs/UrlChooser'
import CoverImage from './uploads/CoverImage'
import LogoUploader from './uploads/LogoUploader'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

function ShopSetupForm() {
  const [isSmallerThan1024] = useMediaQuery('(max-width: 1024px)')
  const { handleSubmit, isLoading } = useShopSetupSubmit()
  const { shopSetupUI: { hasExistingShop }, updateOnboardingState } = useOnboardingStore()
  const { t } = useLocaleResources('onboarding')

  const handleBack = () => updateOnboardingState("currentStep", "EXISTING_WEBSITE")

  return (
    <>
      <OnboardingStepHeader
        heading={t('common.shop.details')}
        description="Complete the information below to optimize your storefront."
      />
      {hasExistingShop ? <ExistingShopUrlProcessor /> : <AICard />}
      <LogoUploader />
      <CoverImage />
      <UrlChooser />
      <NameField />
      <DescriptionField />
      <AutoPopulateSampleProductsToggle />
      <ControlButtons onBack={handleBack} onSubmit={handleSubmit} isLoading={isLoading} />
      {isSmallerThan1024 && <ShopPreview />}
    </>
  )
}

export default ShopSetupForm