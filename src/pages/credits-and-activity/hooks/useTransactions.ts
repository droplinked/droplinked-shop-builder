import { useInfiniteQuery } from 'react-query';

const mockTransactions = [
    {
        type: 'Credit',
        amount: 500,
        date: new Date('2024-01-15'),
        transactionId: 'tx-001',
        details: 'Payment received',
        isInbound: true,
        isOutbound: false,
    },
    {
        type: 'Discount',
        amount: 200,
        date: new Date('2024-01-14'),
        transactionId: 'tx-002',
        details: 'Withdrawal',
        isInbound: false,
        isOutbound: true,
    },
    // Add more mock transactions as needed
];

export const useTransactions = () => {
    return useInfiniteQuery(
        ['transactions'],
        ({ pageParam = 0 }) => {
            return Promise.resolve({
                data: {
                    data: mockTransactions.slice(pageParam * 10, (pageParam + 1) * 10)
                }
            });
        },
        {
            getNextPageParam: (lastPage, pages) => {
                return pages.length < Math.ceil(mockTransactions.length / 10) ? pages.length : undefined;
            },
        }
    );
};
