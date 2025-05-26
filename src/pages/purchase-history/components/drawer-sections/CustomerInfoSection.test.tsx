import { render, screen } from '@testing-library/react';
import React from 'react';
import CustomerInfoSection from './CustomerInfoSection';
import { IOrderDetails } from 'services/order/interfaces';

// Mock Chakra UI components
jest.mock('@chakra-ui/react', () => ({
    Flex: function MockFlex({ children, direction, gap, justifyContent, alignItems, flexDirection, ...props }) {
        return (
            <div
                data-testid="flex-container"
                data-direction={direction}
                data-gap={gap}
                data-justify={justifyContent}
                data-align-items={alignItems}
                data-flex-direction={flexDirection}
                {...props}
            >
                {children}
            </div>
        );
    }
}));

// Mock the components before importing the component under test
jest.mock('../drawer-components/InfoWrapper', () => ({
    __esModule: true,
    default: function MockInfoWrapper({ title, children, ...props }) {
        return (
            <div data-testid="info-wrapper" data-title={title} {...props}>
                {children}
            </div>
        );
    }
}));

jest.mock('../drawer-components/TitledText', () => ({
    __esModule: true,
    default: function MockTitledText({ title, text, direction }) {
        return (
            <div data-testid="titled-text" data-title={title} data-direction={direction}>
                {text}
            </div>
        );
    }
}));

describe('CustomerInfoSection', () => {
    const mockCustomer: IOrderDetails["customer"] = {
        name: 'John Doe',
        email: 'john@example.com',
        address: '123 Main St, City, Country',
        phone: '+1234567890'
    };

    const mockDetails: IOrderDetails["details"] = {
        products: 100,
        shipping: 10,
        tax: 5,
        cart: 115,
        profit: 20,
        paidWith: 'Credit Card',
        type: 'Standard',
        note: 'Please deliver to the back door'
    };

    test('renders customer information for physical products correctly', () => {
        render(
            <CustomerInfoSection
                customer={mockCustomer}
                details={mockDetails}
                isPhysical={true}
            />
        );

        // Check that InfoWrapper exists and has the correct title
        const infoWrapper = screen.getByTestId('info-wrapper');
        expect(infoWrapper).toHaveAttribute('data-title', 'Customer Information');

        // Check for customer information fields
        const titledTexts = screen.getAllByTestId('titled-text');

        // Check for Full Name
        const nameField = titledTexts.find(el => el.getAttribute('data-title') === 'Full Name');
        expect(nameField).toBeInTheDocument();
        expect(nameField).toHaveTextContent('John Doe');

        // Check for Email Address
        const emailField = titledTexts.find(el => el.getAttribute('data-title') === 'Email Address');
        expect(emailField).toBeInTheDocument();
        expect(emailField).toHaveTextContent('john@example.com');

        // Check for Mobile Number
        const phoneField = titledTexts.find(el => el.getAttribute('data-title') === 'Mobile Number');
        expect(phoneField).toBeInTheDocument();
        expect(phoneField).toHaveTextContent('+1234567890');

        // Check for Shipping Address
        const addressField = titledTexts.find(el => el.getAttribute('data-title') === 'Shipping Address');
        expect(addressField).toBeInTheDocument();
        expect(addressField).toHaveTextContent('123 Main St, City, Country');

        // Check for Additional Details (note)
        const noteField = titledTexts.find(el => el.getAttribute('data-title') === 'Additional Details');
        expect(noteField).toBeInTheDocument();
        expect(noteField).toHaveTextContent('Please deliver to the back door');
    });

    test('renders only email for non-physical products', () => {
        // Create a version of details without a note for this test
        const detailsWithoutNote = { ...mockDetails, note: undefined };

        render(
            <CustomerInfoSection
                customer={mockCustomer}
                details={detailsWithoutNote}
                isPhysical={false}
            />
        );

        // Check that InfoWrapper exists and has the correct title
        const infoWrapper = screen.getByTestId('info-wrapper');
        expect(infoWrapper).toHaveAttribute('data-title', 'Customer Information');

        // Check for customer information fields
        const titledTexts = screen.getAllByTestId('titled-text');

        // Only Email Address should be present
        expect(titledTexts).toHaveLength(1);
        expect(titledTexts[0]).toHaveAttribute('data-title', 'Email Address');
        expect(titledTexts[0]).toHaveTextContent('john@example.com');

        // Full Name should not be present
        const nameField = screen.queryByText('Full Name');
        expect(nameField).not.toBeInTheDocument();

        // Shipping Address should not be present
        const addressField = screen.queryByText('Shipping Address');
        expect(addressField).not.toBeInTheDocument();
    });

    test('does not render note field when note is empty', () => {
        const detailsWithoutNote = { ...mockDetails, note: undefined };

        render(
            <CustomerInfoSection
                customer={mockCustomer}
                details={detailsWithoutNote}
                isPhysical={true}
            />
        );

        // Note field should not be present
        const noteField = screen.queryByText('Additional Details');
        expect(noteField).not.toBeInTheDocument();
    });
});