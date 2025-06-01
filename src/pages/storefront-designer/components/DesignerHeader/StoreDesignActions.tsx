import { Flex, useDisclosure } from '@chakra-ui/react';
import { Refresh2Md } from 'assets/icons/Action/Refresh2/Refresh2Md';
import AppButton from 'components/redesign/button/AppButton';
import AppModal from 'components/redesign/modal/AppModal';
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData';
import useAppToast from 'hooks/toast/useToast';
import { useProfile } from 'hooks/useProfile/useProfile';
import useLocaleResources from '../../../../hooks/useLocaleResources/useLocaleResources';
import { initialStateDesignPage } from 'pages/storefront-designer/constants/initialState';
import { designerContext } from 'pages/storefront-designer/context/designerContext';
import React, { useCallback, useContext } from 'react';
import localEn from '../../../../locales/storefront/en.json';
import localAr from '../../../../locales/storefront/ar.json';

/**
 * Actions for saving or discarding store design changes
 */
function StoreDesignActions(): React.ReactElement {
  const {
    state: { shop },
    methods: { dispatch }
  } = useContext(designerContext);

  const {
    setShopData: { update, loading },
    updateShopData,
    shop: originalShop
  } = useProfile();

  const { showToast } = useAppToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useLocaleResources('storefront', { en: localEn, ar: localAr });

  // Save store design changes
  const handleSaveChanges = useCallback(async () => {
    try {
      await update({
        ...shop,
        shopDesign: {
          ...shop.shopDesign
        }
      });
      updateShopData();
      showToast({ message: t('designerHeader.actions.toasts.updateSuccess'), type: 'success' });
    } catch (error) {
      showToast({ message: error, type: 'error' });
    }
  }, [shop, update, updateShopData, showToast, t]);

  // Open confirmation modal for discarding changes
  const openDiscardConfirmation = useCallback(() => {
    onOpen();
  }, [onOpen]);

  // Discard changes and reset to original state
  const handleDiscardChanges = useCallback(() => {
    updateShopData();
    dispatch({
      type: 'updateState',
      params: { device: initialStateDesignPage.device, shop: originalShop }
    });
    showToast({ message: t('designerHeader.actions.toasts.discardSuccess'), type: 'info' });
    onClose();
  }, [originalShop, dispatch, updateShopData, showToast, onClose, t]);

  // Disable save button if required fields are missing
  const isSubmitDisabled = !shop.logo?.length || !shop.headerIcon?.length || !shop.backgroundImage?.length;

  return (
    <>
      <Flex width="auto" display="flex" justifyContent="space-between" flexDirection="row-reverse">
        <Flex gap="16px">
          <AppButton variant="secondary" onClick={openDiscardConfirmation}>
            {t('designerHeader.actions.discard')}
          </AppButton>
          <AppButton isDisabled={isSubmitDisabled} isLoading={loading} onClick={handleSaveChanges}>
            {t('designerHeader.actions.saveChanges')}
          </AppButton>
        </Flex>
      </Flex>

      <AppModal
        modalRootProps={{
          isOpen,
          onClose,
          isCentered: true,
          size: 'xl'
        }}
      >
        <ModalHeaderData
          title={t('designerHeader.actions.resetDesign.title')}
          icon={<Refresh2Md color="white" />}
          description={t('designerHeader.actions.resetDesign.description')}
        />

        <Flex width="100%" display="flex" justifyContent="space-between" paddingX="48px" gap="24px">
          <AppButton flex={1} variant="secondary" size="lg" onClick={onClose}>
            {t('designerHeader.actions.resetDesign.cancel')}
          </AppButton>
          <AppButton flex={1} variant="filled" size="lg" bg="system.error" _hover="none" _pressed="none" color="white" onClick={handleDiscardChanges}>
            {t('designerHeader.actions.resetDesign.reset')}
          </AppButton>
        </Flex>
      </AppModal>
    </>
  );
}

export default StoreDesignActions;
