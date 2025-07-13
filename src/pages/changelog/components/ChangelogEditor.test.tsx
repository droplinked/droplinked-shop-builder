import { useCreateBlockNote } from '@blocknote/react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import type { ChangelogEntry } from 'services/changelog/interfaces'
import React from 'react'
import { parseBlocknoteTexteditorContent } from 'utils/helpers/blocknoteUtils'
import ChangelogEditor from './ChangelogEditor'

// mock the parse helper
jest.mock('utils/helpers/blocknoteUtils', () => ({
    __esModule: true,
    parseBlocknoteTexteditorContent: jest.fn()
}))

// mock the BlockNoteView component
jest.mock('@blocknote/mantine', () => ({
    __esModule: true,
    BlockNoteView: ({ editable }: { editable: boolean }) => (
        <div data-testid='blocknote-view' data-editable={String(editable)} />
    )
}))

// mock the useCreateBlockNote hook
jest.mock('@blocknote/react', () => ({
    __esModule: true,
    useCreateBlockNote: jest.fn()
}))

// mock Chakra’s Box
jest.mock('@chakra-ui/react', () => ({
    __esModule: true,
    Box: ({ children }: { children: React.ReactNode }) => (
        <div data-testid='box'>{children}</div>
    )
}))

describe('ChangelogEditor', () => {
    const sampleEntry: ChangelogEntry = {
        _id: '1',
        title: 'Test',
        summary: 'Summary',
        description: 'desc',
        tags: [],
        version: '1.0.0',
        date: '2025-05-11'
    }
    const mockParse = parseBlocknoteTexteditorContent as jest.Mock
    const mockUseCreate = useCreateBlockNote as jest.Mock

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('passes non-empty initialContent to useCreateBlockNote and renders BlockNoteView', () => {
        // Arrange
        const content = [{ type: 'paragraph', children: [] }]
        mockParse.mockReturnValue(content)
        const fakeEditor = { editorId: 'x' }
        mockUseCreate.mockReturnValue(fakeEditor)

        // Act
        render(<ChangelogEditor changelogItem={sampleEntry} />)

        // Assert hook call
        expect(mockParse).toHaveBeenCalledWith(sampleEntry.description)
        expect(mockUseCreate).toHaveBeenCalledWith({ initialContent: content })

        // Assert rendering
        const box = screen.getByTestId('box')
        expect(box).toBeInTheDocument()
        const view = screen.getByTestId('blocknote-view')
        expect(view).toHaveAttribute('data-editable', 'false')
    })

    it('passes undefined initialContent to useCreateBlockNote when parsed content is empty', () => {
        // Arrange
        mockParse.mockReturnValue([])
        const fakeEditor = {}
        mockUseCreate.mockReturnValue(fakeEditor)

        // Act
        render(<ChangelogEditor changelogItem={sampleEntry} />)

        // Assert hook call
        expect(mockParse).toHaveBeenCalledWith(sampleEntry.description)
        expect(mockUseCreate).toHaveBeenCalledWith({ initialContent: undefined })

        // Assert rendering
        expect(screen.getByTestId('blocknote-view')).toBeInTheDocument()
    })
})
