import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import VisibilityStatusRadio from './VisibilityStatusRadio'

jest.mock('@chakra-ui/react', () => {
    const React = require('react')
    return {
        __esModule: true,
        Flex: ({ children, ...rest }) =>
            React.createElement('div', { 'data-testid': 'flex', ...rest }, children),
        useRadioGroup: ({ onChange, value }) => ({
            getRootProps: () => ({ 'data-testid': 'radio-group' }),
            getRadioProps: ({ value: radioValue }) => ({
                isChecked: radioValue === value,
                onChange: () => onChange(radioValue)
            })
        })
    }
})

jest.mock('components/redesign/form-field-wrapper/FormFieldWrapper', () => {
    const React = require('react')
    return {
        __esModule: true,
        default: ({ label, description, isRequired, children }) =>
            React.createElement(
                'div',
                {
                    'data-testid': 'form-field-wrapper',
                    'data-label': label,
                    'data-desc': description,
                    'data-required': isRequired
                },
                children
            )
    }
})

jest.mock('pages/blogs/hooks/useBlogForm', () => ({
    __esModule: true,
    default: jest.fn()
}))

jest.mock(
    'pages/products/components/ProductDrawer/components/common/CustomRadioCard',
    () => {
        const React = require('react')
        return {
            __esModule: true,
            default: props =>
                React.createElement(
                    'button',
                    {
                        'data-testid': `radio-${props.label}`,
                        'data-checked': String(props.isChecked),
                        onClick: props.onChange
                    },
                    props.label
                )
        }
    }
)

describe('VisibilityStatusRadio', () => {
    const mockUseBlogForm = require('pages/blogs/hooks/useBlogForm').default as jest.Mock

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('renders wrapper and two radio options with correct checked state when draft', () => {
        const setFieldValue = jest.fn()
        mockUseBlogForm.mockReturnValue({
            values: { isVisible: false },
            setFieldValue
        })

        render(<VisibilityStatusRadio />)

        const wrapper = screen.getByTestId('form-field-wrapper')
        expect(wrapper).toHaveAttribute('data-label', 'Visibility Status')
        expect(wrapper).toHaveAttribute(
            'data-desc',
            'Save as a draft or publish the post when ready.'
        )
        expect(wrapper).toHaveAttribute('data-required', 'true')

        const draftBtn = screen.getByTestId('radio-Draft')
        const visibleBtn = screen.getByTestId('radio-Visible')
        expect(draftBtn).toBeInTheDocument()
        expect(visibleBtn).toBeInTheDocument()
        expect(draftBtn).toHaveAttribute('data-checked', 'true')
        expect(visibleBtn).toHaveAttribute('data-checked', 'false')
    })

    it('renders checked state correctly when visible', () => {
        mockUseBlogForm.mockReturnValue({
            values: { isVisible: true },
            setFieldValue: jest.fn()
        })

        render(<VisibilityStatusRadio />)

        expect(screen.getByTestId('radio-Draft')).toHaveAttribute('data-checked', 'false')
        expect(screen.getByTestId('radio-Visible')).toHaveAttribute('data-checked', 'true')
    })

    it('calls setFieldValue with true when Visible clicked', async () => {
        const setFieldValue = jest.fn()
        mockUseBlogForm.mockReturnValue({
            values: { isVisible: false },
            setFieldValue
        })

        render(<VisibilityStatusRadio />)

        await userEvent.click(screen.getByTestId('radio-Visible'))
        expect(setFieldValue).toHaveBeenCalledWith('isVisible', true)
    })

    it('calls setFieldValue with false when Draft clicked', async () => {
        const setFieldValue = jest.fn()
        mockUseBlogForm.mockReturnValue({
            values: { isVisible: true },
            setFieldValue
        })

        render(<VisibilityStatusRadio />)

        await userEvent.click(screen.getByTestId('radio-Draft'))
        expect(setFieldValue).toHaveBeenCalledWith('isVisible', false)
    })
})
