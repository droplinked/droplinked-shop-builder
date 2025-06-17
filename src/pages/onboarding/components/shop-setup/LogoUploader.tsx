import { Avatar, Flex, Input } from '@chakra-ui/react'
import { UploadMd } from 'assets/icons/Action/Upload/UploadMd'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import BlueButton from 'components/redesign/button/BlueButton'
import useFileUpload from 'hooks/useFileUpload/useFileUpload'
import useOnboardingStore, { initialStoreSetup } from 'pages/onboarding/stores/useOnboardingStore'
import React, { useRef } from 'react'
import FieldWrapper from './FieldWrapper'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

export default function LogoUploader() {
    const { mutateAsync, isLoading } = useFileUpload()
    const fileInputRef = useRef<HTMLInputElement>(null)
    const { storeSetup, updateOnboardingState } = useOnboardingStore()
    const { t } = useLocaleResources('onboarding')

    const isDefaultLogo = storeSetup.logo === initialStoreSetup.logo

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const formData = new FormData()
            formData.append("image", file)
            const { original } = await mutateAsync(formData)
            updateOnboardingState('storeSetup', { ...storeSetup, logo: original || '' })
        }
    }

    const handleLogoChange = () => {
        fileInputRef.current?.click()
    }

    const handleRemove = () => {
        updateOnboardingState('storeSetup', { ...storeSetup, logo: 'https://upload-file-droplinked.s3.amazonaws.com/0ef9cb6d7f894a0fbb562bb2a15357834bec3c5bf8ea35b03d99e38fccda5b58.png' })
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    return (
        <FieldWrapper title={t('common.shop.logo')}>
            <Flex gap={6} align="center">
                <AppSkeleton isLoaded={!isLoading} borderRadius="100%">
                    <Avatar
                        width="80px"
                        height="80px"
                        src={storeSetup.logo || undefined}
                        name="Logo"
                        userSelect="none"
                    />
                </AppSkeleton>
                <Flex gap={2}>
                    <BlueButton
                        fontSize={14}
                        fontWeight={500}
                        leftIcon={<UploadMd color='#179ef8' style={{ marginRight: "6px" }} />}
                        onClick={handleLogoChange}
                        isLoading={isLoading}
                    >
                        {storeSetup.logo ? t('shopSetup.logoUploader.change') : t('shopSetup.logoUploader.upload')}
                    </BlueButton>
                    {storeSetup.logo && !isLoading &&
                        <BlueButton
                            color="#FF2244"
                            fontSize={14}
                            fontWeight={500}
                            onClick={handleRemove}
                            isDisabled={!fileInputRef?.current?.value && isDefaultLogo}
                        >
                            {t('shopSetup.logoUploader.remove')}
                        </BlueButton>
                    }
                    <Input
                        type="file"
                        accept="image/jpeg,image/png,image/jpg"
                        hidden
                        ref={fileInputRef}
                        onChange={handleFileChange}
                    />
                </Flex>
            </Flex>
        </FieldWrapper>
    )
}
