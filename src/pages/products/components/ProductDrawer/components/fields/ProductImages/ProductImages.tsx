import { Flex } from '@chakra-ui/react'
import useFileUpload from 'functions/hooks/useFileUpload/useFileUpload'
import { fileSizeInMB } from 'lib/utils/helpers/helpers'
import useProductForm from 'pages/products/hooks/useProductForm'
import React from 'react'
import FileUpload from '../../common/FileUpload'
import ProductFieldWrapper from '../../common/ProductFieldWrapper'
import SelectedFileCard from '../../common/SelectedFileCard'
import MediaActions from './MediaActions'

export default function ProductImages() {
    const { values: { media }, errors, setFieldValue } = useProductForm()
    const { mutateAsync, isLoading } = useFileUpload()

    const sortedMedia = media.slice().sort((a, b) => (b.isMain ? 1 : 0) - (a.isMain ? 1 : 0))

    const handleFileChange = async (file: File) => {
        try {
            const formData = new FormData()
            formData.append("image", file)

            const { original, small } = await mutateAsync(formData)

            const newMediaItem = {
                thumbnail: small,
                url: original,
                isMain: !media.some(m => [true, "true"].includes(m.isMain)),
                fileName: file.name,
                fileSize: fileSizeInMB(file),
            }

            const updatedMedia = [...media, newMediaItem]
            setFieldValue("media", updatedMedia)
        }
        catch (error) {
            console.error("File upload failed:", error)
        }
    }

    return (
        <ProductFieldWrapper
            label="Product Images"
            description="Upload images or videos that visually showcase the product."
            errorMessage={errors.media?.toString()}
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
                />

                {sortedMedia.map((mediaItem) => (
                    <SelectedFileCard key={mediaItem.url} previewImage={mediaItem.thumbnail} {...mediaItem}>
                        <MediaActions image={mediaItem} />
                    </SelectedFileCard>
                ))}
            </Flex>
        </ProductFieldWrapper>
    )
}