import '@testing-library/jest-dom'
import { render, screen, within } from '@testing-library/react'
import useIntersectionObserver from 'hooks/intersection-observer/useIntersectionObserver'
import type { ChangelogEntry } from 'services/changelog/interfaces'
import React from 'react'
import Changelog from './Changelog'
import useChangelogEntries from './hooks/useChangelogEntries'

jest.mock('components/redesign/page-grid/PageGrid', () => {
    const React = require('react')
    return {
        __esModule: true,
        default: {
            Root: ({ children }: { children: React.ReactNode }) =>
                React.createElement('div', { 'data-testid': 'pagegrid-root' }, children),
            Header: ({ title, description }: { title: string; description: string }) =>
                React.createElement(
                    'div',
                    { 'data-testid': 'pagegrid-header' },
                    React.createElement('h1', null, title),
                    React.createElement('p', null, description)
                )
        }
    }
})

jest.mock('hooks/intersection-observer/useIntersectionObserver', () => ({
    __esModule: true,
    default: jest.fn()
}))

jest.mock('./components/ChangelogEntryCard', () => {
    const React = require('react')
    return {
        __esModule: true,
        default: React.forwardRef((props: any, ref: any) => {
            const { entry } = props
            return React.createElement(
                'div',
                {
                    'data-testid': 'entry-card',
                    'data-id': entry._id,
                    'data-has-ref': ref ? 'true' : 'false',
                    ref
                },
                entry.title
            )
        })
    }
})

jest.mock('./components/ChangelogEntryLoading', () => {
    const React = require('react')
    return {
        __esModule: true,
        ChangelogEntryLoading: ({ count }: { count: number }) =>
            React.createElement('div', { 'data-testid': 'entry-loading', 'data-count': count }, null)
    }
})

jest.mock('./components/ChangelogError', () => {
    const React = require('react')
    return {
        __esModule: true,
        ChangelogError: ({ error }: { error: unknown }) =>
            React.createElement('div', { 'data-testid': 'changelog-error' }, String(error))
    }
})

jest.mock('./components/ChangelogGrid', () => {
    const React = require('react')
    return {
        __esModule: true,
        ChangelogGrid: ({ children }: { children: React.ReactNode }) =>
            React.createElement('div', { 'data-testid': 'changelog-grid' }, children)
    }
})

jest.mock('./hooks/useChangelogEntries', () => ({
    __esModule: true,
    default: jest.fn()
}))

describe('Changelog', () => {
    const sampleEntries = [
        { _id: '1', title: 'Entry 1' },
        { _id: '2', title: 'Entry 2' }
    ] as ChangelogEntry[]

    let mockObserver: jest.Mock
    let mockFetchNextPage: jest.Mock

    beforeEach(() => {
        jest.clearAllMocks()
        mockObserver = jest.fn()
            ; (useIntersectionObserver as jest.Mock).mockReturnValue(mockObserver)
        mockFetchNextPage = jest.fn()
    })

    it('renders error when isError is true', () => {
        ; (useChangelogEntries as jest.Mock).mockReturnValue({
            data: undefined,
            isFetching: false,
            hasNextPage: false,
            fetchNextPage: mockFetchNextPage,
            isFetchingNextPage: false,
            isError: true,
            error: 'oops'
        })
        render(<Changelog />)
        expect(screen.getByTestId('changelog-error')).toBeInTheDocument()
    })

    it('renders loading when fetching with no entries', () => {
        ; (useChangelogEntries as jest.Mock).mockReturnValue({
            data: { pages: [] },
            isFetching: true,
            hasNextPage: false,
            fetchNextPage: mockFetchNextPage,
            isFetchingNextPage: false,
            isError: false,
            error: null
        })
        render(<Changelog />)
        expect(screen.getByTestId('entry-loading')).toBeInTheDocument()
    })

    it('renders entries inside a grid when data available', () => {
        ; (useChangelogEntries as jest.Mock).mockReturnValue({
            data: { pages: [{ data: { data: [sampleEntries[0]] } }] },
            isFetching: false,
            hasNextPage: false,
            fetchNextPage: mockFetchNextPage,
            isFetchingNextPage: false,
            isError: false,
            error: null
        })
        render(<Changelog />)
        expect(screen.getByTestId('pagegrid-root')).toBeInTheDocument()
        expect(screen.getByTestId('pagegrid-header')).toBeInTheDocument()
        expect(screen.getByTestId('changelog-grid')).toBeInTheDocument()
        const cards = screen.getAllByTestId('entry-card')
        expect(cards).toHaveLength(1)
        expect(cards[0]).toHaveTextContent('Entry 1')
        expect(cards[0]).toHaveAttribute('data-has-ref', 'true')
        expect(cards[0]).toHaveAttribute('data-id', '1')
    })

    it('calls intersection observer with correct deps', () => {
        ; (useChangelogEntries as jest.Mock).mockReturnValue({
            data: { pages: [{ data: { data: sampleEntries } }] },
            isFetching: false,
            hasNextPage: true,
            fetchNextPage: mockFetchNextPage,
            isFetchingNextPage: false,
            isError: false,
            error: null
        })
        render(<Changelog />)
        expect(useIntersectionObserver).toHaveBeenCalledWith(expect.any(Function), [
            true,
            mockFetchNextPage
        ])
    })

    it('renders next page loading when isFetchingNextPage is true', () => {
        ; (useChangelogEntries as jest.Mock).mockReturnValue({
            data: { pages: [{ data: { data: sampleEntries } }] },
            isFetching: false,
            hasNextPage: false,
            fetchNextPage: mockFetchNextPage,
            isFetchingNextPage: true,
            isError: false,
            error: null
        })
        render(<Changelog />)
        const grid = screen.getByTestId('changelog-grid')
        const loading = within(grid).getByTestId('entry-loading')
        expect(loading).toBeInTheDocument()
    })
})