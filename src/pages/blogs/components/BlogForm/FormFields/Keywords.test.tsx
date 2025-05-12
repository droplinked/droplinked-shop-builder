import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import Keywords from './Keywords'

jest.mock('pages/blogs/hooks/useBlogForm', () => ({
    __esModule: true,
    default: jest.fn()
}))

jest.mock('components/redesign/keyword-input/KeywordInput', () => {
    const React = require('react')
    return {
        __esModule: true,
        default: props =>
            React.createElement('div', {
                'data-testid': 'keyword-input',
                'data-keywords': JSON.stringify(props.keywords),
                'data-label': props.label,
                'data-description': props.description,
                'data-placeholder': props.placeholder,
                onClick: () => props.onKeywordsChange(['newTag'])
            })
    }
})

describe('Keywords', () => {
    const mockUseBlogForm = require('pages/blogs/hooks/useBlogForm').default as jest.Mock

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('renders KeywordInput with correct props', () => {
        const setFieldValue = jest.fn()
        mockUseBlogForm.mockReturnValue({
            values: { tags: ['tag1', 'tag2'] },
            setFieldValue
        })

        render(<Keywords />)

        const ki = screen.getByTestId('keyword-input')
        expect(ki).toHaveAttribute('data-keywords', JSON.stringify(['tag1', 'tag2']))
        expect(ki).toHaveAttribute('data-label', 'Keywords')
        expect(ki).toHaveAttribute(
            'data-description',
            'Add relevant tags to help users find posted content across search engines.'
        )
        expect(ki).toHaveAttribute(
            'data-placeholder',
            'Type keywords to help drive traffic to this post...'
        )
    })

    it('calls setFieldValue on keywords change', async () => {
        const setFieldValue = jest.fn()
        mockUseBlogForm.mockReturnValue({
            values: { tags: [] },
            setFieldValue
        })

        render(<Keywords />)

        const ki = screen.getByTestId('keyword-input')
        await userEvent.click(ki)
        expect(setFieldValue).toHaveBeenCalledWith('tags', ['newTag'])
    })
})
