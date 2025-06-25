import { ModalFooter } from '@chakra-ui/react';
import AppButton, { AppButtonProps } from 'components/redesign/button/AppButton';
import AppModal from 'components/redesign/modal/AppModal';
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData';
import { WarningLg } from 'assets/icons/Sign/Warning/WarningLg';
import React from 'react';

interface RemoveConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  type: string;
  isLoading?: boolean;
}

const RemoveConfirmationModal: React.FC<RemoveConfirmationModalProps> = ({ isOpen, onClose, onConfirm, type, isLoading = false }) => {
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
        title={`Remove Current ${displayType}`}
        description={`You are about to remove the current ${displayType} in order to replace it. Are you sure you want to continue?`}
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
          No, Keep It
        </AppButton>
        <AppButton flex={1} isLoading={isLoading} isDisabled={isLoading} {...confirmButtonProps}>
          {`Yes, Replace ${displayType}`}
        </AppButton>
      </ModalFooter>
    </AppModal>
  );
};

export default RemoveConfirmationModal;
