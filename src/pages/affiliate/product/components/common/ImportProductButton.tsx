import AppIcons from 'assets/icon/Appicons';
import Button from 'components/redesign/button/Button';
import useAppToast from 'hooks/toast/useToast';
import { importAffiliateProductService } from 'lib/apis/product/productServices';
import useAppStore from 'lib/stores/app/appStore';
import React from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

function ImportProductButton({ productId }) {
  const navigate = useNavigate()
  const { mutateAsync, isLoading } = useMutation(importAffiliateProductService);
  const { isLoggedIn } = useAppStore();
  const { showToast } = useAppToast();

  const importProduct = async () => {
    if (!isLoggedIn) return navigate("/onboarding?entry=signin")

    try {
      await mutateAsync({ productId });
      showToast({ type: 'success', message: 'Product Imported' });
    } catch (e) {
      showToast({ type: 'error', message: e?.response?.data?.data?.message || 'Failed to import product' });
    }
  };

  return (
    <Button iconLeft={<AppIcons.AffiliateAddProduct />} isLoading={isLoading} isDisabled={isLoading} width="full" onClick={importProduct}>
      Import Product
    </Button>
  );
}

export default ImportProductButton;
