import { render, screen } from '@testing-library/react';
import React from 'react';
import DateCell from './DateCell';
import { formatDateToLongStyle, formattedTime } from 'utils/helpers';

// Mock the helper functions to avoid external dependencies
jest.mock('utils/helpers', () => ({
    formatDateToLongStyle: jest.fn(),
    formattedTime: jest.fn(),
}));

// Mock Chakra UI components
jest.mock('@chakra-ui/react', () => ({
    Text: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));

// Mock DotSeparatedList component
jest.mock('components/redesign/dot-separated-list/DotSeparatedList', () => ({
    __esModule: true,
    default: ({ children }: any) => <div data-testid="dot-separated-list">{children}</div>,
}));

describe('DateCell', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders "Not available" when date is null', () => {
        render(<DateCell date={null} />);
        expect(screen.getByText('Not available')).toBeInTheDocument();
    });

    test('renders formatted date and time when date is provided', () => {
        const testDate = new Date('2023-05-15T14:30:00');

        // Set up mocks to return specific values
        (formatDateToLongStyle as jest.Mock).mockReturnValue('May 15, 2023');
        (formattedTime as jest.Mock).mockReturnValue('2:30 PM');

        render(<DateCell date={testDate} />);

        expect(formatDateToLongStyle).toHaveBeenCalledWith(testDate);
        expect(formattedTime).toHaveBeenCalledWith(testDate);

        expect(screen.getByText('May 15, 2023')).toBeInTheDocument();
        expect(screen.getByText('2:30 PM')).toBeInTheDocument();
    });

    test('renders formatted date and time when date is provided as string', () => {
        const testDateString = '2023-05-15T14:30:00';

        // Set up mocks to return specific values
        (formatDateToLongStyle as jest.Mock).mockReturnValue('May 15, 2023');
        (formattedTime as jest.Mock).mockReturnValue('2:30 PM');

        render(<DateCell date={testDateString} />);

        expect(formatDateToLongStyle).toHaveBeenCalledWith(expect.any(Date));
        expect(formattedTime).toHaveBeenCalledWith(testDateString);

        expect(screen.getByText('May 15, 2023')).toBeInTheDocument();
        expect(screen.getByText('2:30 PM')).toBeInTheDocument();
    });
});
