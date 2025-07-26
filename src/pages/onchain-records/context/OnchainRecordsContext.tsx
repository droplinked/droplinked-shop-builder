import useDebounce from 'hooks/useDebounce/useDebounce';
import { getOnchainInventory } from 'services/onchain-inventory/services';
import React, { createContext, useContext, useState } from 'react';
import { useQuery } from 'react-query';
import useAppStore from 'stores/app/appStore';

interface OnchainRecordsContextType {
    searchValue: string | null;
    setSearchValue: (value: string | null) => void;
    recordFilter: string | null;
    setRecordFilter: (value: string | null) => void;
    walletFilter: string | null;
    setWalletFilter: (value: string | null) => void;
    isFetching: boolean;
    data: any;
    refetch: () => void;
    isError: boolean;
    selectedWallet: any;
}

const OnchainRecordsContext = createContext<OnchainRecordsContextType | undefined>(undefined);

export function OnchainRecordsProvider({ children }: { children: React.ReactNode }) {
    const [searchValue, setSearchValue] = useState(null);
    const [recordFilter, setRecordFilter] = useState(null);
    const [walletFilter, setWalletFilter] = useState(null);
    const debouncedSearch = useDebounce(searchValue, 1000);
    const { user: { wallets } } = useAppStore();

    const selectedWallet = wallets?.find((wallet) => wallet.type === walletFilter);

    const { isFetching, data, refetch, isError } = useQuery({
        queryKey: ["records", debouncedSearch, recordFilter, selectedWallet],
        queryFn: () => getOnchainInventory({
            search: searchValue ?? undefined,
            chain: selectedWallet?.type,
            wallet: selectedWallet?.address,
            myProducts: recordFilter ?? undefined
        }),
    });

    return (
        <OnchainRecordsContext.Provider value={{
            searchValue,
            setSearchValue,
            recordFilter,
            setRecordFilter,
            walletFilter,
            setWalletFilter,
            isFetching,
            data,
            refetch,
            isError,
            selectedWallet
        }}>
            {children}
        </OnchainRecordsContext.Provider>
    );
}

export const useOnchainRecords = () => {
    const context = useContext(OnchainRecordsContext);
    if (context === undefined) {
        throw new Error('useOnchainRecords must be used within a OnchainRecordsProvider');
    }
    return context;
};
