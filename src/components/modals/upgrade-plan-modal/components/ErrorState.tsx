import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';

interface ErrorStateProps {
  error: string;
  isDrawer?: boolean;
}

export function ErrorState({ error, isDrawer = false }: ErrorStateProps) {
  const { t } = useLocaleResources('common');
  
  return (
    <Box
      w="100%"
      minHeight={isDrawer ? 'auto' : '432px'}
      p={12}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Text color="red.500" fontSize="base">
        {t('UpgradePlanModal.ErrorState.errorLoadingPlans', { error })}
      </Text>
    </Box>
  );
}