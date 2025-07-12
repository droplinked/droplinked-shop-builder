import { ModalFooter } from '@chakra-ui/react';
import AppButton, { AppButtonProps } from 'components/redesign/button/AppButton';
import AppModal from 'components/redesign/modal/AppModal';
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData';
import { WarningLg } from 'assets/icons/Sign/Warning/WarningLg';
import React from 'react';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';

interface RemoveConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  type: string;
  isLoading?: boolean;
}

const RemoveConfirmationModal: React.FC<RemoveConfirmationModalProps> = ({ isOpen, onClose, onConfirm, type, isLoading = false }) => {
  const { t } = useLocaleResources('onboarding');
  // Remove the last character from type for display
  const displayType = type.slice(0, -1);
  
  const confirmButtonProps: AppButtonProps = {
    bgColor: 'system.error',
    color: 'white',
    onClick: onConfirm,
    isLoading,
    isDisabled: isLoading,
    _hover: 'none'
  };

  return (
    <AppModal modalRootProps={{ isOpen, onClose, size: 'xl', isCentered: true }} modalContentProps={{ width: '600px', gap: 0, paddingBlock: 0, bg: '#141414' }}>
      <ModalHeaderData
        icon={<WarningLg />}
        title={t('shopSetup.uploads.removeConfirmation.title', { type: displayType })}
        description={t('shopSetup.uploads.removeConfirmation.description', { type: displayType })}
        modalHeaderProps={{
          bgColor: '#141414',
          paddingBlock: { lg: '48px !important', md: '32px !important', base: '16px !important' },
          paddingBottom: { lg: '36px !important', md: '32px !important', base: '16px !important' }
        }}
        descriptionProps={{
          color: 'text.subtext.placeholder.light !important'
        }}
      />

      <ModalFooter display="flex" gap={6} mb="8">
        <AppButton flex={1} variant="secondary" isDisabled={isLoading} onClick={onClose}>
          {t('shopSetup.uploads.removeConfirmation.keepButton')}
        </AppButton>
        <AppButton flex={1} isLoading={isLoading} isDisabled={isLoading} {...confirmButtonProps}>
          {t('shopSetup.uploads.removeConfirmation.replaceButton', { type: displayType })}
        </AppButton>
      </ModalFooter>
    </AppModal>
  );
};

export default RemoveConfirmationModal;
