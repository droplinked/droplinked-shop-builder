import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useBlogs from 'pages/blogs/hooks/useBlogs'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import BlogTable from './BlogTable'

jest.mock('react-router-dom', () => ({
    __esModule: true,
    useNavigate: jest.fn()
}))

jest.mock('@chakra-ui/react', () => {
    const React = require('react')
    return {
        __esModule: true,
        Flex: ({ as = 'div', children, ...rest }) =>
            React.createElement(as, { 'data-testid': 'flex', ...rest }, children),
        Text: ({ children, ...rest }) =>
            React.createElement('span', { 'data-testid': 'text', ...rest }, children)
    }
})

jest.mock('components/common/image/AppImage', () => {
    const React = require('react')
    return {
        __esModule: true,
        default: props => React.createElement('img', { 'data-testid': 'app-image', ...props })
    }
})

jest.mock('components/redesign/badge/AppBadge', () => {
    const React = require('react')
    return {
        __esModule: true,
        default: props => React.createElement('div', { 'data-testid': 'app-badge', ...props })
    }
})

jest.mock('components/redesign/table/Table', () => {
    const React = require('react')
    const Table = ({ isLoading, data, renderActions }) =>
        React.createElement(
            'div',
            { 'data-testid': 'table', 'data-loading': isLoading },
            data.map(item =>
                React.createElement('div', { key: item._id, 'data-testid': 'row' }, renderActions(item))
            )
        )
    return {
        __esModule: true,
        default: Table
    }
})

jest.mock('./BlogTableEmptyState', () => {
    const React = require('react')
    const Empty = () =>
        React.createElement('div', { 'data-testid': 'empty-state' }, 'No Blogs')
    return {
        __esModule: true,
        default: Empty
    }
})

jest.mock('./BlogTableActionMenu', () => {
    const React = require('react')
    return {
        __esModule: true,
        default: () => React.createElement('div', { 'data-testid': 'action-menu' })
    }
})

jest.mock('assets/icons/Action/Edit/EditLg', () => {
    const React = require('react')
    return {
        __esModule: true,
        EditLg: props => React.createElement('svg', { 'data-testid': 'edit-lg', ...props })
    }
})

jest.mock('pages/blogs/hooks/useBlogs', () => ({
    __esModule: true,
    default: jest.fn()
}))

describe('BlogTable', () => {
    let mockNavigate

    beforeEach(() => {
        mockNavigate = jest.fn()
        useNavigate.mockReturnValue(mockNavigate)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('renders empty state when not fetching and no blog posts', () => {
        useBlogs.mockReturnValue({ isFetching: false, data: undefined })
        render(<BlogTable searchTerm='' />)
        expect(screen.getByTestId('empty-state')).toBeInTheDocument()
    })

    it('renders table with loading state when fetching', () => {
        useBlogs.mockReturnValue({
            isFetching: true,
            data: undefined,
            hasNextPage: false,
            fetchNextPage: jest.fn(),
            isFetchingNextPage: false
        })
        render(<BlogTable searchTerm='test' />)
        const table = screen.getByTestId('table')
        expect(table).toBeInTheDocument()
        expect(table).toHaveAttribute('data-loading', 'true')
    })

    it('renders table rows and actions for each blog post', async () => {
        const sampleBlogs = [
            { _id: '1', image: 'img1', title: 'Title 1', category: 'Cat1', createdAt: '2025-05-10T00:00:00Z', isVisible: true },
            {
                _id: '2',
                image: 'img2',
                title: 'A Very Long Title That Needs Truncation Should Be More Than 25 Characters',
                category: 'Cat2',
                createdAt: '2025-05-11T00:00:00Z',
                isVisible: false
            }
        ]
        useBlogs.mockReturnValue({
            isFetching: false,
            data: { pages: [{ data: { data: sampleBlogs } }] },
            hasNextPage: true,
            fetchNextPage: jest.fn(),
            isFetchingNextPage: false
        })
        render(<BlogTable searchTerm='test' />)
        const rows = screen.getAllByTestId('row')
        expect(rows).toHaveLength(sampleBlogs.length)
        for (let i = 0; i < sampleBlogs.length; i++) {
            const editButton = within(rows[i]).getByRole('button')
            await userEvent.click(editButton)
            expect(mockNavigate).toHaveBeenCalledWith(sampleBlogs[i]._id)
        }
    })
})
