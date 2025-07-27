import { BlockNoteView } from '@blocknote/mantine'
import { useCreateBlockNote } from '@blocknote/react'
import { Box } from '@chakra-ui/react'
import { ChangelogEntry } from 'services/changelog/interfaces'
import React from 'react'
import { parseBlocknoteTexteditorContent } from 'utils/helpers/blocknoteUtils'

interface Props {
    changelogItem: ChangelogEntry
}

function ChangelogEditor({ changelogItem }: Props) {
    const initialContent = parseBlocknoteTexteditorContent(changelogItem.description)

    const editor = useCreateBlockNote({
        initialContent: initialContent.length > 0 ? initialContent : undefined
    })

    return (
        <Box
            sx={{
                '.bn-editor': {
                    paddingInline: '0px',
                    backgroundColor: 'transparent'
                }
            }}
        >
            <BlockNoteView editor={editor} editable={false} />
        </Box>
    )
}

export default ChangelogEditor