import "@blocknote/core/fonts/inter.css"
import { BlockNoteView } from "@blocknote/mantine"
import "@blocknote/mantine/style.css"
import { useCreateBlockNote } from "@blocknote/react"
import FormFieldWrapper from "components/redesign/form-field-wrapper/FormFieldWrapper"
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import useBlogForm from 'pages/blogs/hooks/useBlogForm'
import React from 'react'

function BodyEditor() {
    const { values, errors, setFieldValue } = useBlogForm()
    const { t } = useLocaleResources("blogs")
    const editor = useCreateBlockNote({ initialContent: JSON.parse(values.content) })

    const formFieldWrapperStyles = {
        '& .bn-editor': {
            width: '100%',
            maxWidth: '100%',
            minHeight: '176px',
            border: '1px solid',
            borderColor: 'neutral.gray.800',
            borderRadius: '8px',
            transition: 'border-color 0.1s ease-out'
        },
        '& .bn-editor:hover': {
            borderColor: 'neutral.gray.700'
        },
        '& [data-theme="custom-dark"]': {
            '--bn-colors-editor-background': 'transparent'
        }
    }

    return (
        <FormFieldWrapper
            label={t("BodyEditor.label")}
            description={t("BodyEditor.description")}
            errorMessage={errors.content?.toString() ?? ""}
            isRequired
            sx={formFieldWrapperStyles}
        >
            <BlockNoteView
                editor={editor}
                onChange={() => setFieldValue("content", JSON.stringify(editor.document))}
                data-theme="custom-dark"
            />
        </FormFieldWrapper>
    )
}

export default BodyEditor