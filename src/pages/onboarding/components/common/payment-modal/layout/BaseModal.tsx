import AppModal from 'components/redesign/modal/AppModal'
import React from 'react'
import PaymentContent from './PaymentContent'

const BaseModal = ({ isOpen, onClose, planDetail, clientSecret }) => {

  return (
    <AppModal modalRootProps={{ isOpen, onClose, size: '6xl', isCentered: true }} modalContentProps={{ background: '#1C1C1C', paddingBlock: '0' }}>
      <PaymentContent onClose={onClose} planDetail={planDetail} isDrawer={undefined} clientSecret={clientSecret} />
    </AppModal>
  );
};

export default BaseModal;


