import { Box } from '@chakra-ui/react'
import useFileUpload from 'hooks/useFileUpload/useFileUpload'
import useOnboardingStore from 'pages/onboarding/stores/useOnboardingStore'
import React from 'react'
import FieldWrapper from './FieldWrapper'
import FileUpload from './FileUpload'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

export default function CoverImage() {
    const { mutateAsync, isLoading } = useFileUpload()
    const { storeSetup, updateOnboardingState } = useOnboardingStore()
    const { t } = useLocaleResources('onboarding')

    const handleFileChange = async (file: File) => {
        if (file) {
            const formData = new FormData()
            formData.append('image', file)
            const { original } = await mutateAsync(formData)
            updateOnboardingState('storeSetup', { ...storeSetup, hero_section: original })
        } else {
            updateOnboardingState('storeSetup', { ...storeSetup, hero_section: '' })
        }
    }

    return (
        <Box>
            <FieldWrapper title={t('common.shop.coverImage')}>
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
                    value={storeSetup.hero_section}
                />
            </FieldWrapper>
        </Box>
    )
}
