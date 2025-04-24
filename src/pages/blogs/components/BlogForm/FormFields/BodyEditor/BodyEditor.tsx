import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import useBlogForm from 'pages/blogs/hooks/useBlogForm';
import React from 'react';
import "./styles.css";

function BodyEditor() {
    const { values, setFieldValue } = useBlogForm()
    const editor = useCreateBlockNote({ initialContent: values.content })

    return (
        <BlockNoteView
            editor={editor}
            onChange={() => setFieldValue("content", editor.document)}
            data-theming-css-variables-demo
        />
    )
}

export default BodyEditor