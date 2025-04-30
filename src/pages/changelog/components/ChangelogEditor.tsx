import { BlockNoteView } from '@blocknote/mantine'
import { useCreateBlockNote } from '@blocknote/react'
import { ChangelogEntry } from 'lib/apis/changelog/interfaces'
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

    return <BlockNoteView editor={editor} editable={false} />
}

export default ChangelogEditor