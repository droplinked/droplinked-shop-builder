import { useInfiniteQuery } from 'react-query';

const mockTransactions = Array(100).fill(null).map((_, index) => ({
    type: index % 3 === 0 ? 'Credit' : index % 3 === 1 ? 'Discount' : 'Withdrawal',
    amount: Math.floor(Math.random() * 1000) + 100,
    date: new Date(2024, 0, Math.floor(Math.random() * 30) + 1),
    transactionId: `tx-${(index + 1).toString().padStart(3, '0')}`,
    details: index % 3 === 0 ? 'Payment received' :
        index % 3 === 1 ? 'Discount applied' : 'Withdrawal processed',
    isInbound: index % 3 === 0,
    isOutbound: index % 3 !== 0
}));

export const useTransactions = () => {
    return useInfiniteQuery(
        ['transactions'],
        ({ pageParam = 0 }) => {
            return Promise.resolve({
                data: {
                    data: mockTransactions.slice(pageParam * 20, (pageParam + 1) * 20)
                }
            });
        },
        {
            getNextPageParam: (lastPage, pages) => {
                return pages.length < Math.ceil(mockTransactions.length / 20) ? pages.length : undefined;
            },
        }
    );
};
