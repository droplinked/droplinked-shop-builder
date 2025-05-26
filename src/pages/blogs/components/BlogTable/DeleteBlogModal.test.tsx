import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Blog } from 'services/blog/interfaces'
import React from 'react'
import { useMutation } from 'react-query'
import DeleteBlogModal from './DeleteBlogModal'

jest.mock('react-query', () => ({
    __esModule: true,
    useMutation: jest.fn()
}))

jest.mock('hooks/toast/useToast', () => ({
    __esModule: true,
    default: jest.fn()
}))

jest.mock('pages/blogs/hooks/useBlogs', () => ({
    __esModule: true,
    useInvalidateBlogList: jest.fn()
}))

jest.mock('lib/apis/blog/services', () => ({
    __esModule: true,
    deleteBlogService: jest.fn()
}))

jest.mock('./ConfirmationModal', () => {
    const React = require('react')
    return {
        __esModule: true,
        default: ({ onClose, confirmButtonProps }) =>
            React.createElement('div', null,
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

describe('DeleteBlogModal', () => {
    const blogPost = { _id: '123' } as Blog
    const onCloseMock = jest.fn()
    let showToastMock: jest.Mock
    let invalidateMock: jest.Mock

    beforeEach(() => {
        jest.clearAllMocks()
        showToastMock = jest.fn()
        require('hooks/toast/useToast').default.mockReturnValue({ showToast: showToastMock })
        invalidateMock = jest.fn()
        require('pages/blogs/hooks/useBlogs').useInvalidateBlogList.mockReturnValue(invalidateMock)

            ; (useMutation as jest.Mock).mockImplementation(({ mutationFn, onSuccess, onError }) => ({
                mutate: () => mutationFn().then(onSuccess).catch(onError),
                isLoading: false
            }))
    })

    it('calls deleteBlogService and triggers success flow when confirm clicked', async () => {
        const deleteService = require('lib/apis/blog/services').deleteBlogService as jest.Mock
        deleteService.mockResolvedValueOnce({})

        render(
            <DeleteBlogModal
                blogPost={blogPost}
                isOpen={true}
                onClose={onCloseMock}
            />
        )

        await userEvent.click(screen.getByTestId('confirm-button'))

        await waitFor(() => {
            expect(deleteService).toHaveBeenCalledWith('123')
            expect(showToastMock).toHaveBeenCalledWith({
                type: 'success',
                message: 'Blog removed successfully'
            })
            expect(onCloseMock).toHaveBeenCalled()
            expect(invalidateMock).toHaveBeenCalled()
        })
    })

    it('calls error flow when deleteBlogService rejects', async () => {
        const deleteService = require('lib/apis/blog/services').deleteBlogService as jest.Mock
        deleteService.mockRejectedValueOnce(new Error('fail'))

        render(
            <DeleteBlogModal
                blogPost={blogPost}
                isOpen={true}
                onClose={onCloseMock}
            />
        )

        await userEvent.click(screen.getByTestId('confirm-button'))

        await waitFor(() => {
            expect(deleteService).toHaveBeenCalledWith('123')
            expect(showToastMock).toHaveBeenCalledWith({
                type: 'error',
                message: 'Failed to remove blog'
            })
            expect(onCloseMock).not.toHaveBeenCalled()
            expect(invalidateMock).not.toHaveBeenCalled()
        })
    })

    it('disables confirm button when loading', () => {
        ; (useMutation as jest.Mock).mockImplementation(() => ({
            mutate: jest.fn(),
            isLoading: true
        }))

        render(
            <DeleteBlogModal
                blogPost={blogPost}
                isOpen={true}
                onClose={onCloseMock}
            />
        )

        expect(screen.getByTestId('confirm-button')).toBeDisabled()
    })

    it('calls onClose when cancel clicked', async () => {
        render(
            <DeleteBlogModal
                blogPost={blogPost}
                isOpen={true}
                onClose={onCloseMock}
            />
        )

        await userEvent.click(screen.getByTestId('cancel-button'))
        expect(onCloseMock).toHaveBeenCalled()
    })
})
