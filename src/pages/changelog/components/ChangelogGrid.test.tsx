// __tests__/ChangelogGrid.test.tsx
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { ChangelogGrid } from './ChangelogGrid'

// mock RuledGrid so we can capture its props as data- attributes
jest.mock('components/redesign/ruled-grid/RuledGrid', () => ({
    __esModule: true,
    default: ({ children, width, columns, nested, borderTop, borderColor }) => (
        <div
            data-testid='ruled-grid'
            data-width={width}
            data-columns={columns}
            data-nested={nested ? 'true' : 'false'}
            data-border-top={borderTop}
            data-border-color={borderColor}
        >
            {children}
        </div>
    )
}))

describe('ChangelogGrid', () => {
    it('renders children inside RuledGrid with correct props', () => {
        // Arrange
        const childText = 'grid content'

        // Act
        render(
            <ChangelogGrid>
                <span>{childText}</span>
            </ChangelogGrid>
        )

        const grid = screen.getByTestId('ruled-grid')

        // Assert
        expect(grid).toHaveTextContent(childText)
        expect(grid).toHaveAttribute('data-width', 'full')
        expect(grid).toHaveAttribute('data-columns', '1')
        expect(grid).toHaveAttribute('data-nested', 'true')
        expect(grid).toHaveAttribute('data-border-top', '1px solid')
        expect(grid).toHaveAttribute('data-border-color', 'neutral.gray.800')
    })
})
