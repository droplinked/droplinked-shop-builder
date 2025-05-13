import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import FeaturedPictureUpload from './FeaturedPictureUpload'

jest.mock('@chakra-ui/react', () => {
    const React = require('react')
    return {
        __esModule: true,
        Flex: ({ children }) =>
            React.createElement('div', { 'data-testid': 'flex' }, children),
        Button: props => React.createElement('button', props, props.children),
        Divider: props => React.createElement('hr', props),
        Popover: ({ children }) => React.createElement('div', null, children),
        PopoverTrigger: ({ children }) => React.createElement('div', null, children),
        PopoverContent: ({ children }) => React.createElement('div', null, children),
        Text: props => React.createElement('span', props, props.children),
        useDisclosure: jest.fn(() => ({ isOpen: true, onOpen: jest.fn(), onClose: jest.fn() }))
    }
})

jest.mock('pages/blogs/hooks/useBlogForm', () => ({
    __esModule: true,
    default: jest.fn()
}))

jest.mock('hooks/useFileUpload/useFileUpload', () => ({
    __esModule: true,
    default: jest.fn()
}))

jest.mock('components/redesign/form-field-wrapper/FormFieldWrapper', () => ({
    __esModule: true,
    default: ({ label, description, isRequired, errorMessage, children }) => {
        const React = require('react')
        return React.createElement(
            'div',
            {
                'data-testid': 'form-field-wrapper',
                'data-label': label,
                'data-desc': description,
                'data-required': isRequired,
                'data-error': errorMessage ?? ''
            },
            children
        )
    }
}))

jest.mock(
    'pages/products/components/ProductDrawer/components/common/FileUpload',
    () => ({
        __esModule: true,
        default: ({ onFileChange, isLoading }) => {
            const React = require('react')
            return React.createElement(
                'button',
                {
                    'data-testid': 'file-upload',
                    onClick: () => {
                        const file = new File(['dummy'], 'test.png', { type: 'image/png' })
                        onFileChange(file)
                    }
                },
                isLoading ? 'Uploading...' : 'Upload File'
            )
        }
    })
)

jest.mock(
    'pages/products/components/ProductDrawer/components/common/SelectedFileCard',
    () => ({
        __esModule: true,
        default: ({ previewImage, fileName, fileSize, children }) => {
            const React = require('react')
            return React.createElement(
                'div',
                {
                    'data-testid': 'selected-file-card',
                    'data-preview': previewImage,
                    'data-file-name': fileName,
                    'data-file-size': fileSize
                },
                children
            )
        }
    })
)

jest.mock('utils/helpers', () => ({
    __esModule: true,
    getFileSizeInMB: jest.fn(() => '1.23')
}))

jest.mock('assets/icons/Action/Trash/TrashMd', () => ({
    __esModule: true,
    TrashMd: props => {
        const React = require('react')
        return React.createElement('svg', { 'data-testid': 'trash-icon', ...props })
    }
}))

describe('FeaturedPictureUpload', () => {
    const mockUseBlogForm = require('pages/blogs/hooks/useBlogForm').default as jest.Mock
    const mockUseFileUpload = require('hooks/useFileUpload/useFileUpload').default as jest.Mock

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('renders upload button and no selected file initially', () => {
        mockUseBlogForm.mockReturnValue({
            values: { image: '' },
            errors: {},
            setFieldValue: jest.fn()
        })
        mockUseFileUpload.mockReturnValue({ mutateAsync: jest.fn(), isLoading: false })

        render(<FeaturedPictureUpload />)

        expect(screen.getByTestId('form-field-wrapper')).toBeInTheDocument()
        expect(screen.getByTestId('file-upload')).toBeInTheDocument()
        expect(screen.queryByTestId('selected-file-card')).not.toBeInTheDocument()
    })

    it('shows error when errors.image exists', () => {
        mockUseBlogForm.mockReturnValue({
            values: { image: '' },
            errors: { image: new Error('Required') },
            setFieldValue: jest.fn()
        })
        mockUseFileUpload.mockReturnValue({ mutateAsync: jest.fn(), isLoading: false })

        render(<FeaturedPictureUpload />)

        const wrapper = screen.getByTestId('form-field-wrapper')
        expect(wrapper).toHaveAttribute('data-error', 'Error: Required')
    })

    it('uploads a file and sets field value', async () => {
        const mutateAsync = jest.fn(async () => ({ original: 'orig-url', small: 'small-url' }))
        const setFieldValue = jest.fn()
        mockUseBlogForm.mockReturnValue({
            values: { image: '' },
            errors: {},
            setFieldValue
        })
        mockUseFileUpload.mockReturnValue({ mutateAsync, isLoading: false })

        render(<FeaturedPictureUpload />)

        await userEvent.click(screen.getByTestId('file-upload'))

        expect(mutateAsync).toHaveBeenCalled()
        expect(setFieldValue).toHaveBeenCalledWith('image', 'orig-url')
    })

    it('displays selected file card and allows removal', async () => {
        const setFieldValue = jest.fn()
        mockUseBlogForm.mockReturnValue({
            values: { image: 'orig-url' },
            errors: {},
            setFieldValue
        })
        mockUseFileUpload.mockReturnValue({ mutateAsync: jest.fn(), isLoading: false })

        render(<FeaturedPictureUpload />)

        const card = screen.getByTestId('selected-file-card')
        expect(card).toHaveAttribute('data-preview', 'orig-url')

        const removeBtn = within(card).getByRole('button')
        await userEvent.click(removeBtn)
        expect(setFieldValue).toHaveBeenCalledWith('image', null)
    })
})
