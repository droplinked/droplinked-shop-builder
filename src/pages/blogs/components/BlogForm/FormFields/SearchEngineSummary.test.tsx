import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import SearchEngineSummary from './SearchEngineSummary'

jest.mock('pages/blogs/hooks/useBlogForm', () => ({
    __esModule: true,
    default: jest.fn()
}))

jest.mock('components/redesign/textarea/Textarea', () => {
    const React = require('react')
    return {
        __esModule: true,
        default: ({
            label,
            description,
            placeholder,
            value,
            onChange
        }) =>
            React.createElement(
                'div',
                {
                    'data-testid': 'textarea-wrapper',
                    'data-label': label,
                    'data-description': description
                },
                React.createElement('input', {
                    'data-testid': 'textarea-input',
                    placeholder,
                    value,
                    onChange
                })
            )
    }
})

describe('SearchEngineSummary', () => {
    const mockUseBlogForm = require('pages/blogs/hooks/useBlogForm').default as jest.Mock

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('renders Textarea with correct props', () => {
        const setFieldValue = jest.fn()
        mockUseBlogForm.mockReturnValue({
            values: { searchEngineSummary: 'initial summary' },
            setFieldValue
        })

        render(<SearchEngineSummary />)

        const wrapper = screen.getByTestId('textarea-wrapper')
        expect(wrapper).toHaveAttribute('data-label', 'Search Engine Summary')
        expect(wrapper).toHaveAttribute(
            'data-description',
            'Include 150-200 words about the post to display on search engines as the content summary.'
        )

        const input = screen.getByTestId('textarea-input')
        expect(input).toHaveAttribute('placeholder', 'Search Engine Summary')
        expect(input).toHaveAttribute('value', 'initial summary')
    })

    it('calls setFieldValue on change', () => {
        const setFieldValue = jest.fn()
        mockUseBlogForm.mockReturnValue({
            values: { searchEngineSummary: '' },
            setFieldValue
        })

        render(<SearchEngineSummary />)

        const input = screen.getByTestId('textarea-input')
        fireEvent.change(input, { target: { value: 'new summary' } })
        expect(setFieldValue).toHaveBeenCalledWith(
            'searchEngineSummary',
            'new summary'
        )
    })
})
