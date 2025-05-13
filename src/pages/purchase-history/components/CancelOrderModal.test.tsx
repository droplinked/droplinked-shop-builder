import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import CancelOrderModal from './CancelOrderModal';
import { useQueryClient } from 'react-query';

// Mock the necessary dependencies
jest.mock('lib/apis/orders/orderServices', () => ({
    cancelOrderById: jest.fn(),
}));

// Fix the useMutation mock to correctly return mutateAsync
jest.mock('react-query', () => ({
    useMutation: () => ({
        mutateAsync: jest.fn().mockImplementation(() => Promise.resolve()),
        isLoading: false,
    }),
    useQueryClient: jest.fn(),
}));

jest.mock('hooks/toast/useToast', () => ({
    __esModule: true,
    default: () => ({
        showToast: jest.fn(),
    }),
}));

// Mock Chakra UI components
jest.mock('@chakra-ui/react', () => ({
    ModalFooter: ({ children, ...props }: any) => <div data-testid="modal-footer" {...props}>{children}</div>,
}));

// Mock custom components
jest.mock('components/redesign/button/AppButton', () => ({
    __esModule: true,
    default: ({ children, onClick, isLoading, ...props }: any) => (
        <button
            onClick={onClick}
            disabled={isLoading}
            data-testid={`button-${children.toString().toLowerCase().replace(/\s+/g, '-')}`}
            {...props}
        >
            {children}
        </button>
    ),
}));

jest.mock('components/redesign/modal/AppModal', () => ({
    __esModule: true,
    default: ({ children, modalRootProps, ...props }: any) => (
        <div
            data-testid="app-modal"
            data-is-open={modalRootProps.isOpen}
            {...props}
        >
            {children}
        </div>
    ),
}));

jest.mock('components/redesign/modal/ModalHeaderData', () => ({
    __esModule: true,
    default: ({ title, description, ...props }: any) => (
        <div data-testid="modal-header" {...props}>
            <h2>{title}</h2>
            <p data-testid="modal-description">{description}</p>
        </div>
    ),
}));

jest.mock('assets/icons/Sign/Warning/WarningLg', () => ({
    WarningLg: () => <div data-testid="warning-icon" />,
}));

describe('CancelOrderModal', () => {
    const mockProps = {
        isOpen: true,
        onClose: jest.fn(),
        orderID: 'order-123',
    };

    const mockInvalidateQueries = jest.fn();
    const mockMutateAsync = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useQueryClient as jest.Mock).mockImplementation(() => ({
            invalidateQueries: mockInvalidateQueries,
        }));

        // Reset mock for mutateAsync for each test
        mockMutateAsync.mockReset();
        jest.spyOn(require('react-query'), 'useMutation').mockImplementation(() => ({
            mutateAsync: mockMutateAsync,
            isLoading: false,
        }));
    });

    test('renders the modal with correct content', () => {
        render(<CancelOrderModal {...mockProps} />);

        // Check that the modal is open with the correct props
        const modal = screen.getByTestId('app-modal');
        expect(modal).toBeInTheDocument();
        expect(modal).toHaveAttribute('data-is-open', 'true');

        // Check header content
        expect(screen.getByText('Confirm Order Cancellation')).toBeInTheDocument();

        // Check description with order ID
        const description = screen.getByTestId('modal-description');
        expect(description).toHaveTextContent(`You are about to cancel order ${mockProps.orderID}`);
        expect(description).toHaveTextContent('This action cannot be undone');

        // Check buttons
        expect(screen.getByTestId('button-close')).toBeInTheDocument();
        expect(screen.getByTestId('button-yes,-cancel-order')).toBeInTheDocument();
    });

    test('closes modal when Close button is clicked', () => {
        render(<CancelOrderModal {...mockProps} />);

        const closeButton = screen.getByTestId('button-close');
        fireEvent.click(closeButton);

        expect(mockProps.onClose).toHaveBeenCalledTimes(1);
    });

    test('cancels order when confirm button is clicked', async () => {
        mockMutateAsync.mockResolvedValue({});

        render(<CancelOrderModal {...mockProps} />);

        const confirmButton = screen.getByTestId('button-yes,-cancel-order');
        fireEvent.click(confirmButton);

        await waitFor(() => {
            // Verify mutateAsync was called
            expect(mockMutateAsync).toHaveBeenCalledTimes(1);

            // Verify modal closed
            expect(mockProps.onClose).toHaveBeenCalledTimes(1);

            // Verify query invalidation
            expect(mockInvalidateQueries).toHaveBeenCalledWith(['purchase-history-query']);
        });
    });

    test('handles API error when cancelling order', async () => {
        const mockError = new Error('API Error');
        mockMutateAsync.mockRejectedValue(mockError);

        render(<CancelOrderModal {...mockProps} />);

        const confirmButton = screen.getByTestId('button-yes,-cancel-order');
        fireEvent.click(confirmButton);

        await waitFor(() => {
            // Verify mutateAsync was called
            expect(mockMutateAsync).toHaveBeenCalledTimes(1);

            // Verify modal NOT closed on error
            expect(mockProps.onClose).not.toHaveBeenCalled();

            // Verify query NOT invalidated on error
            expect(mockInvalidateQueries).not.toHaveBeenCalled();
        });
    });
});