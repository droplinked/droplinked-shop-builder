import { Box, Flex, Text, useDisclosure } from '@chakra-ui/react';
import { AILg } from 'assets/icons/AI';
import { ChevronupLg } from 'assets/icons/Navigation/ChevronUp/ChevronupLg';
import { SuitcaseSm } from 'assets/icons/System/SuitCase/SuitcaseSm';
import ProTrialModal from 'components/modals/pro-plan-upgrade-modal/ProPlanUpgradeModal';
import AppButton from 'components/redesign/button/AppButton';
import DotSeparatedList from 'components/redesign/dot-separated-list/DotSeparatedList';
import IconWrapper from 'components/redesign/icon-wrapper/IconWrapper';
import AppSelect from 'components/redesign/select/AppSelect';
import Textarea from 'components/redesign/textarea/Textarea';
import { getCategories } from 'pages/onboarding/constants/categories';
import useOnboardingStore from 'pages/onboarding/stores/useOnboardingStore';
import React, { useState } from 'react';
import useAppStore from 'stores/app/appStore';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import { useAiGeneratedContent } from '../../../hooks/useAiGeneratedContent';

function AICard() {
  const [isOpen, setIsOpen] = useState(false);
  const { isOpen: isProTrialModalOpen, onOpen: openProTrialModal, onClose: closeProTrialModal } = useDisclosure();
  const { shopSetupUI, updateShopSetupUI } = useOnboardingStore();
  const { generateAllContent, isLoading } = useAiGeneratedContent();
  const { hasPaidSubscription } = useAppStore();
  const { t } = useLocaleResources('onboarding');

  const categories = getCategories(t);

  // Check if any content is currently being generated
  const isGenerating = Object.values(isLoading).every((value) => value === true);

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleChange = (key: string, value: string) => {
    if (key === 'businessDescribe') {
      updateShopSetupUI('businessDescription', value);
    } else if (key === 'businessCategory') {
      updateShopSetupUI('businessCategory', value);
    }
  };

  const handleGenerateWithAI = () => {
    const hasValidSubscription = hasPaidSubscription();

    if (hasValidSubscription) {
      // User has a valid subscription (Pro, Premium, or Enterprise), generate content
      generateAllContent();
    } else {
      // User has no subscription or has STARTER plan, show pro trial modal
      openProTrialModal();
    }
  };

  const handleCloseProTrialModal = () => {
    closeProTrialModal();
  };

  return (
    <Box
      bg={isOpen ? 'transparent' : 'label.primary'}
      borderRadius="2xl"
      border="1px"
      borderColor={isOpen ? 'neutral.gray.800' : 'label.primary'}
      display="inline-flex"
      flexDir="column"
      overflow="hidden"
    >
      {/* Header */}
      <Flex
        p={4}
        justifyContent="space-between"
        alignItems="center"
        borderBottom={isOpen ? '1px' : 'none'}
        borderColor={isOpen ? 'neutral.gray.800' : 'label.primary'}
        cursor="pointer"
        onClick={toggleOpen}
        transition="border-bottom 0.3s ease"
      >
        <Flex gap={3}>
          <IconWrapper
            bg={isOpen ? 'transparent' : 'label.primary'}
            borderColor={isOpen ? 'neutral.gray.800' : 'label.primary'}
            icon={<AILg color={isOpen ? 'white' : '#2BCFA1'} />}
          />
          <Flex flexDir="column" gap="2px">
            <DotSeparatedList>
              <Text color="white" fontWeight="medium">
                {t('AICard.title')}
              </Text>
              <Flex alignItems="center" gap={1}>
                <SuitcaseSm color="#2BCFA1" />
                <Text color="main.primary" fontSize="sm">
                  {t('AICard.proFeature')}
                </Text>
              </Flex>
            </DotSeparatedList>
            <Text color="text.subtext.placeholder.dark" fontSize="sm">
              {t('AICard.subtitle')}
            </Text>
          </Flex>
        </Flex>
        <Box transform={isOpen ? 'rotate(0deg)' : 'rotate(180deg)'} transition="transform 0.3s ease">
          <ChevronupLg color="white" />
        </Box>
      </Flex>

      {/* Content */}
      <Box maxHeight={isOpen ? '500px' : '0px'} opacity={isOpen ? 1 : 0} overflow="hidden" transition="all 0.3s ease-in-out">
        <Box p={4} display="flex" flexDir="column" gap={6}>
          <Textarea
            label={t('AICard.businessDescribe.label')}
            fontFamily="14px"
            isRequired
            placeholder={t('AICard.businessDescribe.placeholder')}
            value={shopSetupUI.businessDescription}
            onChange={(e) => handleChange('businessDescribe', e.target.value)}
          />

          <AppSelect
            label={t('AICard.businessCategory.label')}
            isRequired
            items={categories}
            valueAccessor="id"
            labelAccessor="name"
            selectProps={{
              placeholder: t('AICard.businessCategory.placeholder'),
              value: shopSetupUI.businessCategory,
              onChange: (e) => handleChange('businessCategory', e.target.value)
            }}
          />

          <AppButton size="lg" onClick={handleGenerateWithAI} isLoading={isGenerating} isDisabled={isGenerating}>
            {t('AICard.generateButton')}
          </AppButton>
        </Box>
      </Box>

      <ProTrialModal isOpen={isProTrialModalOpen} onClose={handleCloseProTrialModal} />
    </Box>
  );
}

export default AICard;
