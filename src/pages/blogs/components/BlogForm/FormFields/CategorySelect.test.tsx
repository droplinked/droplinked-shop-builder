import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import CategorySelect from './CategorySelect'

jest.mock('@chakra-ui/react', () => {
    const React = require('react')
    return {
        __esModule: true,
        Button: props => React.createElement('button', { ...props }, props.children),
        Divider: props => React.createElement('hr', { ...props }),
        Flex: ({ children, ...rest }) =>
            React.createElement('div', { 'data-testid': 'flex', ...rest }, children),
        Popover: ({ children }) =>
            React.createElement('div', { 'data-testid': 'popover' }, children),
        PopoverTrigger: ({ children }) =>
            React.createElement('div', { 'data-testid': 'popover-trigger' }, children),
        PopoverContent: ({ children }) =>
            React.createElement('div', { 'data-testid': 'popover-content' }, children),
        Text: ({ children, ...rest }) =>
            React.createElement('span', { 'data-testid': 'text', ...rest }, children),
        useDisclosure: jest.fn()
    }
})

jest.mock('assets/icon/Appicons', () => {
    const React = require('react')
    return {
        __esModule: true,
        default: { SelectChevronDown: () => React.createElement('span', { 'data-testid': 'chevron' }) }
    }
})

jest.mock('assets/icons/Sign/Plus/PlusMd', () => {
    const React = require('react')
    return {
        __esModule: true,
        PlusMd: () => React.createElement('svg', { 'data-testid': 'plus-md' })
    }
})

jest.mock('components/redesign/form-field-wrapper/FormFieldWrapper', () => {
    const React = require('react')
    return {
        __esModule: true,
        default: ({ label, description, errorMessage, children }) =>
            React.createElement(
                'div',
                {
                    'data-testid': 'form-field-wrapper',
                    'data-label': label,
                    'data-desc': description,
                    'data-error': errorMessage ?? ''
                },
                children
            )
    }
})

jest.mock('components/redesign/input/AppInput', () => {
    const React = require('react')
    return {
        __esModule: true,
        default: ({ inputProps, rightElement }) =>
            React.createElement(
                'div',
                { 'data-testid': 'app-input' },
                React.createElement('input', { 'data-testid': 'input', ...inputProps }),
                React.cloneElement(rightElement, { 'data-testid': 'add-button' })
            )
    }
})

jest.mock('pages/blogs/hooks/useBlogForm', () => ({
    __esModule: true,
    default: jest.fn()
}))

describe('CategorySelect', () => {
    // require the mocked hook so it's a jest.Mock
    const mockUseBlogForm = require('pages/blogs/hooks/useBlogForm').default as jest.Mock
    let onClose: jest.Mock

    beforeEach(() => {
        jest.clearAllMocks()
        onClose = jest.fn()
        require('@chakra-ui/react').useDisclosure.mockReturnValue({
            isOpen: true,
            onOpen: jest.fn(),
            onClose
        })
    })

    it('shows placeholder when no category selected', () => {
        mockUseBlogForm.mockReturnValue({
            values: { category: '' },
            errors: {},
            setFieldValue: jest.fn()
        })
        render(<CategorySelect />)
        expect(screen.getByText('Select a Category')).toBeInTheDocument()
    })

    it('shows selected category when present', () => {
        mockUseBlogForm.mockReturnValue({
            values: { category: 'Tech' },
            errors: {},
            setFieldValue: jest.fn()
        })
        render(<CategorySelect />)
        expect(screen.getByText('Tech')).toBeInTheDocument()
    })

    it('renders error message when errors.category exists', () => {
        mockUseBlogForm.mockReturnValue({
            values: { category: '' },
            errors: { category: new Error('Required') },
            setFieldValue: jest.fn()
        })
        render(<CategorySelect />)
        const wrapper = screen.getByTestId('form-field-wrapper')
        expect(wrapper).toHaveAttribute('data-error', 'Error: Required')
    })

    it('selects an existing category and calls setFieldValue and onClose', async () => {
        const setFieldValue = jest.fn()
        mockUseBlogForm.mockReturnValue({
            values: { category: '' },
            errors: {},
            setFieldValue
        })
        render(<CategorySelect />)

        const firstCategory = 'E-Commerce Trends'
        const btn = screen.getByRole('button', { name: firstCategory })
        await userEvent.click(btn)
        expect(setFieldValue).toHaveBeenCalledWith('category', firstCategory)
        expect(onClose).toHaveBeenCalled()
    })

    it('adds a new category when input and plus button clicked', async () => {
        const setFieldValue = jest.fn()
        mockUseBlogForm.mockReturnValue({
            values: { category: '' },
            errors: {},
            setFieldValue
        })
        render(<CategorySelect />)

        const input = screen.getByTestId('input')
        await userEvent.type(input, 'NewCat')
        const addBtn = screen.getByTestId('add-button')
        await userEvent.click(addBtn)

        expect(screen.getByRole('button', { name: 'NewCat' })).toBeInTheDocument()
    })
})
