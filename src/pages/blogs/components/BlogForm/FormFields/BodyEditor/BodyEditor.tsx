import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import FormFieldWrapper from "components/redesign/form-field-wrapper/FormFieldWrapper";
import useBlogForm from 'pages/blogs/hooks/useBlogForm';
import React from 'react';
import "./styles.css";

function BodyEditor() {
    const { values, errors, setFieldValue } = useBlogForm()
    const editor = useCreateBlockNote({ initialContent: JSON.parse(values.content) })

    return (
        <FormFieldWrapper
            label="Body"
            description="Write detailed and engaging content to inform and captivate readers."
            errorMessage={errors.content?.toString() ?? ""}
            isRequired
        >
            <BlockNoteView
                editor={editor}
                onChange={() => setFieldValue("content", JSON.stringify(editor.document))}
                data-theming-css-variables-demo
            />
        </FormFieldWrapper>
    )
}

export default BodyEditor