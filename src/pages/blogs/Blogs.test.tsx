import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blogs from './Blogs'

jest.mock('react-router-dom', () => ({
    __esModule: true,
    useNavigate: jest.fn()
}))

jest.mock('hooks/debounce/useDebounce', () => ({
    __esModule: true,
    default: jest.fn()
}))

jest.mock('assets/icons/Sign/Plus/PlusMd', () => {
    const React = require('react')
    return {
        __esModule: true,
        PlusMd: props => React.createElement('span', { 'data-testid': 'plus-icon', ...props })
    }
})

jest.mock('components/redesign/page-grid/PageGrid', () => {
    const React = require('react')
    const PageGrid = {
        Root: ({ children }) =>
            React.createElement('div', { 'data-testid': 'pagegrid-root' }, children),
        Header: ({ title, description, actionButtons }) =>
            React.createElement(
                'div',
                { 'data-testid': 'pagegrid-header' },
                React.createElement('h1', null, title),
                React.createElement('p', null, description),
                actionButtons.map(btn =>
                    React.createElement(
                        'button',
                        { key: btn.title, 'data-testid': 'new-post', onClick: btn.onClick },
                        btn.title
                    )
                )
            ),
        Actions: ({ search }) =>
            React.createElement(
                'div',
                { 'data-testid': 'pagegrid-actions' },
                React.createElement('input', {
                    'data-testid': 'search-input',
                    value: search.value,
                    onChange: search.onChange
                })
            ),
        Content: ({ children }) =>
            React.createElement('div', { 'data-testid': 'pagegrid-content' }, children)
    }
    return { __esModule: true, default: PageGrid }
})

jest.mock('./components/BlogTable/BlogTable', () => {
    const React = require('react')
    return {
        __esModule: true,
        default: ({ searchTerm }) =>
            React.createElement('div', {
                'data-testid': 'blog-table',
                'data-search-term': searchTerm
            })
    }
})

describe('Blogs page', () => {
    const useNavigate = require('react-router-dom').useNavigate as jest.Mock
    const useDebounce = require('hooks/debounce/useDebounce').default as jest.Mock
    let navigateMock: jest.Mock

    beforeEach(() => {
        jest.clearAllMocks()
        navigateMock = jest.fn()
        useNavigate.mockReturnValue(navigateMock)
        // identity debounce: return the value immediately
        useDebounce.mockImplementation(value => value)
    })

    it('navigates to "new" when New Post button is clicked', async () => {
        render(<Blogs />)
        const newPostBtn = screen.getByTestId('new-post')
        await userEvent.click(newPostBtn)
        expect(navigateMock).toHaveBeenCalledWith('new')
    })

    it('passes debounced searchTerm to BlogTable', async () => {
        render(<Blogs />)

        const searchInput = screen.getByTestId('search-input')
        const table = screen.getByTestId('blog-table')

        // initial
        expect(table).toHaveAttribute('data-search-term', '')

        await userEvent.type(searchInput, 'test')

        await waitFor(() => {
            expect(table).toHaveAttribute('data-search-term', 'test')
        })
    })
})
