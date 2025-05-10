import { render, screen } from '@testing-library/react';
import React from 'react';
import MobileTable from './MobileTable';

// Mock the Chakra UI components
jest.mock('@chakra-ui/react', () => ({
    Flex: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));

// Mock the AppSkeleton component
jest.mock('components/common/skeleton/AppSkeleton', () => ({
    __esModule: true,
    default: ({ children, isLoaded, ...props }: any) => (
        <div data-testid={`skeleton-${isLoaded ? 'loaded' : 'loading'}`} {...props}>
            {children}
        </div>
    ),
}));

// Mock the MobileCards component
jest.mock('./MobileCards', () => ({
    __esModule: true,
    default: ({ item }: any) => <div data-testid="mobile-card" data-id={item._id} />,
}));

// Mock InfiniteScroll
jest.mock('react-infinite-scroll-component', () => ({
    __esModule: true,
    default: ({ children, next, hasMore, loader, dataLength }: any) => (
        <div data-testid="infinite-scroll" data-has-more={hasMore} data-length={dataLength}>
            {children}
            {hasMore && <button onClick={next} data-testid="load-more">Load More</button>}
            {hasMore && loader}
        </div>
    ),
}));

describe('MobileTable', () => {
    const mockOrdersData = [
        { _id: '1', status: 'pending', customerEmail: 'test1@example.com' },
        { _id: '2', status: 'completed', customerEmail: 'test2@example.com' },
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
            pageParams: [1],
        },
        fetchNextPage: jest.fn(),
        hasNextPage: true,
        isLoading: false,
        isFetchingNextPage: false,
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders loading skeletons when isLoading is true', () => {
        const loadingQueryResult = {
            ...mockQueryResult,
            isLoading: true,
        };

        render(<MobileTable purchaseHistoryQuery={loadingQueryResult as any} />);

        // Check for multiple loading skeletons
        const skeletons = screen.getAllByTestId('skeleton-loading');
        expect(skeletons.length).toBe(5);
    });

    test('renders orders when data is loaded', () => {
        render(<MobileTable purchaseHistoryQuery={mockQueryResult as any} />);

        // Check that InfiniteScroll is rendered
        const infiniteScroll = screen.getByTestId('infinite-scroll');
        expect(infiniteScroll).toBeInTheDocument();
        expect(infiniteScroll).toHaveAttribute('data-has-more', 'true');

        // Check that MobileCards are rendered for each order
        const cards = screen.getAllByTestId('mobile-card');
        expect(cards.length).toBe(2);
    });

    test('renders loading skeleton when fetching next page', () => {
        const fetchingNextPageQueryResult = {
            ...mockQueryResult,
            isFetchingNextPage: true,
        };

        render(<MobileTable purchaseHistoryQuery={fetchingNextPageQueryResult as any} />);

        // Check that the loading skeleton is rendered for next page
        const loadMoreButton = screen.getByTestId('load-more');
        expect(loadMoreButton).toBeInTheDocument();

        const nextPageSkeleton = screen.getByTestId('skeleton-loading');
        expect(nextPageSkeleton).toBeInTheDocument();
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
                pageParams: [1],
            },
        };

        render(<MobileTable purchaseHistoryQuery={emptyQueryResult as any} />);

        // Check that InfiniteScroll is rendered
        const infiniteScroll = screen.getByTestId('infinite-scroll');
        expect(infiniteScroll).toBeInTheDocument();

        // Check that no MobileCards are rendered
        const cards = screen.queryAllByTestId('mobile-card');
        expect(cards.length).toBe(0);
    });
});