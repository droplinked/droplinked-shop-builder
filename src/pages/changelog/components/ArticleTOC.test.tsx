import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import type { ChangelogEntry } from 'lib/apis/changelog/interfaces'
import React from 'react'
import { extractHeadings, parseBlocknoteTexteditorContent } from 'utils/helpers/blocknoteUtils'
import ArticleTOC from './ArticleTOC'

jest.mock('@chakra-ui/react', () => ({
    __esModule: true,
    Flex: ({ children, ...props }) => (
        <div
            data-testid='flex'
            {...Object.fromEntries(
                Object.entries(props).map(([k, v]) => [`data-${k}`, String(v)])
            )}
        >
            {children}
        </div>
    ),
    Box: ({ children, className, onClick }) => (
        <div
            data-testid='toc-item'
            data-classname={className}
            onClick={onClick}
        >
            {children}
        </div>
    )
}))

jest.mock('assets/icons/Navigation/List/ListMd', () => ({
    __esModule: true,
    ListMd: props => <svg data-testid='ListMd' {...props} />
}))

jest.mock('./SectionHeader', () => ({
    __esModule: true,
    default: ({ icon, title }) => (
        <div data-testid='section-header'>
            <div data-testid='section-header-icon'>{icon}</div>
            <h3>{title}</h3>
        </div>
    )
}))

jest.mock('utils/helpers/blocknoteUtils', () => ({
    __esModule: true,
    parseBlocknoteTexteditorContent: jest.fn(),
    extractHeadings: jest.fn()
}))

describe('ArticleTOC', () => {
    const sampleItem: ChangelogEntry = {
        _id: '1',
        title: 'foo',
        summary: 'bar',
        description: 'baz',
        tags: [],
        version: '0.0.1',
        date: '2025-05-11'
    }
    const mockParse = parseBlocknoteTexteditorContent as jest.Mock
    const mockExtract = extractHeadings as jest.Mock

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('returns null when no headings extracted', () => {
        mockParse.mockReturnValue('ignored')
        mockExtract.mockReturnValue([])
        const { container } = render(<ArticleTOC changelogItem={sampleItem} />)
        expect(container.firstChild).toBeNull()
    })

    it('renders header and list items when headings available', () => {
        mockParse.mockReturnValue('ignored')
        const headings = [
            { id: 'h1', text: 'Heading 1' },
            { id: 'h2', text: 'Heading 2' }
        ]
        mockExtract.mockReturnValue(headings)
        render(<ArticleTOC changelogItem={sampleItem} />)
        expect(screen.getByTestId('section-header')).toBeInTheDocument()
        expect(screen.getByTestId('ListMd')).toBeInTheDocument()
        const items = screen.getAllByTestId('toc-item')
        expect(items).toHaveLength(headings.length)
        headings.forEach((h, i) => {
            expect(items[i]).toHaveTextContent(h.text)
        })
    })

    it('clicking item scrolls to heading and sets active class', () => {
        mockParse.mockReturnValue('ignored')
        const headings = [
            { id: 'h1', text: 'Heading 1' },
            { id: 'h2', text: 'Heading 2' }
        ]
        mockExtract.mockReturnValue(headings)
        const spies: Record<string, jest.Mock> = {}
        headings.forEach(h => {
            const el = document.createElement('div')
            el.setAttribute('data-id', h.id)
            el.scrollIntoView = jest.fn()
            document.body.appendChild(el)
            spies[h.id] = el.scrollIntoView as jest.Mock
        })
        render(<ArticleTOC changelogItem={sampleItem} />)
        const items = screen.getAllByTestId('toc-item')
        fireEvent.click(items[1])
        expect(spies['h2']).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' })
        expect(items[1]).toHaveAttribute('data-classname', 'active')
    })

    it('initially sets active to first heading in view', () => {
        mockParse.mockReturnValue('ignored')
        const headings = [
            { id: 'h1', text: 'Heading 1' },
            { id: 'h2', text: 'Heading 2' }
        ]
        mockExtract.mockReturnValue(headings)
        headings.forEach(h => {
            const el = document.createElement('div')
            el.setAttribute('data-id', h.id)
            el.getBoundingClientRect = () => ({ top: 0, bottom: 10, left: 0, right: 0, width: 0, height: 0, x: 0, y: 0, toJSON: () => { } })
            document.body.appendChild(el)
        })
        render(<ArticleTOC changelogItem={sampleItem} />)
        const items = screen.getAllByTestId('toc-item')
        expect(items[0]).toHaveAttribute('data-classname', 'active')
        expect(items[1]).toHaveAttribute('data-classname', '')
    })
})
