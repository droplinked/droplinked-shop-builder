import { Badge, Box, Flex, HStack, Text } from '@chakra-ui/react';
import DotSeparatedList from 'components/redesign/dot-separated-list/DotSeparatedList';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import React from 'react';
import { BillingOption } from '../hooks/useBillingOptions';
import { PricingDisplay } from './PricingDisplay';
import useOnboardingStore from 'pages/onboarding/stores/useOnboardingStore';

interface BillingOptionCardProps {
  option: BillingOption;
  onSelect?: (option: BillingOption) => void;
}

export function BillingOptionCard({ option, onSelect }: BillingOptionCardProps) {
  const { t } = useLocaleResources('common');
  const { shopSetupUI } = useOnboardingStore();

  const handleClick = () => {
    if (onSelect) {
      onSelect(option);
    }
  };

  return (
    <Box
      p={4}
      bg={option.isSelected ? `#2BCFA11A` : 'transparent'}
      borderRadius="lg"
      border="1px solid"
      borderColor={option.isSelected ? 'main.primary' : 'neutral.gray.800'}
      display="flex"
      alignItems="center"
      gap={4}
      w="100%"
      cursor={onSelect ? 'pointer' : 'default'}
      onClick={handleClick}
      _hover={onSelect ? { 
        borderColor: 'main.primary',
        bg: option.isSelected ? `#2BCFA11A` : 'rgba(43, 207, 161, 0.05)'
      } : {}}
      transition="all 0.2s"
    >
      <Flex direction="column" gap={1} flex={1}>
        <HStack gap={2}>
          <Text
            color={option.isSelected ? 'main.primary' : 'neutral.white'}
            fontSize="base"
            fontWeight={option.isSelected ? 'medium' : 'normal'}
          >
            {option.name}
          </Text>
          {option.discount && (
            <Badge px={2} bg={`#2BCFA11A`} borderRadius="full">
              <Text color="main.primary" fontSize="sm" fontWeight="normal">
                {option.discount}
              </Text>
            </Badge>
          )}
        </HStack>

        <DotSeparatedList>
          <Text color="neutral.gray.500" fontSize="xs" fontWeight="normal">
           { shopSetupUI.isFromCrossmint
              ? t('UpgradePlanModal.BillingOptionCard.threeMonthFree')
              : option.showFree
              ? t('UpgradePlanModal.BillingOptionCard.firstMonthFree') 
              : `${option.month} ${t('UpgradePlanModal.BillingOptionCard.months')}`
            }
          </Text>
          <Text color="neutral.gray.500" fontSize="xs" fontWeight="normal">
            {`$${option.finalPrice}${t('UpgradePlanModal.BillingOptionCard.monthAfterwards')}`}
          </Text>
        </DotSeparatedList>
      </Flex>

      <PricingDisplay
        plan={option.plan}
        showFree={option.showFree || false}
        planDuration={option.month}
      />
    </Box>
  );
} 