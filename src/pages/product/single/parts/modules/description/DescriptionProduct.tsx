import { Box, VStack } from '@chakra-ui/react';
import { Editor } from '@tinymce/tinymce-react';
import FieldLabel from 'components/common/form/fieldLabel/FieldLabel';
import AppSkeleton from 'components/common/skeleton/AppSkeleton';
import { productContext } from 'pages/product/single/context';
import React, { useContext, useEffect, useState } from 'react';
import classes from './style.module.scss';

function DescriptionProduct() {
    const { state: { description }, methods: { updateState }, loading, productID, store: { state: { product_printful } } } = useContext(productContext)
    const [Update, setUpdate] = useState(' ')

    useEffect(() => product_printful && description === `<p>${product_printful?.description}</p>` && setUpdate(product_printful?.description), [product_printful?.description, description])

    useEffect(() => (!Update || Update === ' ') && productID && setUpdate(description), [description, productID])

    return (
        <VStack align="stretch" position={"relative"} spacing={1}>
            <FieldLabel label='Description' isRequired loading={loading} />
            <AppSkeleton isLoaded={loading}>
                <Box className={classes.editor}>
                    <Editor
                        onEditorChange={(el: any) => updateState('description', el)}
                        apiKey='6pfzx71rzzdg48m2qr77o5du3ueym435j2nxhsjnqc6e18s3'
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
                                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount', 'importcss', 'image'
                            ],
                            toolbar: 'undo redo | blocks | ' +
                                'bold italic forecolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent table image',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px; background: #141414 } .mce-content-body[data-mce-placeholder]:not(.mce-visualblocks)::before {color: #777}',
                        }}
                    />
                </Box>
            </AppSkeleton>
        </VStack>
    )
}

export default DescriptionProduct