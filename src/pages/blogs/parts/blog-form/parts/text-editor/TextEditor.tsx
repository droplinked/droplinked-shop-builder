import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { Flex } from '@chakra-ui/react';
import FieldLabel from 'components/common/form/fieldLabel/FieldLabel';
import React from 'react';

interface Props {
    initialContent: any,
    updateBlog: (document: any) => void
}

function TextEditor({ initialContent, updateBlog }: Props) {
    const editor = useCreateBlockNote({ initialContent })

    return (
        <Flex direction={"column"} gap={3}>
            <FieldLabel isRequired label={"Content"} />
            <BlockNoteView editor={editor} onChange={() => updateBlog(editor.document)} />
        </Flex>
    )
}

export default TextEditor