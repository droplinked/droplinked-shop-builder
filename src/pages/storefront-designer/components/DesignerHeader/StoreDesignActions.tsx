import { Flex, useDisclosure } from '@chakra-ui/react';
import { Refresh2Md } from 'assets/icons/Action/Refresh2/Refresh2Md';
import AppButton from 'components/redesign/button/AppButton';
import AppModal from 'components/redesign/modal/AppModal';
import ModalHeaderData from 'components/redesign/modal/ModalHeaderData';
import useAppToast from 'hooks/toast/useToast';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import { useProfile } from 'hooks/useProfile/useProfile';
import localAr from 'locales/storefront-designer/ar.json';
import localEn from 'locales/storefront-designer/en.json';
import { initialStateDesignPage } from 'pages/storefront-designer/constants/initialState';
import { designerContext } from 'pages/storefront-designer/context/designerContext';
import React, { useCallback, useContext } from 'react';

/**
 * Actions for saving or discarding store design changes
 */
function StoreDesignActions(): React.ReactElement {
  const { state: { shop }, methods: { dispatch }} = useContext(designerContext);
  const { setShopData: { update, loading }, updateShopData, shop: originalShop} = useProfile();
  const { showToast } = useAppToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useLocaleResources('storefront-designer', { en: localEn, ar: localAr });

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
      showToast({ message: t('StoreDesignActions.toasts.updateSuccess'), type: 'success' });
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
    showToast({ message: t('StoreDesignActions.toasts.discardSuccess'), type: 'info' });
    onClose();
  }, [originalShop, dispatch, updateShopData, showToast, onClose, t]);

  // Disable save button if required fields are missing
  const isSubmitDisabled = !shop.logo?.length || !shop.headerIcon?.length || !shop.backgroundImage?.length;

  return (
    <>
      <Flex width="auto" display="flex" justifyContent="space-between" flexDirection="row-reverse">
        <Flex gap="16px">
          <AppButton variant="secondary" onClick={openDiscardConfirmation}>
            {t('common:discard')}
          </AppButton>
          <AppButton isDisabled={isSubmitDisabled} isLoading={loading} onClick={handleSaveChanges}>
            {t('StoreDesignActions.saveChanges')}
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
          title={t('StoreDesignActions.resetDesign.title')}
          icon={<Refresh2Md color="white" />}
                      description={t('StoreDesignActions.resetDesign.description')}
        />

        <Flex width="100%" display="flex" justifyContent="space-between" paddingX="48px" gap="24px">
          <AppButton flex={1} variant="secondary" size="lg" onClick={onClose}>
            {t('common:cancel')}
          </AppButton>
          <AppButton flex={1} variant="filled" size="lg" bg="system.error" _hover="none" _pressed="none" color="white" onClick={handleDiscardChanges}>
            {t('StoreDesignActions.resetDesign.reset')}
          </AppButton>
        </Flex>
      </AppModal>
    </>
  );
}

export default StoreDesignActions;
