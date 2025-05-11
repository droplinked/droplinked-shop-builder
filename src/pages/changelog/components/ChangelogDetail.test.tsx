import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import type { ChangelogEntry } from 'lib/apis/changelog/interfaces'
import React from 'react'
import { formatDateToLongStyle } from 'utils/helpers'
import useChangelogEntry from '../hooks/useChangelogEntry'
import ChangelogDetail from './ChangelogDetail'

jest.mock('components/redesign/dot-separated-list/DotSeparatedList', () => ({
    __esModule: true,
    default: ({ children }) => (
        <ul data-testid='dot-separated-list'>
            {children}
        </ul>
    )
}))

jest.mock('components/redesign/fullscreen-loading/FullScreenLoading', () => ({
    __esModule: true,
    default: () => <div data-testid='fullscreen-loading' />
}))

jest.mock('../hooks/useChangelogEntry', () => ({
    __esModule: true,
    default: jest.fn()
}))

jest.mock('utils/helpers', () => ({
    __esModule: true,
    formatDateToLongStyle: jest.fn()
}))

jest.mock('./ArticleTOC', () => ({
    __esModule: true,
    default: () => <div data-testid='article-toc' />
}))

jest.mock('./ChangelogEditor', () => ({
    __esModule: true,
    default: () => <div data-testid='changelog-editor' />
}))

jest.mock('./ChangelogTags', () => ({
    __esModule: true,
    default: () => <div data-testid='changelog-tags' />
}))

jest.mock('@chakra-ui/react', () => ({
    __esModule: true,
    Box: ({ children, ...props }) => (
        <div data-testid='box' {...Object.fromEntries(Object.entries(props).map(([k, v]) => [`data-${k}`, String(v)]))}>
            {children}
        </div>
    ),
    Grid: ({ children, ...props }) => (
        <div data-testid='grid' {...Object.fromEntries(Object.entries(props).map(([k, v]) => [`data-${k}`, String(v)]))}>
            {children}
        </div>
    ),
    GridItem: ({ children, ...props }) => (
        <div data-testid='grid-item' {...Object.fromEntries(Object.entries(props).map(([k, v]) => [`data-${k}`, String(v)]))}>
            {children}
        </div>
    ),
    Heading: ({ children, ...props }) => (
        <h2 data-testid='heading' {...Object.fromEntries(Object.entries(props).map(([k, v]) => [`data-${k}`, String(v)]))}>
            {children}
        </h2>
    ),
    Text: ({ children, ...props }) => (
        <span data-testid='text' {...Object.fromEntries(Object.entries(props).map(([k, v]) => [`data-${k}`, String(v)]))}>
            {children}
        </span>
    )
}))

describe('ChangelogDetail', () => {
    const sampleChangelog: { data: ChangelogEntry } = {
        data: {
            _id: '1',
            title: 'Test Title',
            summary: 'Summary',
            description: 'Desc',
            tags: ['A', 'B'],
            version: '1.0.0',
            date: '2025-05-11'
        }
    }

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('renders FullScreenLoading when fetching', () => {
        ; (useChangelogEntry as jest.Mock).mockReturnValue({ isFetching: true, data: undefined })
        render(<ChangelogDetail />)
        expect(screen.getByTestId('fullscreen-loading')).toBeInTheDocument()
    })

    it('renders detail view when data available', () => {
        ; (useChangelogEntry as jest.Mock).mockReturnValue({ isFetching: false, data: sampleChangelog })
            ; (formatDateToLongStyle as jest.Mock).mockReturnValue('May 11, 2025')

        render(<ChangelogDetail />)

        // heading title
        expect(screen.getByRole('heading', { level: 2, name: 'Test Title' })).toBeInTheDocument()

        // dot-separated list with version and date
        const list = screen.getByTestId('dot-separated-list')
        expect(list).toBeInTheDocument()
        expect(screen.getByText('Version 1.0.0')).toBeInTheDocument()
        expect(screen.getByText('May 11, 2025')).toBeInTheDocument()

        // editor component
        expect(screen.getByTestId('changelog-editor')).toBeInTheDocument()

        // table of contents
        expect(screen.getByTestId('article-toc')).toBeInTheDocument()

        // tags appear twice (mobile & desktop)
        const tags = screen.getAllByTestId('changelog-tags')
        expect(tags).toHaveLength(2)
    })
})