import React from 'react';
import Drawer from 'components/common/Drawer/Drawer';
import PaymentContent from './PaymentContent';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';

interface PaymentDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  planDetail: any;
  TrialMonths?: number;
  onSuccess?: () => void;
  successMessage?: string;
}

const PaymentDrawer = ({ isOpen, onClose, planDetail, TrialMonths, onSuccess, successMessage }: PaymentDrawerProps) => {
  const { t } = useLocaleResources('subscription');
  
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      drawerContentStyle={{ borderTopRadius: 16 }}
      drawerHeaderStyle={{ padding: { base: 4, md: '48px' } }}
      placement="bottom"
      showSubmitButtons={true}
      saveButtonText={t('PaymentDrawer.saveButtonText', { planTitle: planDetail.title })}
      discardButtonText={t('common:cancel')}
      saveButtonProps={{ variant: 'filled' }}
      discardButtonProps={{ variant: 'secondary' }}
      title={t('PaymentDrawer.title')}
      description={t('PaymentDrawer.description')}
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