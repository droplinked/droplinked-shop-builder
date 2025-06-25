import AppModal from 'components/redesign/modal/AppModal'
import React from 'react'
import PaymentContent from './PaymentContent'

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  planDetail: any;
  TrialMonths?: number;
  onSuccess?: () => void;
  successMessage?: string;
}

const BaseModal = ({ isOpen, onClose, planDetail, TrialMonths, onSuccess, successMessage }: BaseModalProps) => {

  return (
    <AppModal modalRootProps={{ isOpen, onClose, size: '6xl', isCentered: true }} modalContentProps={{ background: '#1C1C1C', paddingBlock: '0' }}>
      <PaymentContent 
        TrialMonths={TrialMonths}
        onClose={onClose} 
        planDetail={planDetail} 
        isDrawer={undefined}
        onSuccess={onSuccess}
        successMessage={successMessage}
      />
    </AppModal>
  );
};

export default BaseModal;


