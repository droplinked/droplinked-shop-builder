import React from 'react';
import { Flex } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import { StepsType } from '../../../context/WalletVerificationContext';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import { usePartnerLanding } from '../../../context/PartnerLandingContext';

interface ModalHeaderProps {
  currentStep: StepsType;
  trialMonths: number;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ currentStep, trialMonths }) => {
  const { t } = useLocaleResources('public-pages/landings/partner-pages');
  const { partnerId } = usePartnerLanding();

  const isBase = partnerId === 'base';

  const getStepContent = () => {
    // Check if base-specific content exists for this step
    const hasBaseContent = isBase && ['connect', 'done'].includes(currentStep);
    
    if (hasBaseContent) {
      const titleKey = `ModalHeader.${currentStep}.base.title`;
      const descriptionKey = `ModalHeader.${currentStep}.base.description`;
      
      return {
        title: t(titleKey),
        description: t(descriptionKey)
      };
    }

    // Default content for all other cases
    const titleKey = `ModalHeader.${currentStep}.title`;
    const descriptionKey = `ModalHeader.${currentStep}.description`;

    return {
      title: t(titleKey, { trialMonths }),
      description: t(descriptionKey, { trialMonths })
    };
  };

  const { title, description } = getStepContent();

  return (
    <Flex
      flexDirection="column"
      alignItems="flex-start"
      gap="24px"
      alignSelf="stretch"
    >
      <AppTypography
        color="#FFF"
        fontSize={{ base: '18px', md: '24px' }}
        fontWeight="700"
      >
        {title}
      </AppTypography>
      <AppTypography
        color="#B1B1B1"
        fontSize={{ base: '14px', md: '16px' }}
        fontWeight="400"
      >
        {description}
      </AppTypography>
    </Flex>
  );
};

export default ModalHeader; 