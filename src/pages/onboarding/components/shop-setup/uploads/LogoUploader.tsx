import { Center, Flex, Input } from '@chakra-ui/react'
import { TrashLg } from 'assets/icons/Action/Trash/TrashLg'
import { UploadLg } from 'assets/icons/Action/Upload/UploadLg'
import AppImage from 'components/common/image/AppImage'
import AppButton from 'components/redesign/button/AppButton'
import useFileUpload from 'hooks/useFileUpload/useFileUpload'
import useOnboardingStore, { initialShopData } from 'pages/onboarding/stores/useOnboardingStore'
import React, { useRef } from 'react'
import AiOptionsDisplay from '../ai/AiOptionsDisplay'
import FieldWrapper from '../inputs/FieldWrapper'

function LogoUploader() {
  const { mutateAsync, isLoading } = useFileUpload()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { shopData, updateShopData } = useOnboardingStore()

  const hasCustomLogo = shopData.logo !== initialShopData.logo

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const formData = new FormData()
      formData.append('image', file)
      const { original } = await mutateAsync(formData)
      updateShopData('logo', original || '')
    }
  }

  const handleLogoUpload = () => fileInputRef.current?.click()

  const handleLogoRemove = () => {
    updateShopData('logo', initialShopData.logo)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleLogoSelect = (logo: string) => updateShopData('logo', logo)

  return (
    <FieldWrapper title="Logo">
      <Flex
        justify="space-between"
        align="center"
        border="1px solid"
        borderColor="neutral.gray.800"
        borderRadius="16px"
        padding={4}
        paddingRight={6}
      >
        <Input type="file" accept="image/jpeg,image/png,image/jpg" hidden ref={fileInputRef} onChange={handleFileChange} />
        <AppImage
          width="64px"
          height="64px"
          {...hasCustomLogo && {
            border: '1px solid',
            borderColor: 'neutral.gray.800',
          }}
          objectFit="cover"
          alt="logo"
          src={shopData.logo}
          borderRadius="8px"
        />
        <Flex>
          <AppButton
            variant="normal"
            size="lg"
            color="system.link"
            leftIcon={<UploadLg />}
            paddingBlock={3}
            paddingInline={hasCustomLogo ? 3 : 4}
            _hover='none'
            _active='none'
            isLoading={isLoading}
            onClick={handleLogoUpload}
          >
            {!hasCustomLogo ? 'Upload' : ''}
          </AppButton>

          {hasCustomLogo && (
            <Center as='button' padding={3} onClick={handleLogoRemove}>
              <TrashLg color='#F24' />
            </Center>
          )}
        </Flex>
      </Flex>

      <AiOptionsDisplay
        type="logos"
        title="AI Generated Logos"
        onSelect={handleLogoSelect}
        selectedValue={shopData.logo}
      />
    </FieldWrapper>
  )
}

export default LogoUploader