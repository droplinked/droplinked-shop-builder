import React from 'react';

// Mock for useInfiniteQuery
export function useInfiniteQuery<TQueryFnData, TError, TData>(params: any) {
    const [state, setState] = React.useState({
        data: undefined,
        error: null,
        isLoading: true,
        isFetching: true,
        isError: false,
        hasNextPage: false,
        fetchNextPage: jest.fn(),
        isFetchingNextPage: false,
    });

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await params.queryFn({ pageParam: 1 });
                setState({
                    data: {
                        pages: [result],
                        pageParams: [1],
                    },
                    error: null,
                    isLoading: false,
                    isFetching: false,
                    isError: false,
                    hasNextPage: !!result.data.nextPage,
                    fetchNextPage: jest.fn(),
                    isFetchingNextPage: false,
                });
            } catch (error) {
                setState({
                    data: undefined,
                    error,
                    isLoading: false,
                    isFetching: false,
                    isError: true,
                    hasNextPage: false,
                    fetchNextPage: jest.fn(),
                    isFetchingNextPage: false,
                });
            }
        };

        fetchData();
    }, []);

    return state;
}

// Mock for QueryClient
export class QueryClient {
    defaultOptions: any;

    constructor(config: any) {
        this.defaultOptions = config?.defaultOptions;
    }

    setQueryDefaults = jest.fn();
    invalidateQueries = jest.fn();
    getQueryData = jest.fn();
    setQueryData = jest.fn();
    getQueriesData = jest.fn();
    resetQueries = jest.fn();
    removeQueries = jest.fn();
    cancelQueries = jest.fn();
    clear = jest.fn();
    mount = jest.fn();
    unmount = jest.fn();
}

// Mock for QueryClientProvider
export const QueryClientProvider = ({ children }: { children: React.ReactNode }) => {
    return <>{children}</>;
}; 