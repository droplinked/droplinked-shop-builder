import React from 'react';
import { useMutation } from 'react-query';
import useAppToast from 'functions/hooks/toast/useToast';
import { importAffiliateProductService } from 'lib/apis/product/productServices';
import BasicButton from 'components/common/BasicButton/BasicButton';
import AppIcons from 'assest/icon/Appicons';

function ImportProductButton({ productId }) {
  const { showToast } = useAppToast();
  const { mutateAsync, isLoading } = useMutation(importAffiliateProductService);

  const importProduct = async () => {
    try {
      await mutateAsync({ productId });
      showToast({ type: 'success', message: 'Product Imported' });
    } catch (e) {
      showToast({ type: 'error', message: e?.response?.data?.data?.message || 'Failed to import product' });
    }
  };

  return (
    <BasicButton iconLeft={<AppIcons.AffiliateAddProduct />} isLoading={isLoading} isDisabled={isLoading} width="full" onClick={importProduct}>
      Import Product
    </BasicButton>
  );
}

export default ImportProductButton;
