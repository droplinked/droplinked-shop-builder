import { Box, Flex, Image, Input } from '@chakra-ui/react';
import { UploadLg } from 'assets/icons/Action/Upload/UploadLg';
import AppSkeleton from 'components/common/skeleton/AppSkeleton';
import BlueButton from 'components/redesign/button/BlueButton';
import useFileUpload from 'hooks/useFileUpload/useFileUpload';
import useOnboardingStore, { initialShopData } from 'pages/onboarding/stores/useOnboardingStore';
import React, { useRef } from 'react';
import AiOptionsDisplay from '../ai/AiOptionsDisplay';
import FieldWrapper from '../inputs/FieldWrapper';
import AppButton from 'components/redesign/button/AppButton';
import { TrashLg } from 'assets/icons/Action/Trash/TrashLg';

export default function LogoUploader() {
  const { mutateAsync, isLoading } = useFileUpload();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { shopData, updateShopData } = useOnboardingStore();

  const isDefaultLogo = shopData.logo === initialShopData.logo;

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      const { original } = await mutateAsync(formData);
      updateShopData('logo', original || '');
    }
  };

  const handleLogoChange = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    updateShopData('logo', 'https://upload-file-droplinked.s3.amazonaws.com/0ef9cb6d7f894a0fbb562bb2a15357834bec3c5bf8ea35b03d99e38fccda5b58.png');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSelectLogo = (logo: string) => {
    updateShopData('logo', logo);
  };

  return (
    <FieldWrapper title="Logo">
      <Flex align="center" border="1px solid" borderColor="neutral.gray.800" borderRadius="16px" p={4} justify="space-between">
      <Box width="64px" height="64px" borderRadius="8px" bg="neutral.gray.1000">
          <Image p={2} src={shopData.logo} alt="logo" width="100%" height="100%" objectFit="cover" />
        </Box>
        <Flex gap={0}>
          <AppButton variant="normal" size="lg" color="system.link" leftIcon={<UploadLg />} padding={0} onClick={handleLogoChange} isLoading={isLoading} _hover={'none'}>
            {!isDefaultLogo ? '' : 'Upload'}
          </AppButton>
      
          {shopData.logo && !isDefaultLogo && (
            <AppButton variant="normal" size="lg" color="system.error" leftIcon={<TrashLg />} padding={0} onClick={handleRemove} _hover={'none'}></AppButton>
          )}

          <Input type="file" accept="image/jpeg,image/png,image/jpg" hidden ref={fileInputRef} onChange={handleFileChange} />
        </Flex>
        
        
      </Flex>

      <AiOptionsDisplay type="logos" title="AI Generated Logos" onSelect={handleSelectLogo} selectedValue={shopData.logo} />
    </FieldWrapper>
  );
}
