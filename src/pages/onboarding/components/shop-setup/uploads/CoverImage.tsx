import useFileUpload from 'hooks/useFileUpload/useFileUpload'
import useOnboardingStore from 'pages/onboarding/stores/useOnboardingStore'
import React from 'react'
import FieldWrapper from '../inputs/FieldWrapper'
import FileUpload from './FileUpload'
import AiOptionsDisplay from '../ai/AiOptionsDisplay'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

export default function CoverImage() {
    const { mutateAsync, isLoading } = useFileUpload()
    const { shopData, updateShopData } = useOnboardingStore()
    const { t } = useLocaleResources('onboarding')

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

    const handleSelectCover = (cover: string) => {
        updateShopData('hero_section', cover)
    }

    return (
        <FieldWrapper title={t('shopSetup.uploads.coverImage.title')}>
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
                dropDescription={t('shopSetup.uploads.coverImage.dropDescription')}
                value={shopData.hero_section}
            />

            <AiOptionsDisplay
                type="covers"
                title="AI Generated Covers"
                onSelect={handleSelectCover}
                selectedValue={shopData.hero_section}
            />
        </FieldWrapper>
    )
}
