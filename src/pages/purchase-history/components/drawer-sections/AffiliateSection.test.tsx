// filepath: i:\droplinked-shop-builder\src\pages\purchase-history\components\drawer-sections\AffiliateSection.test.tsx
import { render, screen } from '@testing-library/react';
import React from 'react';
import { IOrderDetails } from 'lib/apis/order/interfaces';
import AffiliateSection from './AffiliateSection';

// Mock Chakra UI components
jest.mock('@chakra-ui/react', () => ({
    Flex: function MockFlex({ children, direction, gap, ...props }) {
        return (
            <div
                data-testid="flex-container"
                data-direction={direction}
                data-gap={gap}
                {...props}
            >
                {children}
            </div>
        );
    }
}));

// Mock the components before importing the component under test
jest.mock('components/redesign/formatted-price/FormattedPrice', () => ({
    __esModule: true,
    default: function MockFormattedPrice({ price, ...props }) {
        return (
            <div data-testid="formatted-price" data-price={price} {...props}>
                ${price.toFixed(2)}
            </div>
        );
    }
}));

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

describe('AffiliateSection', () => {
    const mockAffiliates: IOrderDetails["affiliates"] = [
        {
            total: 100,
            publisherProfit: 30,
            publisher: 'Publisher One',
            publisherWallet: '0x123456789abcdef'
        },
        {
            total: 150,
            publisherProfit: 45,
            publisher: 'Publisher Two'
        }
    ];

    test('renders correctly with multiple affiliates', () => {
        render(<AffiliateSection affiliate={mockAffiliates} />);

        // Check that we have two info wrappers for two affiliates
        const infoWrappers = screen.getAllByTestId('info-wrapper');
        expect(infoWrappers).toHaveLength(2);

        // Check first affiliate
        expect(infoWrappers[0]).toHaveAttribute('data-title', 'Affiliate 1');

        // Check second affiliate
        expect(infoWrappers[1]).toHaveAttribute('data-title', 'Affiliate 2');

        // Check for publisher information
        const titledTexts = screen.getAllByTestId('titled-text');

        // Check that we have all required fields for both affiliates (3 fields * 2 affiliates = 6)
        expect(titledTexts).toHaveLength(6);

        // Check for publisher names
        const publisherFields = titledTexts.filter(el => el.getAttribute('data-title') === 'Publisher');
        expect(publisherFields).toHaveLength(2);

        // Check for publisher profit fields
        const publisherProfitFields = titledTexts.filter(el => el.getAttribute('data-title') === 'Publisher Profit');
        expect(publisherProfitFields).toHaveLength(2);

        // Check for total fields
        const totalFields = titledTexts.filter(el => el.getAttribute('data-title') === 'Total');
        expect(totalFields).toHaveLength(2);
    });

    test('renders correctly with a single affiliate', () => {
        const singleAffiliate = [mockAffiliates[0]];
        render(<AffiliateSection affiliate={singleAffiliate} />);

        // Check that we have one info wrapper for one affiliate
        const infoWrappers = screen.getAllByTestId('info-wrapper');
        expect(infoWrappers).toHaveLength(1);

        // Check affiliate title
        expect(infoWrappers[0]).toHaveAttribute('data-title', 'Affiliate 1');

        // Check for publisher information
        const titledTexts = screen.getAllByTestId('titled-text');

        // Check that we have all required fields for one affiliate (3 fields)
        expect(titledTexts).toHaveLength(3);
    });

    test('renders nothing with empty affiliates array', () => {
        const { container } = render(<AffiliateSection affiliate={[]} />);

        // Container should be empty
        expect(container.firstChild).toBeNull();
    });
});