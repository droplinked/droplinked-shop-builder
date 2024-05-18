import { Box, Flex } from '@chakra-ui/react';
import { Editor } from '@tinymce/tinymce-react';
import FieldLabel from 'components/common/form/fieldLabel/FieldLabel';
import React from 'react';
import styles from "./styles.module.scss";

interface Props {
    initialContent: any,
    updateBlog: (document: any) => void
}

function TextEditor({ initialContent, updateBlog }: Props) {
    return (
        <Flex direction={"column"} gap={3}>
            <FieldLabel isRequired label={"Content"} />
            <Box className={styles.editor}>
                <Editor
                    onEditorChange={(e: any) => updateBlog(e)}
                    apiKey='6pfzx71rzzdg48m2qr77o5du3ueym435j2nxhsjnqc6e18s3'
                    value={initialContent}
                    init={{
                        skin: "oxide-dark",
                        content_css: "dark",
                        height: 400,
                        placeholder: 'Share your thoughts, ideas and stories here...',
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
        </Flex>
    )
}

export default TextEditor