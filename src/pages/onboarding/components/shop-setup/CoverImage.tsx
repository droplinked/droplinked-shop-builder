import { Box } from '@chakra-ui/react'
import React from 'react'
import FieldWrapper from './FieldWrapper'
import { useFormikContext } from 'formik'
import { SetupFormValues } from './formConfig'
import useFileUpload from 'hooks/useFileUpload/useFileUpload'
import FileUpload from './FileUpload'
import useOnboardingStore from 'pages/onboarding/store/useOnboardingStore'

export default function CoverImage() {
    const { values, setFieldValue } = useFormikContext<SetupFormValues>()
    const { mutateAsync, isLoading } = useFileUpload()
    const { storeData, updateOnboardingState } = useOnboardingStore()

    const handleFileChange = async (file: File) => {
        if (file) {
            const formData = new FormData()
            formData.append('image', file)
            const { original } = await mutateAsync(formData)
            setFieldValue('coverImage', original)
            updateOnboardingState('storeData', { ...storeData, coverImage: original })
        } else {
            setFieldValue('coverImage', '')
            updateOnboardingState('storeData', { ...storeData, coverImage: '' })
        }
    }

    return (
        <Box>
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
                    value={values.coverImage}
                />
            </FieldWrapper>
        </Box>
    )
}
