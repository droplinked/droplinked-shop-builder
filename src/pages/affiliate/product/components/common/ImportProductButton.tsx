import AppIcons from 'assets/icon/Appicons';
import AppButton from 'components/redesign/button/AppButton';
import useAppToast from 'hooks/toast/useToast';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import { importAffiliateProductService } from 'services/product/productServices';
import useAppStore from 'stores/app/appStore';
import React from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

interface ImportProductButtonProps {
  productId: string;
}

function ImportProductButton({ productId }: ImportProductButtonProps) {
  const { t } = useLocaleResources('affiliate');
  const navigate = useNavigate()
  const { mutateAsync, isLoading } = useMutation(importAffiliateProductService);
  const { isLoggedIn } = useAppStore();
  const { showToast } = useAppToast();

  const importProduct = async () => {
    if (!isLoggedIn) return navigate("/onboarding?entry=signin")

    try {
      await mutateAsync({ productId });
      showToast({ type: 'success', message: t('ProductDetails.productImported') });
    } catch (e) {
      showToast({ type: 'error', message: e?.response?.data?.data?.message || t('ProductDetails.failedToImport') });
    }
  };

  return (
    <AppButton
      iconLeft={<AppIcons.AffiliateAddProduct />}
      isLoading={isLoading}
      isDisabled={isLoading}
      width="full"
      onClick={importProduct}
    >
      {t('ProductDetails.importProduct')}
    </AppButton>
  );
}

export default ImportProductButton;
