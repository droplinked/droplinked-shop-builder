import { BlockNoteView } from '@blocknote/mantine'
import { useCreateBlockNote } from '@blocknote/react'
import { ChangelogEntry } from 'lib/apis/changelog/interfaces'
import React, { useMemo } from 'react'

interface Props {
    changelogItem: ChangelogEntry
}

function ChangelogEditor({ changelogItem }: Props) {
    const initialContent = useMemo(() => {
        try {
            const parsed = typeof changelogItem.description === "string"
                ? JSON.parse(changelogItem.description)
                : changelogItem.description
            if (!Array.isArray(parsed)) {
                console.warn("Parsed content is not an array:", parsed)
                return []
            }
            return parsed
        } catch (error) {
            console.error("Failed to parse blog content:", error)
            return []
        }
    }, [changelogItem.description])

    const editor = useCreateBlockNote({
        initialContent: initialContent.length > 0 ? initialContent : undefined,
    })

    return <BlockNoteView editor={editor} editable={false} />
}

export default ChangelogEditor