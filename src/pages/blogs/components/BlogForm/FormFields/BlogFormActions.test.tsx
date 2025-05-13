import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import BlogFormActions from './BlogFormActions'

jest.mock('@chakra-ui/react', () => {
    const React = require('react')
    return {
        __esModule: true,
        Flex: ({ children, ...rest }) =>
            React.createElement('div', { 'data-testid': 'flex', ...rest }, children)
    }
})

jest.mock('components/redesign/button/AppButton', () => {
    const React = require('react')
    return {
        __esModule: true,
        default: ({ children, variant, isDisabled, isLoading, onClick }) =>
            React.createElement(
                'button',
                {
                    'data-variant': variant || 'primary',
                    'data-loading': isLoading,
                    disabled: isDisabled,
                    onClick
                },
                children
            )
    }
})

jest.mock('react-router-dom', () => ({
    __esModule: true,
    useNavigate: jest.fn()
}))

jest.mock('pages/blogs/hooks/useBlogForm', () => ({
    __esModule: true,
    default: jest.fn()
}))

describe('BlogFormActions', () => {
    const useNavigate = require('react-router-dom').useNavigate as jest.Mock
    const useBlogForm = require('pages/blogs/hooks/useBlogForm').default as jest.Mock

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('renders Discard and Publish buttons when visible and not submitting', () => {
        const submitForm = jest.fn()
        useNavigate.mockReturnValue(jest.fn())
        useBlogForm.mockReturnValue({
            values: { isVisible: true },
            submitForm,
            isSubmitting: false
        })

        render(<BlogFormActions />)

        const discard = screen.getByRole('button', { name: /discard/i })
        const publish = screen.getByRole('button', { name: /publish/i })
        expect(discard).toBeEnabled()
        expect(publish).toBeEnabled()
        expect(publish).toHaveAttribute('data-loading', 'false')
    })

    it('renders Save as Draft when not visible', () => {
        useNavigate.mockReturnValue(jest.fn())
        useBlogForm.mockReturnValue({
            values: { isVisible: false },
            submitForm: jest.fn(),
            isSubmitting: false
        })

        render(<BlogFormActions />)
        expect(
            screen.getByRole('button', { name: /save as draft/i })
        ).toBeInTheDocument()
    })

    it('calls navigate to /analytics/blogs when Discard clicked', async () => {
        const navigate = jest.fn()
        useNavigate.mockReturnValue(navigate)
        useBlogForm.mockReturnValue({
            values: { isVisible: true },
            submitForm: jest.fn(),
            isSubmitting: false
        })

        render(<BlogFormActions />)
        await userEvent.click(
            screen.getByRole('button', { name: /discard/i })
        )
        expect(navigate).toHaveBeenCalledWith('/analytics/blogs')
    })

    it('calls submitForm when Publish clicked', async () => {
        const submitForm = jest.fn()
        useNavigate.mockReturnValue(jest.fn())
        useBlogForm.mockReturnValue({
            values: { isVisible: true },
            submitForm,
            isSubmitting: false
        })

        render(<BlogFormActions />)
        await userEvent.click(
            screen.getByRole('button', { name: /publish/i })
        )
        expect(submitForm).toHaveBeenCalled()
    })

    it('disables buttons and shows loading when submitting', () => {
        const submitForm = jest.fn()
        useNavigate.mockReturnValue(jest.fn())
        useBlogForm.mockReturnValue({
            values: { isVisible: true },
            submitForm,
            isSubmitting: true
        })

        render(<BlogFormActions />)

        const discard = screen.getByRole('button', { name: /discard/i })
        const publish = screen.getByRole('button', { name: /publish/i })
        expect(discard).toBeDisabled()
        expect(publish).toBeDisabled()
        expect(publish).toHaveAttribute('data-loading', 'true')
    })
})
