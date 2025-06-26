import React from 'react';
import Drawer from 'components/common/Drawer/Drawer';
import PaymentContent from './PaymentContent';

interface PaymentDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  planDetail: any;
  TrialMonths?: number;
  onSuccess?: () => void;
  successMessage?: string;
}

const PaymentDrawer = ({ isOpen, onClose, planDetail, TrialMonths, onSuccess, successMessage }: PaymentDrawerProps) => {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      drawerContentStyle={{ borderTopRadius: 16 }}
      drawerHeaderStyle={{ padding: { base: 4, md: '48px' } }}
      placement="bottom"
      showSubmitButtons={true}
      saveButtonText={`Get ${planDetail.title}`}
      discardButtonText="Cancel"
      saveButtonProps={{ variant: 'filled' }}
      discardButtonProps={{ variant: 'secondary' }}
      title="Credit card information"
      description="Choose a credit card on file or add a new one."
    >
      <PaymentContent 
        isDrawer 
        onClose={onClose} 
        planDetail={planDetail}
        TrialMonths={TrialMonths}
        onSuccess={onSuccess}
        successMessage={successMessage}
      />
    </Drawer>
  );
};

export default PaymentDrawer; 