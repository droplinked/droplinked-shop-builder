import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { OrderStatus } from '../helpers';
import ControlsPopover from './ControlsPopover';

// Mock useDisclosure hook to track open/close states
const mockOnOpen = jest.fn();
const mockOnClose = jest.fn();

// Mock the Chakra UI hooks and components
jest.mock('@chakra-ui/react', () => ({
    useDisclosure: () => ({
        isOpen: false,
        onOpen: mockOnOpen,
        onClose: mockOnClose
    }),
}));

// Mock the icon components
jest.mock('assets/icons/Finance/Invoice/InvoiceMd', () => ({
    InvoiceMd: () => <div data-testid="invoice-icon" />
}));

jest.mock('assets/icons/Sign/Close/CloseMd', () => ({
    CloseMd: () => <div data-testid="close-icon" />
}));

// Mock the TableMenu component
jest.mock('components/redesign/table-menu/TableMenu', () => ({
    __esModule: true,
    default: ({ items }: any) => (
        <div data-testid="table-menu">
            {items.map((item: any, index: number) => (
                <button
                    key={index}
                    onClick={item.onClick}
                    disabled={item.isDisabled}
                    data-testid={`menu-item-${index}`}
                >
                    {item.icon}
                    {item.title}
                </button>
            ))}
        </div>
    )
}));

// Mock the modal components
jest.mock('./CancelOrderModal', () => ({
    __esModule: true,
    default: ({ isOpen, onClose, orderID }: any) => (
        isOpen ? <div data-testid="cancel-order-modal" data-order-id={orderID}>Cancel Modal</div> : null
    )
}));

jest.mock('./OrderDetails', () => ({
    __esModule: true,
    default: ({ isOpen, onClose, rowData }: any) => (
        isOpen ? <div data-testid="order-details-drawer" data-order-id={rowData._id}>Order Details</div> : null
    )
}));

describe('ControlsPopover', () => {
    const mockOrder = {
        _id: 'order123',
        customerEmail: 'test@example.com',
        updatedAt: new Date(),
        status: 'PAYMENT_CONFIRMED' as OrderStatus,
        customerAddressBook: {
            firstName: 'John',
            lastName: 'Doe'
        }
    };

    test('renders TableMenu with the correct options', () => {
        render(<ControlsPopover rowData={mockOrder} />);

        // Check that the menu renders with both options
        const tableMenu = screen.getByTestId('table-menu');
        expect(tableMenu).toBeInTheDocument();

        // Check that both menu items are present
        const detailsButton = screen.getByTestId('menu-item-0');
        const cancelButton = screen.getByTestId('menu-item-1');

        expect(detailsButton).toHaveTextContent('Order Details');
        expect(cancelButton).toHaveTextContent('Cancel');

        // Check that both icons are present
        expect(screen.getByTestId('invoice-icon')).toBeInTheDocument();
        expect(screen.getByTestId('close-icon')).toBeInTheDocument();
    });

    test('disables Cancel button when order is already cancelled', () => {
        const cancelledOrder = {
            ...mockOrder,
            status: 'CANCELED' as OrderStatus
        };

        render(<ControlsPopover rowData={cancelledOrder} />);

        // Check that Cancel button is disabled
        const cancelButton = screen.getByTestId('menu-item-1');
        expect(cancelButton).toBeDisabled();
    });

    test('disables Cancel button when isCancelled prop is true', () => {
        render(<ControlsPopover rowData={mockOrder} isCancelled={true} />);

        // Check that Cancel button is disabled when explicitly set
        const cancelButton = screen.getByTestId('menu-item-1');
        expect(cancelButton).toBeDisabled();
    });

    test('enables Cancel button for non-cancelled orders', () => {
        render(<ControlsPopover rowData={mockOrder} isCancelled={false} />);

        // Check that Cancel button is enabled
        const cancelButton = screen.getByTestId('menu-item-1');
        expect(cancelButton).not.toBeDisabled();
    });

    test('opens OrderDetails drawer when Order Details button is clicked', () => {
        render(<ControlsPopover rowData={mockOrder} />);
        
        // Click on the Order Details button
        const detailsButton = screen.getByTestId('menu-item-0');
        fireEvent.click(detailsButton);
        
        // Check that the onOpen function for the details drawer was called
        expect(mockOnOpen).toHaveBeenCalledTimes(1);
    });

    test('opens CancelOrderModal when Cancel button is clicked', () => {
        // Reset the mock function before the test
        mockOnOpen.mockReset();
        
        render(<ControlsPopover rowData={mockOrder} />);
        
        // Click on the Cancel button
        const cancelButton = screen.getByTestId('menu-item-1');
        fireEvent.click(cancelButton);
        
        // Check that the onOpen function for the cancel modal was called
        expect(mockOnOpen).toHaveBeenCalledTimes(1);
    });

    test('does not open CancelOrderModal when Cancel button is disabled and clicked', () => {
        // Reset the mock function before the test
        mockOnOpen.mockReset();
        
        const cancelledOrder = {
            ...mockOrder,
            status: 'CANCELED' as OrderStatus
        };
        
        render(<ControlsPopover rowData={cancelledOrder} />);
        
        // Click on the disabled Cancel button
        const cancelButton = screen.getByTestId('menu-item-1');
        fireEvent.click(cancelButton);
        
        // Check that the onOpen function was not called
        expect(mockOnOpen).not.toHaveBeenCalled();
    });
});