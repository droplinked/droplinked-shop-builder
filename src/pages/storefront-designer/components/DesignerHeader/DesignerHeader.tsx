import { Flex } from '@chakra-ui/react';
import { ChevronleftMd } from 'assets/icons/Navigation/ChevronLeft/ChevronleftMd';
import AppButton from 'components/redesign/button/AppButton';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import DeviceViewSelector from './DeviceViewSelector';
import StoreDesignActions from './StoreDesignActions';

/**
 * Header component for the storefront designer
 */
function DesignerHeader(): React.ReactElement {
  const navigate = useNavigate();

  return (
    <Flex
      width="100%"
      height="auto"
      position="sticky"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      top="75px"
      zIndex={1}
      paddingX={8}
      paddingY={4}
      bg="neutral.background"
      borderBottom="1px solid"
      borderColor="neutral.gray.800"
    >
      <AppButton variant="normal" color="neutral.white" leftIcon={<ChevronleftMd />} _hover="none" _pressed="none" onClick={() => navigate('/analytics/dashboard')}>
        back to dashboard
      </AppButton>
      <DeviceViewSelector />
      <StoreDesignActions />
    </Flex>
  );
}

export default DesignerHeader;
