import Drawer from 'components/common/Drawer/Drawer';
import React from 'react';
import PaymentContent from './PaymentContent';

const PaymentDrawer = ({ isOpen, onClose, planDetail }) => {


  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      drawerContentStyle={{
        borderTopRadius: 16
      }}
      drawerHeaderStyle={{
        padding: { base: 4, md: '48px' }
      }}
      placement="bottom"
      showSubmitButtons
      discardButtonText="Close"
      saveButtonText={` Get ${planDetail.title} Plan (Free Trial)`}
      drawerFooterProps={{
        padding: { base: 4, md: '24px 48px' },
        background: '#1C1C1C',
        justifyContent: { base: 'center', md: 'space-between' },
        gap: 4,
        width: '100%'
      }}
      saveButtonProps={{
        width: { base: '100%', md: 'auto' }
      }}
      title="Credit card information"
      description="Choose a credit card on file or add a new one."
    >
      <PaymentContent
        onClose={onClose}
        onSubmit={() => {}}
        planDetail={planDetail}
        isDrawer
      />
    </Drawer>
  );
};

export default PaymentDrawer; 