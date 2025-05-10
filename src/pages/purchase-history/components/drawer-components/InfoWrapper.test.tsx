import { render, screen } from '@testing-library/react';
import React from 'react';
import InfoWrapper from './InfoWrapper';

// Mock Chakra UI components
jest.mock('@chakra-ui/react', () => ({
    Flex: function MockFlex({ children, border, borderRadius, p, gap, flexDirection, ...props }) {
        return (
            <div
                data-testid="flex-container"
                data-border={border}
                data-border-radius={borderRadius}
                data-padding={typeof p === 'object' ? JSON.stringify(p) : p}
                data-gap={gap}
                data-direction={flexDirection}
                {...props}
            >
                {children}
            </div>
        );
    },
    Text: function MockText({ children, color, fontSize, fontWeight, textDecoration, textAlign, ...props }) {
        return (
            <div
                data-testid="text-component"
                data-color={color}
                data-font-size={fontSize}
                data-font-weight={fontWeight}
                data-text-decoration={textDecoration}
                data-text-align={textAlign}
                {...props}
            >
                {children}
            </div>
        );
    }
}));

describe('InfoWrapper', () => {
    test('renders with title and children', () => {
        render(
            <InfoWrapper title="Test Title">
                <div data-testid="child-component">Child Content</div>
            </InfoWrapper>
        );

        // Check that the container is rendered with correct styling
        const container = screen.getByTestId('flex-container');
        expect(container).toBeInTheDocument();
        expect(container).toHaveAttribute('data-border', '1px solid #292929');
        expect(container).toHaveAttribute('data-border-radius', '16');
        expect(container).toHaveAttribute('data-direction', 'column');

        // Check that title is rendered
        const title = screen.getByTestId('text-component');
        expect(title).toBeInTheDocument();
        expect(title).toHaveTextContent('Test Title');
        expect(title).toHaveAttribute('data-color', '#fff');
        expect(title).toHaveAttribute('data-font-size', '16');
        expect(title).toHaveAttribute('data-font-weight', '500');

        // Check that children are rendered
        const child = screen.getByTestId('child-component');
        expect(child).toBeInTheDocument();
        expect(child).toHaveTextContent('Child Content');
    });

    test('renders without title', () => {
        render(
            <InfoWrapper>
                <div data-testid="child-component">No Title Content</div>
            </InfoWrapper>
        );

        // Check that the container is rendered
        const container = screen.getByTestId('flex-container');
        expect(container).toBeInTheDocument();

        // Check that title is not rendered
        const title = screen.queryByTestId('text-component');
        expect(title).not.toBeInTheDocument();

        // Check that children are rendered
        const child = screen.getByTestId('child-component');
        expect(child).toBeInTheDocument();
        expect(child).toHaveTextContent('No Title Content');
    });

    test('renders with custom flex props', () => {
        const customFlexProps = {
            background: 'red',
            width: '100%'
        };

        render(
            <InfoWrapper title="Custom Props" flexProps={customFlexProps}>
                <div data-testid="child-component">Content</div>
            </InfoWrapper>
        );

        // Check that the container has custom props
        const container = screen.getByTestId('flex-container');
        expect(container).toBeInTheDocument();
        expect(container).toHaveAttribute('background', 'red');
        expect(container).toHaveAttribute('width', '100%');
    });

    test('renders with custom text props', () => {
        render(
            <InfoWrapper title="Custom Text Props">
                <div data-testid="child-component">Content</div>
            </InfoWrapper>
        );

        // Check that the title has custom props
        const title = screen.getByTestId('text-component');
        expect(title).toBeInTheDocument();
    });
});