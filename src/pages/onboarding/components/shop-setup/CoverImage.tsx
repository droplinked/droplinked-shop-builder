import useFileUpload from 'hooks/useFileUpload/useFileUpload'
import useOnboardingStore from 'pages/onboarding/stores/useOnboardingStore'
import React from 'react'
import FieldWrapper from './FieldWrapper'
import FileUpload from './FileUpload'

export default function CoverImage() {
    const { mutateAsync, isLoading } = useFileUpload()
    const { shopData, updateShopData } = useOnboardingStore()

    const handleFileChange = async (file: File) => {
        if (file) {
            const formData = new FormData()
            formData.append('image', file)
            const { original } = await mutateAsync(formData)
            updateShopData('hero_section', original)
        } else {
            updateShopData('hero_section', '')
        }
    }

    return (
        <FieldWrapper title='Cover Image'>
            <FileUpload
                onFileChange={handleFileChange}
                isLoading={isLoading}
                accept={{
                    'image/jpeg': ['.jpeg', '.jpg'],
                    'image/png': ['.png'],
                }}
                boxProps={{
                    paddingBlock: 6
                }}
                dropDescription='JPG, JPEG, and PNG'
                value={shopData.hero_section}
            />
        </FieldWrapper>
    )
}
