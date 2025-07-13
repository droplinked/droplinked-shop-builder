import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import BlogEditPage from './BlogEditPage'

jest.mock('react-router-dom', () => ({
    __esModule: true,
    useNavigate: jest.fn()
}))

jest.mock('hooks/toast/useToast', () => ({
    __esModule: true,
    default: jest.fn()
}))

jest.mock('services/blog/services', () => ({
    __esModule: true,
    updateBlogService: jest.fn()
}))

jest.mock('components/redesign/fullscreen-loading/FullScreenLoading', () => {
    const React = require('react')
    return {
        __esModule: true,
        default: () => React.createElement('div', { 'data-testid': 'fullscreen-loading' })
    }
})

jest.mock('../hooks/useBlog', () => ({
    __esModule: true,
    default: jest.fn()
}))

jest.mock('./BlogForm/BlogForm', () => {
    const React = require('react')
    return {
        __esModule: true,
        default: ({ blog, onSubmit }) =>
            React.createElement(
                'button',
                {
                    'data-testid': 'edit-submit',
                    onClick: () => onSubmit(blog)
                },
                'Submit'
            )
    }
})

describe('BlogEditPage', () => {
    const useNavigate = require('react-router-dom').useNavigate as jest.Mock
    const useAppToast = require('hooks/toast/useToast').default as jest.Mock
    const updateService = require('services/blog/services').updateBlogService as jest.Mock
    const useBlog = require('../hooks/useBlog').default as jest.Mock

    let navigate: jest.Mock
    let showToast: jest.Mock

    beforeEach(() => {
        jest.clearAllMocks()
        navigate = jest.fn()
        useNavigate.mockReturnValue(navigate)
        showToast = jest.fn()
        useAppToast.mockReturnValue({ showToast })
    })

    it('renders loading state when fetching', () => {
        useBlog.mockReturnValue({ isFetching: true, data: undefined })
        render(<BlogEditPage />)
        expect(screen.getByTestId('fullscreen-loading')).toBeInTheDocument()
    })

    it('renders BlogForm and submits update on click', async () => {
        const blogData = { _id: '42', title: 'T', content: '', image: '', category: '', isFeatured: false, isVisible: true, tags: [], searchEngineSummary: '', slug: '' }
        useBlog.mockReturnValue({ isFetching: false, data: { data: blogData } })

        updateService.mockResolvedValueOnce({})
        render(<BlogEditPage />)

        await userEvent.click(screen.getByTestId('edit-submit'))
        await waitFor(() => {
            expect(updateService).toHaveBeenCalledWith(blogData)
            expect(showToast).toHaveBeenCalledWith({ type: 'success', message: 'Blog updated successfully' })
            expect(navigate).toHaveBeenCalledWith('/analytics/blogs')
        })
    })

    it('shows error toast on update failure and does not navigate', async () => {
        const blogData = { _id: '99', title: 'Fail', content: '', image: '', category: '', isFeatured: false, isVisible: false, tags: [], searchEngineSummary: '', slug: '' }
        useBlog.mockReturnValue({ isFetching: false, data: { data: blogData } })

        updateService.mockRejectedValueOnce(new Error('err'))
        render(<BlogEditPage />)

        await userEvent.click(screen.getByTestId('edit-submit'))
        await waitFor(() => {
            expect(updateService).toHaveBeenCalledWith(blogData)
            expect(showToast).toHaveBeenCalledWith({ type: 'error', message: 'Failed to update blog' })
            expect(navigate).not.toHaveBeenCalled()
        })
    })
})
