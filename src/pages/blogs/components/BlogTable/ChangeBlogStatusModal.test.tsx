import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Blog } from 'services/blog/interfaces'
import React from 'react'
import { useMutation } from 'react-query'
import ChangeBlogStatusModal from './ChangeBlogStatusModal'

// mock react-query
jest.mock('react-query', () => ({
    __esModule: true,
    useMutation: jest.fn()
}))

// mock toast hook
jest.mock('hooks/toast/useToast', () => ({
    __esModule: true,
    default: jest.fn()
}))

// mock invalidate hook
jest.mock('pages/blogs/hooks/useBlogs', () => ({
    __esModule: true,
    useInvalidateBlogList: jest.fn()
}))

// mock update service
jest.mock('lib/apis/blog/services', () => ({
    __esModule: true,
    updateBlogService: jest.fn()
}))

// mock ConfirmationModal to expose title, desc, icon, plus cancel/confirm buttons
jest.mock('./ConfirmationModal', () => {
    const React = require('react')
    return {
        __esModule: true,
        default: ({ onClose, confirmButtonProps, title, description, icon }) =>
            React.createElement('div', null,
                React.createElement('span', { 'data-testid': 'modal-title' }, title),
                React.createElement('span', { 'data-testid': 'modal-desc' }, description),
                icon,
                React.createElement('button', {
                    'data-testid': 'cancel-button',
                    onClick: onClose
                }, 'Cancel'),
                React.createElement('button', {
                    'data-testid': 'confirm-button',
                    disabled: confirmButtonProps.isLoading,
                    onClick: confirmButtonProps.onClick
                }, confirmButtonProps.children)
            )
    }
})

describe('ChangeBlogStatusModal', () => {
    // Provide all required properties for Blog
    const draftBlog = {
        _id: '1',
        title: 'Draft Title',
        content: 'Some content',
        image: 'image-url.png',
        category: 'News',
        isFeatured: false,
        isVisible: true
    } as Blog

    const pubBlog = {
        _id: '2',
        title: 'Publish Title',
        content: 'Other content',
        image: 'other-image.png',
        category: 'Tech',
        isFeatured: true,
        isVisible: false
    } as Blog

    let showToast: jest.Mock
    let invalidate: jest.Mock
    let onClose: jest.Mock

    beforeEach(() => {
        jest.clearAllMocks()
        // toast
        showToast = jest.fn()
        require('hooks/toast/useToast').default.mockReturnValue({ showToast })
        // invalidate
        invalidate = jest.fn()
        require('pages/blogs/hooks/useBlogs').useInvalidateBlogList.mockReturnValue(invalidate)
            // default mutation: calls mutationFn → onSuccess/onError
            ; (useMutation as jest.Mock).mockImplementation(({ mutationFn, onSuccess, onError }) => ({
                mutate: () => mutationFn().then(onSuccess).catch(onError),
                isLoading: false
            }))
        onClose = jest.fn()
    })

    it('renders draft mode when isVisible=true', () => {
        render(<ChangeBlogStatusModal blogPost={draftBlog} isOpen={true} onClose={onClose} />)
        expect(screen.getByTestId('modal-title')).toHaveTextContent('Draft Post')
        expect(screen.getByTestId('modal-desc')).toHaveTextContent('Are you sure you want to draft this blog?')
        expect(screen.getByTestId('confirm-button')).toHaveTextContent('Draft')
    })

    it('renders publish mode when isVisible=false', () => {
        render(<ChangeBlogStatusModal blogPost={pubBlog} isOpen={true} onClose={onClose} />)
        expect(screen.getByTestId('modal-title')).toHaveTextContent('Publish Post')
        expect(screen.getByTestId('modal-desc')).toHaveTextContent('Are you sure you want to publish this blog?')
        expect(screen.getByTestId('confirm-button')).toHaveTextContent('Publish')
    })

    it('on confirm calls updateBlogService and triggers success flow', async () => {
        const updateService = require('lib/apis/blog/services').updateBlogService as jest.Mock
        updateService.mockResolvedValueOnce({})
        render(<ChangeBlogStatusModal blogPost={draftBlog} isOpen={true} onClose={onClose} />)
        await userEvent.click(screen.getByTestId('confirm-button'))
        await waitFor(() => {
            expect(updateService).toHaveBeenCalledWith({ ...draftBlog, isVisible: !draftBlog.isVisible })
            expect(showToast).toHaveBeenCalledWith({
                type: 'success',
                message: 'Blog status updated successfully'
            })
            expect(onClose).toHaveBeenCalled()
            expect(invalidate).toHaveBeenCalled()
        })
    })

    it('on confirm shows error toast when updateBlogService fails', async () => {
        const updateService = require('lib/apis/blog/services').updateBlogService as jest.Mock
        updateService.mockRejectedValueOnce(new Error('oops'))
        render(<ChangeBlogStatusModal blogPost={pubBlog} isOpen={true} onClose={onClose} />)
        await userEvent.click(screen.getByTestId('confirm-button'))
        await waitFor(() => {
            expect(updateService).toHaveBeenCalledWith({ ...pubBlog, isVisible: !pubBlog.isVisible })
            expect(showToast).toHaveBeenCalledWith({
                type: 'error',
                message: 'Failed to update blog status'
            })
            expect(onClose).not.toHaveBeenCalled()
            expect(invalidate).not.toHaveBeenCalled()
        })
    })

    it('disables confirm button when mutation is loading', () => {
        ; (useMutation as jest.Mock).mockImplementation(() => ({
            mutate: jest.fn(),
            isLoading: true
        }))
        render(<ChangeBlogStatusModal blogPost={draftBlog} isOpen={true} onClose={onClose} />)
        expect(screen.getByTestId('confirm-button')).toBeDisabled()
    })

    it('cancel button calls onClose', async () => {
        render(<ChangeBlogStatusModal blogPost={draftBlog} isOpen={true} onClose={onClose} />)
        await userEvent.click(screen.getByTestId('cancel-button'))
        expect(onClose).toHaveBeenCalled()
    })
})
