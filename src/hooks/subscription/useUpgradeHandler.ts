import { useDisclosure } from '@chakra-ui/react';
import useAppToast from 'hooks/toast/useToast';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import useSubscription from './useSubscription';


const useUpgradeHandler = () => {
  
  const { shouldShowUpgradeModal, shouldShowEnterpriseToast } = useSubscription();
  const { showToast } = useAppToast();
  const { t } = useLocaleResources('common');
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const handleFeatureAccess = (callback?: () => void) => {
    if (shouldShowEnterpriseToast) {
      showToast({ type: "info", message: t("errors.enterpriseSupport") })
      return;
    }
    
    if (shouldShowUpgradeModal) {
      onOpen();
      return;
    }
    
    // User has valid subscription, execute callback
    if (callback) {
      callback();
    }
  };
  
  return {
    handleFeatureAccess,
    shouldShowUpgradeModal,
    shouldShowEnterpriseToast,
    isUpgradeModalOpen: isOpen,
    openUpgradeModal: onOpen,
    closeUpgradeModal: onClose
  };
};

export default useUpgradeHandler;