import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import FilterInputs from './FilterInputs';
import { useQuery } from 'react-query';

// Mock dependencies
jest.mock('react-query', () => ({
    useQuery: jest.fn()
}));

jest.mock('lib/apis/orders/orderServices', () => ({
    ordersStatuesServices: jest.fn()
}));

jest.mock('@chakra-ui/react', () => ({
    Flex: ({ children, ...props }: any) => <div data-testid="flex" {...props}>{children}</div>,
}));

jest.mock('components/common/skeleton/AppSkeleton', () => ({
    __esModule: true,
    default: ({ children, isLoaded, ...props }: any) => (
        <div data-testid="app-skeleton" data-isloaded={isLoaded} {...props}>
            {children}
        </div>
    )
}));

jest.mock('components/redesign/select-menu/SelectMenu', () => ({
    __esModule: true,
    default: ({ items, onChange, value, placeholder, ...props }: any) => (
        <div data-testid="select-menu" data-placeholder={placeholder}>
            <select
                data-testid="select-input"
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
            >
                <option value="">Select...</option>
                {items?.map((item: any, index: number) => (
                    <option key={index} value={item.value}>
                        {item.label}
                    </option>
                ))}
            </select>
        </div>
    )
}));

jest.mock('assets/icons/Action/Filter/FilterMd', () => ({
    FilterMd: () => <span data-testid="filter-icon">Filter Icon</span>
}));

describe('FilterInputs', () => {
    const mockOnStatusChange = jest.fn();
    const mockData = {
        data: {
            data: [
                { caption: 'Processing', value: 'processing' },
                { caption: 'Completed', value: 'completed' },
                { caption: 'Cancelled', value: 'cancelled' }
            ]
        }
    };

    beforeEach(() => {
        jest.clearAllMocks();
        (useQuery as jest.Mock).mockReturnValue({
            isFetching: false,
            data: mockData.data.data
        });
    });

    test('renders correctly with loading state', () => {
        (useQuery as jest.Mock).mockReturnValue({
            isFetching: true,
            data: undefined
        });

        render(<FilterInputs onStatusChange={mockOnStatusChange} />);

        const skeleton = screen.getByTestId('app-skeleton');
        expect(skeleton).toHaveAttribute('data-isloaded', 'false');
    });

    test('renders select menu with correct options when data is loaded', () => {
        render(<FilterInputs onStatusChange={mockOnStatusChange} />);

        const skeleton = screen.getByTestId('app-skeleton');
        expect(skeleton).toHaveAttribute('data-isloaded', 'true');

        const selectMenu = screen.getByTestId('select-menu');
        expect(selectMenu).toBeInTheDocument();

        // Check that options are rendered
        const options = screen.getAllByRole('option');
        expect(options).toHaveLength(4); // 3 items + default option

        // Check option values
        expect(options[1]).toHaveValue('processing');
        expect(options[1]).toHaveTextContent('Processing');
        expect(options[2]).toHaveValue('completed');
        expect(options[2]).toHaveTextContent('Completed');
        expect(options[3]).toHaveValue('cancelled');
        expect(options[3]).toHaveTextContent('Cancelled');
    });

    test('calls onStatusChange when an option is selected', () => {
        render(<FilterInputs onStatusChange={mockOnStatusChange} />);

        const select = screen.getByTestId('select-input');
        fireEvent.change(select, { target: { value: 'completed' } });

        expect(mockOnStatusChange).toHaveBeenCalledWith('completed');
    });

    test('displays the correct status when selectValue is provided', () => {
        render(<FilterInputs onStatusChange={mockOnStatusChange} selectValue="completed" />);

        const select = screen.getByTestId('select-input');
        expect(select).toHaveValue('completed');
    });

    test('displays placeholder when no value is selected', () => {
        render(<FilterInputs onStatusChange={mockOnStatusChange} />);

        const selectMenu = screen.getByTestId('select-menu');
        expect(selectMenu).toHaveAttribute('data-placeholder', 'Status');
    });

    test('uses the useQuery hook correctly', () => {
        render(<FilterInputs onStatusChange={mockOnStatusChange} />);

        expect(useQuery).toHaveBeenCalledWith({
            queryKey: ["orders-statues"],
            queryFn: expect.any(Function),
            select: expect.any(Function)
        });
    });
});