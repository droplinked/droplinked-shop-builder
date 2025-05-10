import { render, screen } from '@testing-library/react';
import React from 'react';
import DesktopTable from './DesktopTable';

// Mock react-table
jest.mock('@tanstack/react-table', () => ({
    ColumnDef: jest.fn(),
}));

// Mock Table component
jest.mock('components/redesign/table/Table', () => ({
    __esModule: true,
    default: ({ data, columns, isLoading, infiniteScroll }: any) => (
        <div
            data-testid="table-component"
            data-loading={isLoading}
            data-has-more={infiniteScroll?.hasMore}
        >
            <table>
                <thead>
                    <tr>
                        {columns.map((col: any, idx: number) => (
                            <th key={idx}>{col.header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item: any, rowIdx: number) => (
                        <tr key={rowIdx} data-testid="table-row" data-id={item._id}>
                            {columns.map((col: any, colIdx: number) => (
                                <td key={colIdx} data-testid={`cell-${col.accessorKey}`}>
                                    {col.cell({ row: { original: item } })}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    ),
}));

// Mock DateCell component
jest.mock('./DateCell', () => ({
    __esModule: true,
    default: ({ date }: any) => <div data-testid="date-cell">{date ? 'Date Value' : 'Not available'}</div>,
}));

// Mock AppBadge component
jest.mock('components/redesign/badge/AppBadge', () => ({
    __esModule: true,
    default: ({ text, status }: any) => (
        <div data-testid="app-badge" data-status={status}>{text}</div>
    ),
}));

// Mock ControlsPopover component
jest.mock('../ControlsPopover', () => ({
    __esModule: true,
    default: ({ rowData, isCancelled }: any) => (
        <div data-testid="controls-popover" data-id={rowData._id} data-cancelled={isCancelled}></div>
    ),
}));

// Mock helper functions
jest.mock('../../helpers', () => ({
    formatUnderlinedText: (text: string) => `Formatted_${text}`,
    getCustomerDisplayName: jest.fn().mockReturnValue('Test Customer'),
    getStatusColorScheme: (status: string) => `color-${status}`,
    isOrderCancelled: (status: string) => status === 'cancelled',
}));

describe('DesktopTable', () => {
    const mockOrdersData = [
        {
            _id: '1',
            status: 'pending',
            customerEmail: 'test1@example.com',
            customerAddressBook: { firstName: 'John', lastName: 'Doe' },
            updatedAt: '2023-05-15T14:30:00'
        },
        {
            _id: '2',
            status: 'completed',
            customerEmail: 'test2@example.com',
            customerAddressBook: null,
            updatedAt: '2023-05-16T10:15:00'
        },
        {
            _id: '3',
            status: 'cancelled',
            customerEmail: 'test3@example.com',
            customerAddressBook: { firstName: 'Jane', lastName: 'Smith' },
            updatedAt: '2023-05-17T09:45:00'
        }
    ];

    const mockQueryResult = {
        data: {
            pages: [
                {
                    data: {
                        data: {
                            data: mockOrdersData,
                        },
                    },
                },
            ],
        },
        fetchNextPage: jest.fn(),
        hasNextPage: true,
        isFetching: false,
        isFetchingNextPage: false,
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders table with correct columns and data', () => {
        render(<DesktopTable purchaseHistoryQuery={mockQueryResult as any} />);

        // Check that the table component is rendered with correct props
        const tableComponent = screen.getByTestId('table-component');
        expect(tableComponent).toBeInTheDocument();
        expect(tableComponent).toHaveAttribute('data-loading', 'false');
        expect(tableComponent).toHaveAttribute('data-has-more', 'true');

        // Check that the correct number of rows are rendered
        const rows = screen.getAllByTestId('table-row');
        expect(rows.length).toBe(3);

        // Check that the expected column headers are rendered
        expect(screen.getByText('Order ID')).toBeInTheDocument();
        expect(screen.getByText('Customer')).toBeInTheDocument();
        expect(screen.getByText('Date')).toBeInTheDocument();
        expect(screen.getByText('Status')).toBeInTheDocument();

        // Check status column rendering
        const statusCells = screen.getAllByTestId('app-badge');
        expect(statusCells.length).toBe(3);
        expect(statusCells[0]).toHaveTextContent('Formatted_pending');
        expect(statusCells[1]).toHaveTextContent('Formatted_completed');
        expect(statusCells[2]).toHaveTextContent('Formatted_cancelled');

        // Check controls column rendering
        const controlCells = screen.getAllByTestId('controls-popover');
        expect(controlCells.length).toBe(3);
        expect(controlCells[0]).toHaveAttribute('data-cancelled', 'false');
        expect(controlCells[2]).toHaveAttribute('data-cancelled', 'true');
    });

    test('handles empty orders array', () => {
        const emptyQueryResult = {
            ...mockQueryResult,
            data: {
                pages: [
                    {
                        data: {
                            data: {
                                data: [],
                            },
                        },
                    },
                ],
            },
        };

        render(<DesktopTable purchaseHistoryQuery={emptyQueryResult as any} />);

        // Check that the table component is still rendered
        const tableComponent = screen.getByTestId('table-component');
        expect(tableComponent).toBeInTheDocument();

        // Check that no rows are rendered
        const rows = screen.queryAllByTestId('table-row');
        expect(rows.length).toBe(0);
    });

    test('handles loading state', () => {
        const loadingQueryResult = {
            ...mockQueryResult,
            isFetching: true,
        };

        render(<DesktopTable purchaseHistoryQuery={loadingQueryResult as any} />);

        // Check that the table is in loading state
        const tableComponent = screen.getByTestId('table-component');
        expect(tableComponent).toHaveAttribute('data-loading', 'true');
    });
});