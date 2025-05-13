// __tests__/ChangelogError.test.tsx
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { ChangelogError } from './ChangelogError'

// mock the PageGrid default export with its Root and Header subcomponents
jest.mock('components/redesign/page-grid/PageGrid', () => ({
    __esModule: true,
    default: {
        Root: ({ children }) => <div data-testid='root'>{children}</div>,
        Header: ({ title, description }) => (
            <div data-testid='header'>
                <h1>{title}</h1>
                <p>{description}</p>
            </div>
        )
    }
}))

describe('ChangelogError', () => {
    it('renders error message from Error instance', () => {
        // Arrange
        const error = new Error('network failed')
        render(<ChangelogError error={error} />)

        // Act
        const root = screen.getByTestId('root')
        const header = screen.getByTestId('header')
        const titleEl = screen.getByRole('heading', { level: 1 })
        const descEl = screen.getByText('network failed')

        // Assert
        expect(root).toBeInTheDocument()
        expect(header).toBeInTheDocument()
        expect(titleEl).toHaveTextContent('Error')
        expect(descEl).toBeInTheDocument()
    })

    it('renders fallback message for non-Error value', () => {
        // Arrange
        render(<ChangelogError error={42} />)

        // Act
        const titleEl = screen.getByRole('heading', { level: 1 })
        const descEl = screen.getByText('Something went wrong. Please try again later.')

        // Assert
        expect(titleEl).toHaveTextContent('Error')
        expect(descEl).toBeInTheDocument()
    })
})
