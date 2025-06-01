import { Box, Text, VStack } from '@chakra-ui/react';
import { ArrowrightMd } from 'assets/icons/Navigation/ArrowRight/ArrowrightMd';
import AppButton from 'components/redesign/button/AppButton';
import useLocaleResources from '../../../../hooks/useLocaleResources/useLocaleResources';
import Lottie from 'lottie-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimationData } from './mobileDeviceAnimation';
import localEn from '../../../../locales/storefront/en.json';
import localAr from '../../../../locales/storefront/ar.json';

/**
 * Mobile message that informs users the storefront designer
 * is best viewed on desktop
 */
function MobileMessage(): React.ReactElement {
  const navigate = useNavigate();
  const { t } = useLocaleResources('storefront', { en: localEn, ar: localAr });

  return (
    <Box
      width="384px"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      padding={4}
      gap={9}
      overflow="hidden"
    >
      <Lottie animationData={AnimationData} loop={false} />

      <VStack width="100%" alignItems="center" spacing={4}>
        <VStack width="100%" alignItems="center" spacing={2}>
          <Text
            width="100%"
            fontSize="lg"
            fontWeight="bold"
            lineHeight="1.75rem"
            color="text.white"
            textAlign="center"
          >
            {t('mobileMessage.title')}
          </Text>

          <Text
            width="100%"
            fontSize="sm"
            fontWeight="normal"
            lineHeight="tight"
            color="text.subtext.placeholder.light"
            textAlign="center"
          >
            {t('mobileMessage.description')}
          </Text>
        </VStack>

        <AppButton
          variant="normal"
          color="text.primary"
          rightIcon={<ArrowrightMd />}
          onClick={() => navigate('/analytics/dashboard')}
        >
          {t('mobileMessage.dashboardButton')}
        </AppButton>
      </VStack>
    </Box>
  );
}

export default MobileMessage;
