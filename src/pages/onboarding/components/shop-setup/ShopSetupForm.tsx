import { Flex, useMediaQuery } from '@chakra-ui/react';
import { useShopSetupSubmit } from 'pages/onboarding/hooks/useShopSetupSubmit';
import React from 'react';
import useAppStore from 'stores/app/appStore';
import ControlButtons from '../common/ControlButtons';
import OnboardingStepHeader from '../common/OnboardingStepHeader';
import ShopPreview from '../shop-preview/ShopPreview';
import AICard from './ai/AICard';
import AutoPopulateSampleProductsToggle from './inputs/AutoPopulateSampleProductsToggle';
import CoverImage from './uploads/CoverImage';
import DescriptionField from './inputs/DescriptionField';
import ExistingShopUrlProcessor from './inputs/ExistingShopUrlProcessor';
import LogoUploader from './uploads/LogoUploader';
import NameField from './inputs/NameField';
import UrlChooser from './inputs/UrlChooser';

function ShopSetupForm() {
  const [isSmallerThan1024] = useMediaQuery('(max-width: 1024px)');
  const { reset } = useAppStore();
  const { handleSubmit, isLoading, resetOnboarding } = useShopSetupSubmit();

  const handleBack = () => {
    reset();
    resetOnboarding();
  };

  return (
    <>
      <Flex flexDirection={{ base: 'column', md: 'row' }} justifyContent="space-between" gap={4}>
        <OnboardingStepHeader heading="Account Details" description="Complete the information below to optimize your storefront." />
      </Flex>
      <ExistingShopUrlProcessor />
      <AICard />
      <LogoUploader />
      <CoverImage />
      <UrlChooser />
      <NameField />
      <DescriptionField />
      <AutoPopulateSampleProductsToggle />
      <ControlButtons onBack={handleBack} onSubmit={handleSubmit} isLoading={isLoading} backText="Exit" />
      {isSmallerThan1024 && <ShopPreview />}
    </>
  );
}

export default ShopSetupForm;
