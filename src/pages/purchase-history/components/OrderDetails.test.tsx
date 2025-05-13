import { render, screen } from '@testing-library/react';
import React from 'react';
import OrderDetails from './OrderDetails';
import { useQuery } from 'react-query';
import { useMediaQuery } from '@chakra-ui/react';
import { IOrders } from '../interface';

// Mock dependencies
jest.mock('axios', () => ({
    create: jest.fn(() => ({
        interceptors: {
            request: { use: jest.fn(), eject: jest.fn() },
            response: { use: jest.fn(), eject: jest.fn() }
        },
        get: jest.fn(),
        post: jest.fn(),
        put: jest.fn(),
        delete: jest.fn()
    })),
    post: jest.fn(),
    get: jest.fn()
}));

jest.mock('react-query', () => ({
    useQuery: jest.fn()
}));

// Mock Chakra UI components and hooks
jest.mock('@chakra-ui/react', () => {
    return {
        TabPanel: ({ children, ...props }) => <div data-testid="tab-panel" {...props}>{children}</div>,
        TabPanels: ({ children, ...props }) => <div data-testid="tab-panels" {...props}>{children}</div>,
        Tabs: ({ children, ...props }) => <div data-testid="tabs" {...props}>{children}</div>,
        useMediaQuery: jest.fn().mockReturnValue([false])
    };
});

jest.mock('components/common/Drawer/Drawer', () => ({
    __esModule: true,
    default: ({ children, isOpen, onClose, title, headerContent, ...props }: any) => (
        <div
            data-testid="drawer"
            data-is-open={isOpen}
            data-title={title}
            {...props}
        >
            <div data-testid="drawer-header-content">{headerContent}</div>
            <div data-testid="drawer-content">{children}</div>
        </div>
    )
}));

jest.mock('./drawer-sections/OrderInformation', () => ({
    __esModule: true,
    default: ({ orderData, isFetching }: any) => (
        <div
            data-testid="order-information"
            data-is-fetching={isFetching}
            data-order-id={orderData?._id}
        >
            Order Information Content
        </div>
    )
}));

jest.mock('./drawer-sections/OrderCart', () => ({
    __esModule: true,
    default: ({ orderData, rowData, isFetching }: any) => (
        <div
            data-testid="order-cart"
            data-is-fetching={isFetching}
            data-order-id={orderData?._id}
            data-row-id={rowData?._id}
        >
            Order Cart Content
        </div>
    )
}));

jest.mock('./OrderHeaderContent', () => ({
    __esModule: true,
    default: ({ isFetching, updatedAt, orderStatus, tabs }: any) => (
        <div
            data-testid="order-header-content"
            data-is-fetching={isFetching}
            data-updated-at={updatedAt?.toString()}
            data-order-status={orderStatus}
            data-tabs-count={tabs?.length}
        >
            Header Content
        </div>
    )
}));

jest.mock('../helpers', () => ({
    truncateText: (text: string, length: number) => `${text.substring(0, length)}...`
}));

describe('OrderDetails', () => {
    const mockOrderData: IOrders = {
        _id: '12345678901234567890',
        customerEmail: 'test@example.com',
        updatedAt: new Date('2025-01-01'),
        status: "PAYMENT_CONFIRMED",
        customerAddressBook: {
            firstName: 'John',
            lastName: 'Doe'
        }
    };

    const mockClose = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders correctly with loading state', () => {
        (useQuery as jest.Mock).mockReturnValue({
            isFetching: true,
            data: undefined
        });

        render(<OrderDetails
            rowData={mockOrderData}
            isOpen={true}
            onClose={mockClose}
        />);

        const drawer = screen.getByTestId('drawer');
        expect(drawer).toBeInTheDocument();
        expect(drawer).toHaveAttribute('data-is-open', 'true');
        expect(drawer).toHaveAttribute('data-title', 'Order 1234567890...');

        const headerContent = screen.getByTestId('order-header-content');
        expect(headerContent).toHaveAttribute('data-is-fetching', 'true');
        expect(headerContent).toHaveAttribute('data-updated-at', mockOrderData.updatedAt.toString());
        expect(headerContent).toHaveAttribute('data-order-status', '');
        expect(headerContent).toHaveAttribute('data-tabs-count', '2');
    });

    test('correctly passes data to child components when loaded', () => {
        const mockResponseData = {
            data: {
                data: {
                    _id: '12345678901234567890',
                    orderInformation: {
                        status: 'completed'
                    },
                    customerDetails: {
                        email: 'test@example.com'
                    }
                }
            }
        };

        (useQuery as jest.Mock).mockReturnValue({
            isFetching: false,
            data: mockResponseData
        });

        render(<OrderDetails
            rowData={mockOrderData}
            isOpen={true}
            onClose={mockClose}
        />);

        const headerContent = screen.getByTestId('order-header-content');
        expect(headerContent).toHaveAttribute('data-is-fetching', 'false');
        expect(headerContent).toHaveAttribute('data-order-status', 'completed');

        // Check tabs are rendered correctly
        const tabPanels = screen.getByTestId('tab-panels');
        expect(tabPanels).toBeInTheDocument();

        const tabPanelElements = screen.getAllByTestId('tab-panel');
        expect(tabPanelElements).toHaveLength(2);

        // Check first tab content (Order Information)
        const orderInfo = screen.getByTestId('order-information');
        expect(orderInfo).toBeInTheDocument();
        expect(orderInfo).toHaveAttribute('data-is-fetching', 'false');
        expect(orderInfo).toHaveAttribute('data-order-id', mockResponseData.data.data._id);

        // Check second tab content (Cart)
        const orderCart = screen.getByTestId('order-cart');
        expect(orderCart).toBeInTheDocument();
        expect(orderCart).toHaveAttribute('data-is-fetching', 'false');
        expect(orderCart).toHaveAttribute('data-order-id', mockResponseData.data.data._id);
        expect(orderCart).toHaveAttribute('data-row-id', mockOrderData._id);
    });

    test('renders with correct placement based on screen size', () => {
        (useMediaQuery as jest.Mock).mockReturnValue([true]);
        (useQuery as jest.Mock).mockReturnValue({
            isFetching: false,
            data: {
                data: {
                    data: {
                        _id: '12345678901234567890',
                        orderInformation: { status: 'processing' }
                    }
                }
            }
        });

        render(<OrderDetails
            rowData={mockOrderData}
            isOpen={true}
            onClose={mockClose}
        />);

        const drawer = screen.getByTestId('drawer');
        expect(drawer).toHaveAttribute('placement', 'bottom');

        // Reset and test with larger screen
        (useMediaQuery as jest.Mock).mockReturnValue([false]);

        render(<OrderDetails
            rowData={mockOrderData}
            isOpen={true}
            onClose={mockClose}
        />);

        const drawerLargeScreen = screen.getAllByTestId('drawer')[1];
        expect(drawerLargeScreen).toHaveAttribute('placement', 'right');
    });

    test('correctly handles the enabled property for useQuery', () => {
        render(<OrderDetails
            rowData={mockOrderData}
            isOpen={false}
            onClose={mockClose}
        />);

        expect(useQuery).toHaveBeenCalledWith({
            queryKey: ["order", mockOrderData._id],
            queryFn: expect.any(Function),
            enabled: false,
        });

        // Test with drawer open
        render(<OrderDetails
            rowData={mockOrderData}
            isOpen={true}
            onClose={mockClose}
        />);

        expect(useQuery).toHaveBeenCalledWith({
            queryKey: ["order", mockOrderData._id],
            queryFn: expect.any(Function),
            enabled: true,
        });
    });
});