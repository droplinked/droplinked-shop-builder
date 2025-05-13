import { render, screen } from '@testing-library/react';
import React from 'react';
import TitledText from './TitledText';

// Mock Chakra UI components
jest.mock('@chakra-ui/react', () => ({
    Flex: function MockFlex({ children, direction, gap, flexDirection, alignItems, justifyContent, width, ...props }) {
        // Create more specific test IDs based on the Flex element's role in the component
        const getTestId = () => {
            if (justifyContent === "space-between") return "main-flex-container";
            if (justifyContent === "flex-end") return "right-content-container";
            return "text-wrapper-container";
        };

        return (
            <div
                data-testid={getTestId()}
                data-direction={direction || flexDirection}
                data-gap={gap}
                data-align-items={alignItems}
                data-justify-content={justifyContent}
                data-width={width}
                {...props}
            >
                {children}
            </div>
        );
    },
    Text: function MockText({ children, color, fontSize, fontWeight, ...props }) {
        return (
            <div
                data-testid="text-component"
                data-color={color}
                data-font-size={fontSize}
                data-font-weight={fontWeight}
                {...props}
            >
                {children}
            </div>
        );
    }
}));

describe('TitledText', () => {
    test('renders with column direction by default', () => {
        render(<TitledText title="Test Title" text="Test Text" />);

        // Check that the main container is rendered with column direction
        const mainContainer = screen.getByTestId('main-flex-container');
        expect(mainContainer).toBeInTheDocument();
        expect(mainContainer).toHaveAttribute('data-direction', 'column');

        // Check that title and text are rendered
        const texts = screen.getAllByTestId('text-component');
        expect(texts).toHaveLength(2);

        // First text should be the title
        expect(texts[0]).toHaveTextContent('Test Title');
        expect(texts[0]).toHaveAttribute('data-color', 'text.subtext.placeholder.dark');
        expect(texts[0]).toHaveAttribute('data-font-size', '14');

        // Second text should be the content
        expect(texts[1]).toHaveTextContent('Test Text');
        expect(texts[1]).toHaveAttribute('data-color', '#fff');
        expect(texts[1]).toHaveAttribute('data-font-size', '14');
        expect(texts[1]).toHaveAttribute('data-font-weight', '500');
    });

    test('renders with row direction when specified', () => {
        render(<TitledText title="Row Title" text="Row Text" direction="row" />);

        // Check that the main container is rendered with row direction
        const mainContainer = screen.getByTestId('main-flex-container');
        expect(mainContainer).toBeInTheDocument();
        expect(mainContainer).toHaveAttribute('data-direction', 'row');

        // Check texts are rendered properly
        const texts = screen.getAllByTestId('text-component');
        expect(texts[0]).toHaveTextContent('Row Title');
        expect(texts[1]).toHaveTextContent('Row Text');
    });

    test('renders with right content when provided', () => {
        const rightContent = <div data-testid="custom-right-content">Right Content</div>;
        render(<TitledText title="With Right" text="Main Text" rightContent={rightContent} />);

        // Check for the rightContent
        const rightContentElement = screen.getByTestId('custom-right-content');
        expect(rightContentElement).toBeInTheDocument();
        expect(rightContentElement).toHaveTextContent('Right Content');

        // Check for the flex container that wraps the right content
        const rightContentContainer = screen.getByTestId('right-content-container');
        expect(rightContentContainer).toHaveAttribute('data-align-items', 'center');
        expect(rightContentContainer).toHaveAttribute('data-justify-content', 'flex-end');
        expect(rightContentContainer).toHaveAttribute('data-width', '100%');
    });

    test('renders placeholder when text is null', () => {
        render(<TitledText title="Null Test" text={null as any} />);

        // Check texts are rendered with placeholder
        const texts = screen.getAllByTestId('text-component');
        expect(texts[0]).toHaveTextContent('Null Test');
        expect(texts[1]).toHaveTextContent('---');
    });
});