import { Box, Flex, Text } from '@chakra-ui/react';
import { ChevrondownMd } from 'assets/icons/Navigation/ChevronDown/ChevrondownMd';
import { ChevronupMd } from 'assets/icons/Navigation/ChevronUp/ChevronupMd';
import { AvailableoutlinedSm } from 'assets/icons/Sign/AvailableOutlined/AvailableoutlinedSm';
import { getFeaturesWithInheritance } from 'pages/onboarding/utils/subscriptionPlan';
import React from 'react';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';

interface ProPlanFeaturesProps {
  isExpanded: boolean;
  isCrossmint: boolean;
  onToggleExpanded: () => void;
}

const ProPlanFeatures: React.FC<ProPlanFeaturesProps> = ({ isExpanded, isCrossmint, onToggleExpanded }) => {
  const { t } = useLocaleResources('common');

  return (
    <>
      {isExpanded && (
        <>
          <Box p={4}>
            {getFeaturesWithInheritance('BUSINESS', t).map((feature) => (
              <Flex key={feature} gap={2} mb={4} alignItems="center">
                <AvailableoutlinedSm color="white" />
                <Text textColor="neutral.white" flex={1} fontSize="sm">
                  {feature}
                </Text>
              </Flex>
            ))}
          </Box>

        </>
      )}
      {!isCrossmint && (
        <>
          <Box w="full" h="0" border="1px solid" borderColor="label.primary" />
        <Flex w="full" px={4} py={2} justify="center" alignItems="center" gap={1.5} onClick={onToggleExpanded}>
          <Text fontSize="sm" color="white" fontWeight="normal" lineHeight="tight">
            {isExpanded ? t('proPlan.features.less') : t('proPlan.features.more')}
          </Text>
          {isExpanded ? <ChevronupMd color='black' /> : <ChevrondownMd color='black' />}
        </Flex>
        </>
      )}
    </>
  );
};

export default ProPlanFeatures; 