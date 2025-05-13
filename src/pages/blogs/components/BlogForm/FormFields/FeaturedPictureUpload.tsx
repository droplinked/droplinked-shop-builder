import { Flex } from '@chakra-ui/react'
import { TrashMd } from 'assets/icons/Action/Trash/TrashMd'
import FormFieldWrapper from 'components/redesign/form-field-wrapper/FormFieldWrapper'
import useFileUpload from 'hooks/useFileUpload/useFileUpload'
import useBlogForm from 'pages/blogs/hooks/useBlogForm'
import FileUpload from 'pages/products/components/ProductDrawer/components/common/FileUpload'
import SelectedFileCard from 'pages/products/components/ProductDrawer/components/common/SelectedFileCard'
import React, { useState } from 'react'
import { getFileSizeInMB } from 'utils/helpers'

function FeaturedPictureUpload() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const { values: { image }, errors, setFieldValue } = useBlogForm()
    const { mutateAsync, isLoading } = useFileUpload()

    const handleFileChange = async (file: File) => {
        try {
            setSelectedFile(file)
            const formData = new FormData()
            formData.append("image", file)
            const { original, small } = await mutateAsync(formData)
            setFieldValue("image", original)
        }
        catch (error) {
            console.error("File upload failed:", error)
        }
    }

    return (
        <FormFieldWrapper
            label="Featured Picture"
            description="Upload an eye-catching image to enhance the visual appeal."
            isRequired
            errorMessage={errors.image?.toString()}
        >
            <Flex direction="column" gap={4}>
                <FileUpload
                    onFileChange={handleFileChange}
                    isLoading={isLoading}
                    accept={{
                        'image/jpeg': ['.jpeg', '.jpg'],
                        'image/png': ['.png'],
                    }}
                    flexProps={{ minH: "140px" }}
                    text={{
                        dragActiveText: "Drop the file here ...",
                        footerText: "JPG, JPEG or PNG"
                    }}
                />

                {image &&
                    <SelectedFileCard
                        previewImage={image}
                        fileName={selectedFile?.name}
                        fileSize={selectedFile ? getFileSizeInMB(selectedFile) : ''}
                    >
                        <button
                            type='button'
                            onClick={() => setFieldValue("image", null)}
                        >
                            <TrashMd color='#FF2244' />
                        </button>
                    </SelectedFileCard>
                }
            </Flex>
        </FormFieldWrapper>
    )
}

export default FeaturedPictureUpload