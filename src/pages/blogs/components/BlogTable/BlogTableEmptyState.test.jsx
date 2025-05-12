import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogTableEmptyState from './BlogTableEmptyState'
import { useNavigate } from 'react-router-dom'

// mock react-router-dom
jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn()
}))

// mock chakra components, honoring `as`
jest.mock('@chakra-ui/react', () => {
    const React = require('react')
    return {
        Flex: ({ as = 'div', children, ...rest }) =>
            React.createElement(as, { 'data-testid': 'flex', ...rest }, children),
        Image: props =>
            React.createElement('img', { 'data-testid': 'image', ...props }),
        Text: ({ children, ...rest }) =>
            React.createElement('span', { 'data-testid': 'text', ...rest }, children)
    }
})

// mock the PlusSm icon
jest.mock('assets/icons/Sign/Plus/PlusSm', () => {
    const React = require('react')
    return {
        PlusSm: props =>
            React.createElement('svg', { 'data-testid': 'plus-sm', ...props })
    }
})

describe('BlogTableEmptyState', () => {
    let mockNavigate

    beforeEach(() => {
        mockNavigate = jest.fn()
        useNavigate.mockReturnValue(mockNavigate)
    })

    it('renders the empty state image with correct src and alt', () => {
        render(<BlogTableEmptyState />)
        const img = screen.getByTestId('image')
        expect(img).toBeInTheDocument()
        expect(img).toHaveAttribute(
            'src',
            'https://upload-file-droplinked.s3.amazonaws.com/09cb061ba207cddb9eecf0befbd2e7a8a69f44d7ec1c83a7ed387da3f2651526.png'
        )
        expect(img).toHaveAttribute('alt', 'Empty Table')
    })

    it('renders the prompt text', () => {
        render(<BlogTableEmptyState />)
        expect(
            screen.getByText(
                /Publish a new blog post to boost SEO and engage audiences\./i
            )
        ).toBeInTheDocument()
    })

    it('renders the New Post button and calls navigate on click', async () => {
        render(<BlogTableEmptyState />)
        const button = screen.getByRole('button', { name: /new post/i })
        expect(button).toBeInTheDocument()
        await userEvent.click(button)
        expect(mockNavigate).toHaveBeenCalledWith('/analytics/blogs/new')
    })
})
