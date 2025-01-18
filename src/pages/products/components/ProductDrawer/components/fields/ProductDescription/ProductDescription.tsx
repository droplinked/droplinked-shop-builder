import { Flex } from '@chakra-ui/react'
import { Editor } from '@tinymce/tinymce-react'
import useProductForm from 'pages/products/hooks/useProductForm'
import React from 'react'
import GenerateWithAI from '../../common/GenerateWithAI'
import ProductFieldWrapper from '../../common/ProductFieldWrapper'
import classes from './ProductDescription.module.scss'

function ProductDescription() {
    const { values: { product_type, description }, errors, setFieldValue } = useProductForm()

    return (
        <ProductFieldWrapper
            label='Description'
            description="Describe product features and details to help customers understand what they're buying."
            errorMessage={errors.description}
        >
            <Flex direction="column" gap={4} className={classes.editor}>
                <Editor
                    // apiKey='cnv918vz9pvfdm6584873k8ixx4du3hom8x6p2ljb2h8p1gf'
                    apiKey='r4cgib74mcr1i0twnfwdoeadukqd7ln8173wea43acokjfc4'
                    disabled={product_type === "EVENT" ? true : false}
                    value={description}
                    onEditorChange={(content) => setFieldValue('description', content)}
                    init={{
                        skin: "oxide-dark",
                        content_css: "dark",
                        height: 200,
                        placeholder: 'Stylish, and Comfortable Long Sleeve T-Shirt...',
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
                <GenerateWithAI />
            </Flex>
        </ProductFieldWrapper>
    )
}

export default ProductDescription