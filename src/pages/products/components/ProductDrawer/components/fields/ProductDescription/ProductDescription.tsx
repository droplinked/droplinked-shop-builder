import { Flex } from '@chakra-ui/react'
import { Editor } from '@tinymce/tinymce-react'
import useProductForm from 'pages/products/hooks/useProductForm'
import React, { useRef, useEffect } from 'react'
import ProductFieldWrapper from '../../common/ProductFieldWrapper'
import classes from './ProductDescription.module.scss'
import AnimatedBox from '../../common/AnimatedBox'
import useProductPageStore from 'pages/products/stores/ProductPageStore'
import './loading.css'
import { useImproveAI } from 'pages/products/hooks/useImproveAI'
import ImproveWithAi from '../../common/ImproveWithAi'

function ProductDescription() {
    const { values: { description, title }, errors, setFieldValue } = useProductForm()
    const { isAiGenerateLoading } = useProductPageStore()
    const editorRef = useRef(null);
    const improveAI = useImproveAI({ type: 'description' });

    useEffect(() => {
        if (editorRef.current) {
            const body = document.querySelector('.tox-edit-area');
            if (body) {
                if (isAiGenerateLoading || improveAI.isImproveLoading) {
                    body.classList.add('loading');
                } else {
                    body.classList.remove('loading');
                }
            }
        }
    }, [isAiGenerateLoading, improveAI.isImproveLoading]);

    return (
        <ProductFieldWrapper
            label='Description'
            description="Describe product features and details to help customers understand what they're buying."
            errorMessage={errors.description}
        >
            <AnimatedBox flexProps={{
                ...isAiGenerateLoading ?
                    {
                        _before: {
                            width: "calc(100% + 0.5px) !important",
                            height: "calc(100% + 0.5px) !important"
                        },
                        _after: {
                            width: "calc(100% + 0.5px) !important",
                            height: "calc(100% + 0.5px) !important",
                        },
                        padding: "0.5px !important"
                    } :
                    {
                        _before: { display: "none" },
                        _after: { display: "none" },
                        background: "transparent !important"
                    }
            }}>
                <Flex direction="column" gap={4} className={classes.editor}>
                    <Editor
                        onInit={(evt, editor) => editorRef.current = editor}
                        apiKey='r4cgib74mcr1i0twnfwdoeadukqd7ln8173wea43acokjfc4'
                        value={description}
                        onEditorChange={(content) => setFieldValue('description', content)}
                        init={{
                            skin: "oxide-dark",
                            content_css: "dark",
                            body_id: "loading",
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
                    <ImproveWithAi
                        BoxStyles={{
                            position: "absolute",
                            bottom: 2,
                            right: 2
                        }}
                        isDisabled={!description && !title}
                        {...improveAI}
                    />
                </Flex>
            </AnimatedBox>
        </ProductFieldWrapper>
    )
}

export default ProductDescription