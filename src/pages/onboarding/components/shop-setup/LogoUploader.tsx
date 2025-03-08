import { Avatar, Flex, Input } from '@chakra-ui/react'
import { UploadMd } from 'assets/icons/Action/Upload/UploadMd'
import BlueButton from 'components/redesign/button/BlueButton'
import useFileUpload from 'hooks/useFileUpload/useFileUpload'
import useOnboardingStore from 'pages/onboarding/store/useOnboardingStore'
import React, { useRef } from 'react'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import FieldWrapper from './FieldWrapper'

export default function LogoUploader() {
    const { mutateAsync, isLoading } = useFileUpload()
    const fileInputRef = useRef<HTMLInputElement>(null)
    const { storeData, updateOnboardingState } = useOnboardingStore()

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const formData = new FormData()
            formData.append("image", file)
            const { original } = await mutateAsync(formData)
            updateOnboardingState('storeData', { ...storeData, logoUrl: original || '' })
        }
    }

    const handleLogoChange = () => {
        fileInputRef.current?.click()
    }

    const handleRemove = () => {
        updateOnboardingState('storeData', { ...storeData, logoUrl: '' })
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    return (
        <FieldWrapper title='Logo'>
            <Flex gap={6} align="center">
                <AppSkeleton isLoaded={!isLoading} borderRadius={"100%"}>
                    <Avatar
                        width="80px"
                        height="80px"
                        src={storeData.logoUrl || undefined}
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
                        {storeData.logoUrl ? "Change" : "Upload"}
                    </BlueButton>
                    {storeData.logoUrl &&
                        <BlueButton
                            color="#FF2244"
                            fontSize={14}
                            fontWeight={500}
                            onClick={handleRemove}
                        >
                            Remove
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
    );
}
