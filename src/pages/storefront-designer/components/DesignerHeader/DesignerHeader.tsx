import { Flex } from '@chakra-ui/react';
import { ChevronleftMd } from 'assets/icons/Navigation/ChevronLeft/ChevronleftMd';
import AppButton from 'components/redesign/button/AppButton';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import DeviceViewSelector from './DeviceViewSelector';
import StoreDesignActions from './StoreDesignActions';
import localEn from 'locales/storefront-designer/en.json';
import localAr from 'locales/storefront-designer/ar.json';
import { ChevronrightMd } from 'assets/icons/Navigation/ChevronRight/ChevronrightMd';

/**
 * Header component for the storefront designer
 */
function DesignerHeader(): React.ReactElement {
  const navigate = useNavigate();
  const { t , isRTL  } = useLocaleResources('storefront-designer', { en: localEn, ar: localAr });

  return (
    <Flex
      width="100%"
      height="auto"
      position="sticky"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      top="0"
      zIndex={2}
      paddingX={8}
      paddingY={4}
      bg="neutral.background"
      borderBottom="1px solid"
      borderColor="neutral.gray.800"
    >
      <AppButton variant="normal" color="neutral.white" leftIcon={isRTL ? <ChevronrightMd /> : <ChevronleftMd />} _hover="none" _pressed="none" onClick={() => navigate('/analytics/dashboard')}>
        {t('DesignerHeader.backToDashboard')}
      </AppButton>
      <DeviceViewSelector />
      <StoreDesignActions />
    </Flex>
  );
}

export default DesignerHeader;
