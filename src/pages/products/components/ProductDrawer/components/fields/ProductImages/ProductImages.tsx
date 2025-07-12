import { Flex } from '@chakra-ui/react'
import FormFieldWrapper from 'components/redesign/form-field-wrapper/FormFieldWrapper'
import useFileUpload from 'hooks/useFileUpload/useFileUpload'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import useProductForm from 'pages/products/hooks/useProductForm'
import React from 'react'
import { getFileSizeInMB } from 'utils/helpers'
import FileUpload from '../../common/FileUpload'
import SelectedFileCard from '../../common/SelectedFileCard'
import MediaActions from './MediaActions'
import arLocale from 'locales/products/ar.json'
import enLocale from 'locales/products/en.json'

export default function ProductImages() {
    const { values: { media }, errors, setFieldValue } = useProductForm()
    const { mutateAsync, isLoading } = useFileUpload()
    const { t } = useLocaleResources('products', { en: enLocale, ar: arLocale })

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
                fileSize: getFileSizeInMB(file),
            }

            const updatedMedia = [...media, newMediaItem]
            setFieldValue("media", updatedMedia)
        }
        catch (error) {
            console.error(t('fields.productImages.fileUploadFailed'), error)
        }
    }

    return (
        <FormFieldWrapper
            label={t('fields.productImages.label')}
            description={t('fields.productImages.description')}
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

                {sortedMedia.length > 0 && (
                    <Flex direction="column" gap={3}>
                        {sortedMedia.map((mediaItem) => (
                            <SelectedFileCard key={mediaItem.url} previewImage={mediaItem.thumbnail} {...mediaItem}>
                                <MediaActions image={mediaItem} />
                            </SelectedFileCard>
                        ))}
                    </Flex>
                )}
            </Flex>
        </FormFieldWrapper>
    )
}