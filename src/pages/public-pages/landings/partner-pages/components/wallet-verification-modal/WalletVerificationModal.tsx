import { ModalBody } from '@chakra-ui/react';
import AppModal from 'components/redesign/modal/AppModal';
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { usePartnerLanding } from '../../context/PartnerLandingContext';
import { useWalletVerificationContext, WalletVerificationProvider } from '../../context/WalletVerificationContext';
import ModalContent from './components/ModalContent';
import WalletStatusDisplay from './components/wallet-status-display/WalletStatusDisplay';
import { useWalletVerification } from './hooks/useWalletVerification';
interface WalletVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WalletVerificationModal = ({ isOpen, onClose }: WalletVerificationModalProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { trialMonths } = usePartnerLanding();
  const { connectWallet } = useWalletVerification();
  const { states: { currentStep }, methods: { updateStates } } = useWalletVerificationContext();

  const handleConnectWallet = async () => {
    await connectWallet();
  };

  const handleResetStep = () => {
    updateStates({ key: 'currentStep', value: 'connect' });
  };

  const handleClaimNow = () => {
    const d3Id = searchParams.get('d3-id');
    const udId = searchParams.get('ud-id');
    const baseId = searchParams.get('base-id');

    const newParams = new URLSearchParams();
    newParams.set('entry', 'signup');

    if (d3Id) newParams.set('d3-id', d3Id);
    if (udId) newParams.set('ud-id', udId);
    if (baseId) newParams.set('base-id', baseId);

    navigate(`/onboarding/?${newParams.toString()}`);
  };

  return (
    <WalletVerificationProvider>
      <AppModal
        modalRootProps={{ isOpen, onClose, size: '3xl', isCentered: true }}
        modalContentProps={{
          width: 'auto !important',
          padding: '0px !important'
        }}
      >
        <ModalBody
          display="flex"
          width={{ base: '360px', md: '625px' }}
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap="36px"
          padding={'0px !important'}
          paddingInline={'0px !important'}
          paddingBlock={'0px !important'}
          rounded="24px"
        >
          <WalletStatusDisplay
            variant={currentStep === 'error' ? 'red' : 'green'}
            isLoading={currentStep === 'loading'}
            icon={currentStep === 'done' ? 'tick' : 'wallet'}
          />

          <ModalContent
            currentStep={currentStep}
            trialMonths={trialMonths}
            onClose={onClose}
            onConnectWallet={handleConnectWallet}
            onResetStep={handleResetStep}
            onClaimNow={handleClaimNow}
          />
        </ModalBody>
      </AppModal>
    </WalletVerificationProvider>
  );
};

export default WalletVerificationModal;
