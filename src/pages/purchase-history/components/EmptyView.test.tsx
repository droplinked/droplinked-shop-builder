import { render, screen } from '@testing-library/react';
import React from 'react';
import EmptyView from './EmptyView';

// Mock the Chakra UI components
jest.mock('@chakra-ui/react', () => ({
    Flex: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    Text: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));

// Mock the AppImage component
jest.mock('components/common/image/AppImage', () => ({
    __esModule: true,
    default: ({ src, alt, ...props }: any) => (
        <img
            src={src}
            alt={alt}
            data-testid="app-image"
            {...props}
        />
    ),
}));

describe('EmptyView', () => {
    test('renders empty state with image and text', () => {
        render(<EmptyView />);

        // Check that the image is rendered with correct props
        const image = screen.getByTestId('app-image');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('alt', 'Empty Form');
        expect(image).toHaveAttribute('width', '320px');
        expect(image).toHaveAttribute('height', '268px');

        // Check that the text message is displayed
        expect(screen.getByText('You don\'t have any order yet')).toBeInTheDocument();
    });
});