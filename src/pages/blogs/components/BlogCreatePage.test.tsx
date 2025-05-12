import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import BlogCreatePage from './BlogCreatePage'

jest.mock('react-router-dom', () => ({
    __esModule: true,
    useNavigate: jest.fn()
}))

jest.mock('hooks/toast/useToast', () => ({
    __esModule: true,
    default: jest.fn()
}))

jest.mock('lib/apis/blog/services', () => ({
    __esModule: true,
    createBlogService: jest.fn()
}))

jest.mock('./BlogForm/BlogForm', () => {
    const React = require('react')
    return {
        __esModule: true,
        default: ({ onSubmit }) =>
            React.createElement(
                'button',
                {
                    'data-testid': 'submit-button',
                    onClick: () =>
                        onSubmit({ _id: '1', title: 'T', content: '', image: '', category: '', isFeatured: false, isVisible: false, tags: [], searchEngineSummary: '', slug: '' })
                },
                'Submit'
            )
    }
})

describe('BlogCreatePage', () => {
    const useNavigate = require('react-router-dom').useNavigate as jest.Mock
    const useAppToast = require('hooks/toast/useToast').default as jest.Mock
    const createService = require('lib/apis/blog/services').createBlogService as jest.Mock

    let navigate: jest.Mock
    let showToast: jest.Mock

    beforeEach(() => {
        jest.clearAllMocks()
        navigate = jest.fn()
        useNavigate.mockReturnValue(navigate)
        showToast = jest.fn()
        useAppToast.mockReturnValue({ showToast })
    })

    it('creates blog, shows success toast, and navigates on success', async () => {
        createService.mockResolvedValueOnce({})
        render(<BlogCreatePage />)
        await userEvent.click(screen.getByTestId('submit-button'))
        await waitFor(() => {
            expect(createService).toHaveBeenCalledWith(expect.objectContaining({ _id: '1' }))
            expect(showToast).toHaveBeenCalledWith({ type: 'success', message: 'Blog created successfully' })
            expect(navigate).toHaveBeenCalledWith('/analytics/blogs')
        })
    })

    it('shows error toast and does not navigate on failure', async () => {
        createService.mockRejectedValueOnce(new Error('fail'))
        render(<BlogCreatePage />)
        await userEvent.click(screen.getByTestId('submit-button'))
        await waitFor(() => {
            expect(createService).toHaveBeenCalled()
            expect(showToast).toHaveBeenCalledWith({ type: 'error', message: 'Failed to create blog' })
            expect(navigate).not.toHaveBeenCalled()
        })
    })
})
