import { Flex } from '@chakra-ui/react'
import { Editor } from '@tinymce/tinymce-react'
import useProductForm from 'pages/products/hooks/useProductForm'
import React, { useState, useRef, useEffect } from 'react'
import ProductFieldWrapper from '../../common/ProductFieldWrapper'
import ImproveDescription from './ImproveDescription'
import classes from './ProductDescription.module.scss'
import AnimatedBox from '../../common/AnimatedBox'
import { useMutation } from 'react-query'
import { improveDescription } from 'lib/apis/ai/services'
import { IImproveDescription } from 'lib/apis/ai/interfaces'
import useAppToast from 'functions/hooks/toast/useToast'
import './loading.css'

function ProductDescription() {
    const { values: { description }, errors, setFieldValue } = useProductForm()
    const [isLoaded, setIsLoaded] = useState(false);
    const { showToast } = useAppToast()
    const editorRef = useRef(null);

    const { mutateAsync, isLoading } = useMutation(
        (params: IImproveDescription) => improveDescription(params),
        {
            onSuccess: (response) => {
                setFieldValue("description", response.data)
                setIsLoaded(true)
            },
            onError: (error) => {
                showToast({ message: "Oops! Something went wrong. Please try again.", type: "error" })
            }
        }
    )

    useEffect(() => {
        if (editorRef.current) {
            const body = document.querySelector('.tox-edit-area');
            if (body) {
                if (isLoading) {
                    body.classList.add('loading');
                } else {
                    body.classList.remove('loading');
                }
            }
        }
    }, [isLoading]);

    return (
        <ProductFieldWrapper
            label='Description'
            description="Describe product features and details to help customers understand what they're buying."
            errorMessage={errors.description}
        >
            <AnimatedBox flexProps={{
                ...isLoading ?
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
            }}
            >
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
                    <ImproveDescription
                        description={description}
                        onDescriptionChange={(value) => setFieldValue("description", value)}
                        isLoaded={isLoaded}
                        setIsLoaded={setIsLoaded}
                        isLoading={isLoading}
                        mutateAsync={mutateAsync}
                    />
                </Flex>
            </AnimatedBox>
        </ProductFieldWrapper >
    )
}

export default ProductDescription