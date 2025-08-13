import { ModalFooter, useDisclosure } from '@chakra-ui/react';
import UpgradePlanModalContainer from 'components/modals/upgrade-plan-modal/UpgradePlanModalContainer';
import AppButton from 'components/redesign/button/AppButton';
import useAppToast from 'hooks/toast/useToast';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import { UseImportWithUrl } from 'pages/products/hooks/useImportWithUrl';
import useProductPageStore from 'pages/products/stores/ProductPageStore';
import React from 'react';
import { useMutation } from 'react-query';
import { uploadProductCSV } from 'services/product/productServices';

interface Props {
  file: File | null;
  closeModal: () => void;
  importWithUrl: UseImportWithUrl;
}

function ImportProductModalFooter({ file, closeModal, importWithUrl }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useLocaleResources('products');
  const formData = new FormData();
  const { targetShopUrl } = useProductPageStore();
  const { showToast } = useAppToast();
  const { mutateAsync, isLoading } = useMutation(uploadProductCSV);
  const { startCrawling, crawlingLoading } = importWithUrl;

  const handleFileUpload = async () => {
    if (!file) return;

    formData.append('file', file);

    try {
      const response = await mutateAsync(formData);
      showToast({ message: response.data.message, type: 'success' });
      closeModal();
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.data?.message || t('common:error');
      showToast({ message: errorMessage, type: 'error' });
    }
  };

  const handleSubmit = () => {
    // if (file) {
    //   handleFileUpload();
    // } else {
    //   startCrawling();
    // }
    onOpen();
  };


  return (
    <>
      <ModalFooter
        display="flex"
        justifyContent="space-between"
        gap={{ xl: 6, base: 3 }}
        paddingBlock="36px !important"
      >
        <AppButton
          variant="secondary"
          disabled={isLoading}
          onClick={closeModal}
        >
          {t('ImportProductModalFooter.cancel')}
        </AppButton>
        <AppButton
          onClick={handleSubmit}
          isLoading={crawlingLoading || isLoading}
        >
          {isLoading
            ? t('common:uploading')
            : t('ImportProductModalFooter.import')}
        </AppButton>
      </ModalFooter>

      <UpgradePlanModalContainer
        isOpen={isOpen}
        onClose={onClose}
        initialActiveTab="enterprise"
      />
    </>
  );
}

export default ImportProductModalFooter;
