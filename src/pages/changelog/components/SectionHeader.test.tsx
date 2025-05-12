import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import React from 'react'
import SectionHeader from './SectionHeader'

// mock Chakra UI components so they aren’t undefined
jest.mock('@chakra-ui/react', () => ({
    __esModule: true,
    Flex: ({ children, alignItems, gap }) => (
        <div data-testid="flex" data-align-items={alignItems} data-gap={gap}>
            {children}
        </div>
    ),
    Heading: ({ children, as, fontSize, fontWeight, color }) => (
        <h3
            data-testid="heading"
            data-as={as}
            data-font-size={JSON.stringify(fontSize)}
            data-font-weight={fontWeight}
            data-color={color}
        >
            {children}
        </h3>
    )
}))

describe('SectionHeader', () => {
    it('renders the provided icon and title', () => {
        // Arrange
        const icon = <span data-testid="icon">Icon</span>
        const titleText = 'Test Heading'

        // Act
        render(<SectionHeader icon={icon} title={titleText} />)

        // Assert
        expect(screen.getByTestId('icon')).toBeInTheDocument()

        const headingEl = screen.getByRole('heading', { level: 3, name: titleText })
        expect(headingEl).toBeInTheDocument()
    })
})
