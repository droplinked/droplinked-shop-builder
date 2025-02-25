import AppIcons from 'assets/icon/Appicons';
import AuthModal from 'components/modals/auth-modal/AuthModal';
import Button from 'components/redesign/button/Button';
import useAppToast from 'functions/hooks/toast/useToast';
import { importAffiliateProductService } from 'lib/apis/product/productServices';
import useAppStore from 'lib/stores/app/appStore';
import { MODAL_TYPE } from 'pages/public-pages/homePage/HomePage';
import React, { useState } from 'react';
import { useMutation } from 'react-query';

function ImportProductButton({ productId }) {
  const { isLoggedIn } = useAppStore();
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const { showToast } = useAppToast();
  const { mutateAsync, isLoading } = useMutation(importAffiliateProductService);

  const importProduct = async () => {
    if (isLoggedIn) {
      try {
        await mutateAsync({ productId });
        showToast({ type: 'success', message: 'Product Imported' });
      } catch (e) {
        showToast({ type: 'error', message: e?.response?.data?.data?.message || 'Failed to import product' });
      }
    } else {
      setAuthModalOpen(true);
    }
  };

  return (
    <>
      <Button iconLeft={<AppIcons.AffiliateAddProduct />} isLoading={isLoading} isDisabled={isLoading} width="full" onClick={importProduct}>
        Import Product
      </Button>
      <AuthModal show={isAuthModalOpen} close={() => setAuthModalOpen(false)} type={MODAL_TYPE.SIGNIN} />
    </>
  );
}

export default ImportProductButton;
