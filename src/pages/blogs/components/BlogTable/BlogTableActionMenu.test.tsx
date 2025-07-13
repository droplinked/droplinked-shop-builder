import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Blog } from 'services/blog/interfaces'
import React from 'react'
import BlogTableActionMenu from './BlogTableActionMenu'

jest.mock('@chakra-ui/react', () => ({
    useDisclosure: jest.fn()
}))

jest.mock('hooks/useShopUrl/useShopUrl', () => ({
    __esModule: true,
    default: jest.fn()
}))

jest.mock('hooks/toast/useToast', () => ({
    __esModule: true,
    default: jest.fn()
}))

jest.mock('components/redesign/table-menu/TableMenu', () => {
    const React = require('react')
    return {
        __esModule: true,
        default: ({ items }) =>
            React.createElement(
                'div',
                { 'data-testid': 'table-menu' },
                items.map(item =>
                    React.createElement('button', { key: item.title, onClick: item.onClick }, item.title)
                )
            )
    }
})

jest.mock('./ChangeBlogStatusModal', () => {
    const React = require('react')
    return {
        __esModule: true,
        default: jest.fn(props => React.createElement('div', { 'data-testid': 'change-modal', ...props }))
    }
})

jest.mock('./DeleteBlogModal', () => {
    const React = require('react')
    return {
        __esModule: true,
        default: jest.fn(props => React.createElement('div', { 'data-testid': 'delete-modal', ...props }))
    }
})

jest.mock('assets/icons/Action/Archive/ArchiveMd', () => {
    const React = require('react')
    return {
        __esModule: true,
        ArchiveMd: () => React.createElement('svg', { 'data-testid': 'icon-archive' })
    }
})

jest.mock('assets/icons/Sign/DoubleCheck/DoublecheckMd', () => {
    const React = require('react')
    return {
        __esModule: true,
        DoublecheckMd: () => React.createElement('svg', { 'data-testid': 'icon-doublecheck' })
    }
})

jest.mock('assets/icons/Action/Share/ShareMd', () => {
    const React = require('react')
    return {
        __esModule: true,
        ShareMd: () => React.createElement('svg', { 'data-testid': 'icon-share' })
    }
})

jest.mock('assets/icons/Action/Trash/TrashMd', () => {
    const React = require('react')
    return {
        __esModule: true,
        TrashMd: () => React.createElement('svg', { 'data-testid': 'icon-trash' })
    }
})

describe('BlogTableActionMenu', () => {
    const sampleBlog = {
        _id: '1',
        title: 'Sample Title',
        content: 'Sample content',
        image: 'sample.jpg',
        category: 'News',
        isFeatured: false,
        isVisible: true,
        slug: 'sample-slug'
    } as Blog

    let onChangeStatusOpen: jest.Mock
    let onChangeStatusClose: jest.Mock
    let onDeleteOpen: jest.Mock
    let onDeleteClose: jest.Mock
    let showToast: jest.Mock

    beforeEach(() => {
        jest.clearAllMocks()

        onChangeStatusOpen = jest.fn()
        onChangeStatusClose = jest.fn()
        onDeleteOpen = jest.fn()
        onDeleteClose = jest.fn()

        const useDisclosure = require('@chakra-ui/react').useDisclosure
        useDisclosure
            .mockReturnValueOnce({ isOpen: false, onOpen: onChangeStatusOpen, onClose: onChangeStatusClose })
            .mockReturnValueOnce({ isOpen: false, onOpen: onDeleteOpen, onClose: onDeleteClose })

        require('hooks/useShopUrl/useShopUrl').default.mockReturnValue('https://shop.test')

        showToast = jest.fn()
        require('hooks/toast/useToast').default.mockReturnValue({ showToast })
    })

    it('renders the menu buttons and initializes modals closed', () => {
        render(<BlogTableActionMenu blogPost={sampleBlog} />)
        expect(screen.getByTestId('table-menu')).toBeInTheDocument()
        expect(screen.getByText('Draft Post')).toBeInTheDocument()
        expect(screen.getByText('Share')).toBeInTheDocument()
        expect(screen.getByText('Remove')).toBeInTheDocument()

        const ChangeModal = require('./ChangeBlogStatusModal').default
        const DeleteModal = require('./DeleteBlogModal').default

        expect(ChangeModal).toHaveBeenCalledWith(
            expect.objectContaining({
                blogPost: sampleBlog,
                isOpen: false,
                onClose: onChangeStatusClose
            }),
            {}
        )
        expect(DeleteModal).toHaveBeenCalledWith(
            expect.objectContaining({
                blogPost: sampleBlog,
                isOpen: false,
                onClose: onDeleteClose
            }),
            {}
        )
    })

    it('opens change-status modal when Draft Post clicked', async () => {
        render(<BlogTableActionMenu blogPost={sampleBlog} />)
        await userEvent.click(screen.getByText('Draft Post'))
        expect(onChangeStatusOpen).toHaveBeenCalled()
    })

    it('opens delete modal when Remove clicked', async () => {
        render(<BlogTableActionMenu blogPost={sampleBlog} />)
        await userEvent.click(screen.getByText('Remove'))
        expect(onDeleteOpen).toHaveBeenCalled()
    })

    it('copies blog link and shows toast when Share clicked', async () => {
        Object.assign(navigator, {
            clipboard: { writeText: jest.fn().mockResolvedValue(undefined) }
        })

        render(<BlogTableActionMenu blogPost={sampleBlog} />)
        await userEvent.click(screen.getByText('Share'))
        expect(navigator.clipboard.writeText).toHaveBeenCalledWith('https://shop.test/blogs/sample-slug')
        expect(showToast).toHaveBeenCalledWith({
            type: 'success',
            message: 'Link copied to clipboard'
        })
    })
})
