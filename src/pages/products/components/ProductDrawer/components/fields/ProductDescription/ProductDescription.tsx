import { Flex } from '@chakra-ui/react'
import { Editor } from '@tinymce/tinymce-react'
import FormFieldWrapper from 'components/redesign/form-field-wrapper/FormFieldWrapper'
import ProTrialModal from 'components/modals/pro-plan-upgrade-modal/ProPlanUpgradeModal'
import { useImproveAI } from 'pages/products/hooks/useImproveAI'
import useProductForm from 'pages/products/hooks/useProductForm'
import React, { useEffect, useRef } from 'react'
import AnimatedBox from '../../common/AnimatedBox'
import ImproveWithAi from '../../common/ImproveWithAi'
import './loading.css'
import classes from './ProductDescription.module.scss'

function ProductDescription() {
    const { values: { description, title }, errors, setFieldValue } = useProductForm()
    const editorRef = useRef(null);
    const improveAI = useImproveAI({ type: 'description' });
    const { isImproveLoading, isProTrialModalOpen, handleCloseProTrialModal } = improveAI

    useEffect(() => {
        if (editorRef.current) {
            const body = document.querySelector('.tox-edit-area');
            if (body) {
                if (isImproveLoading) {
                    body.classList.add('loading');
                } else {
                    body.classList.remove('loading');
                }
            }
        }
    }, [isImproveLoading]);

    return (
        <>
            <FormFieldWrapper
                label='Description'
                description="Describe product features and details to help customers understand what they're buying."
                errorMessage={errors.description}
            >
                <AnimatedBox flexProps={{
                    ...isImproveLoading ?
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
            </FormFieldWrapper>
            
            <ProTrialModal
                isOpen={isProTrialModalOpen}
                onClose={handleCloseProTrialModal}
            />
        </>
    )
}
  
export default ProductDescription