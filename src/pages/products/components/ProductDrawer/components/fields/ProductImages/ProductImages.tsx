import { Flex } from '@chakra-ui/react'
import ErrorMessage from 'components/redesign/error-message/ErrorMessage'
import { useFormikContext } from 'formik'
import useFileUpload from 'functions/hooks/useFileUpload/useFileUpload'
import { fileSizeInMB } from 'lib/utils/helpers/helpers'
import { ProductFormValues } from 'pages/products/utils/formSchema'
import React from 'react'
import FileUpload from '../../common/FileUpload'
import ProductFieldWrapper from '../../common/ProductFieldWrapper'
import ProductImage from './ProductImage'

export default function ProductImages() {
    const { values: { media }, errors, setFieldValue } = useFormikContext<ProductFormValues>()
    const { mutateAsync, isLoading } = useFileUpload()

    const handleFileChange = async (file: File) => {
        try {
            const formData = new FormData()
            formData.append("image", file)
            const { original, small } = await mutateAsync(formData)
            const newMedia = [...media, {
                thumbnail: small,
                url: original,
                isMain: !media.some(m => [true, "true"].includes(m.isMain)),
                fileName: file.name,
                fileSize: fileSizeInMB(file)
            }]
            setFieldValue("media", newMedia)
        }
        catch { }
    }

    return (
        <ProductFieldWrapper
            label='Product Images'
            description='Upload images or videos that visually showcase the product.'
        >
            <Flex direction="column" gap={4}>
                <FileUpload
                    onFileChange={handleFileChange}
                    isLoading={isLoading}
                    accept={{
                        'image/jpeg': ['.jpeg', '.jpg'],
                        'image/png': ['.png']
                    }}
                    flexProps={{ minH: "135px" }}
                />
                {media.map(i => <ProductImage image={i} />)}
                {errors.media && <ErrorMessage>{errors.media.toString()}</ErrorMessage>}
            </Flex>
        </ProductFieldWrapper>
    )
}