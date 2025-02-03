import { Box, Flex } from '@chakra-ui/react'
import { Editor } from '@tinymce/tinymce-react'
import useProductForm from 'pages/products/hooks/useProductForm'
import React from 'react'
import GenerateWithAI from '../../common/GenerateWithAI'
import ProductFieldWrapper from '../../common/ProductFieldWrapper'
import classes from './ProductDescription.module.scss'
import ImproveWithAi from '../../common/improve-with-ai/ImproveWithAi'

function ProductDescription() {
    const { values: { description }, errors, setFieldValue } = useProductForm()

    return (
        <ProductFieldWrapper
            label='Description'
            description="Describe product features and details to help customers understand what they're buying."
            errorMessage={errors.description}
        >
            <Flex direction="column" gap={4} className={classes.editor}>
                <Editor
                    apiKey='r4cgib74mcr1i0twnfwdoeadukqd7ln8173wea43acokjfc4'
                    value={description}
                    onEditorChange={(content) => setFieldValue('description', content)}
                    init={{
                        skin: "oxide-dark",
                        content_css: "dark",
                        height: 200,
                        placeholder: 'Add product information here...',
                        menubar: false,
                        plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount', 'importcss', 'image'
                        ],
                        toolbar: 'undo redo | blocks | ' +
                            'bold italic forecolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent table image',
                        content_style: 'body { font-family: Helvetica,Arial,sans-serif; font-size: 14px; background: #141414; } .mce-content-body[data-mce-placeholder]:not(.mce-visualblocks)::before { color: #777 }',
                    }}
                />
                <Box position="absolute" bottom={2} right={2}>
                    <ImproveWithAi BoxStyles={{ zIndex: 1 }} />
                </Box>
            </Flex>
        </ProductFieldWrapper>
    )
}

export default ProductDescription