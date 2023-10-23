import { Box, VStack } from '@chakra-ui/react'
import FieldLabel from 'components/common/form/fieldLabel/FieldLabel';
import AppSkeleton from 'components/common/skeleton/AppSkeleton';
import { productContext } from 'pages/product/single/context'
import React, { useContext, useEffect, useState } from 'react'
import classes from './style.module.scss'
import { Editor } from '@tinymce/tinymce-react';

function DescriptionProduct() {
    const { state: { description }, methods: { updateState }, loading } = useContext(productContext)
    const [Update, setUpdate] = useState(' ')

    useEffect(() => !Update && setUpdate(description), [description])

    return (
        <VStack align="stretch" position={"relative"} spacing={1}>
            <FieldLabel label='Description' isRequired loading={loading} />
            <AppSkeleton isLoaded={loading}>
                <Box className={classes.editor}>
                    <Editor
                        apiKey='your-api-key'
                        onEditorChange={(el: any) => updateState('description', el)}
                        initialValue={Update}
                        init={{
                            skin: "oxide-dark",
                            content_css: "dark",
                            height: 400,
                            placeholder: 'Stylish, and Comfortable Long Sleeve T-Shirt...',
                            menubar: false,
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount', 'importcss'
                            ],
                            toolbar: 'undo redo | blocks | ' +
                                'bold italic forecolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent table',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px; background: #141414 } .mce-content-body[data-mce-placeholder]:not(.mce-visualblocks)::before {color: #777}',
                        }}
                    />
                </Box>
            </AppSkeleton>
        </VStack>
    )
}

export default DescriptionProduct