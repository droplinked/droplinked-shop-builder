import { create } from 'zustand';

interface OnchainRecordsStore {
    searchValue: string | null;
    recordFilter: string | null;
    walletFilter: string | null;
    setSearchValue: (value: string | null) => void;
    setRecordFilter: (value: string | null) => void;
    setWalletFilter: (value: string | null) => void;
}

const useOnchainRecordsStore = create<OnchainRecordsStore>((set) => ({
    searchValue: null,
    recordFilter: null,
    walletFilter: null,
    setSearchValue: (value) => set({ searchValue: value }),
    setRecordFilter: (value) => set({ recordFilter: value }),
    setWalletFilter: (value) => set({ walletFilter: value }),
}));

export default useOnchainRecordsStore;
