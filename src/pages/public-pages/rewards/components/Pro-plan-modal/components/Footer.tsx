import { Image, Text, VStack } from '@chakra-ui/react';
import BasicButton from 'components/common/BasicButton/BasicButton';
import React from 'react';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import localEn from 'locales/rewards/en.json';
import localAr from 'locales/rewards/ar.json';

interface Props {
  isLoading: boolean;
  handleButtonClick: () => void;
}

const ModalFooter = ({ isLoading, handleButtonClick }: Props) => {
  const { t } = useLocaleResources('rewards', { en: localEn, ar: localAr });

  return (
    <VStack p={6} spacing={6} align="start">
      <Image src="/assets/images/rewards/modal-footer-bg.png" w="100%" h="100%" objectFit="cover" position="absolute" />
      <Text fontSize="sm" color="white" textAlign="center">
        {t('proPlanModal.footer.warning')}
      </Text>
      <BasicButton bg="#2bcea1" color="black" size="lg" w="full" onClick={handleButtonClick} isLoading={isLoading}>
        {t('proPlanModal.footer.buttonText')}
      </BasicButton>
    </VStack>
  );
};

export default ModalFooter;
