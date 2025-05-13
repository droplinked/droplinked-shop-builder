import { Block } from '@blocknote/core'

export type Heading = { id: string, level: number, text: string }

export const parseBlocknoteTexteditorContent = (description: string | Block[]): Block[] => {
    try {
        const parsed = typeof description === "string"
            ? JSON.parse(description)
            : description

        if (!Array.isArray(parsed)) return []

        return parsed
    }
    catch (error) {
        return []
    }
}

export const extractHeadings = (blocks: Block[]) => {
    const headings: Heading[] = []

    const traverseBlocks = (block: Block) => {
        if (block.type === "heading" && block.props.level && block.content) {
            const textContent = block.content
                .map((inline) => ("text" in inline ? inline.text : ""))
                .join("")
            headings.push({
                id: block.id,
                level: block.props.level,
                text: textContent,
            })
        }
        if (block.children) block.children.forEach(traverseBlocks)
    }

    blocks.forEach((block) => traverseBlocks(block))
    return headings
}